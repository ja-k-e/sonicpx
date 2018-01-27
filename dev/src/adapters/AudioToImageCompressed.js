import audioContext from '../globals/audioContext';
import Canvas from '../components/Canvas';
import Bit16Compressed from './Bit16Compressed';

const SECONDS_PER_CANVAS = 5,
  VERSION = 1;

export default class AudioToImageCompressed {
  constructor({ duration, bits, stereo = true }) {
    this.bits = bits;
    // TODO: no 24
    this.adapter = bits === 16 ? new Bit16Compressed() : new Bit16Compressed();
    this.$parent = document.querySelector('.recorder .output');
    this.stereo = stereo;
    this.initialize(duration);
    this.off = false;
    this.tick = 0;
    this.imageData = null;
  }

  initialize(duration) {
    this.canvasesIdx = 0;
    this.canvases = [];
    // We are compressing to ~66.67%, three samples per two pixels
    let relDuration = Math.ceil(duration * 0.66666667),
      pixelCount = Math.ceil(relDuration * audioContext.sampleRate),
      di = Math.floor(Math.sqrt(pixelCount)),
      w = this.stereo ? di * 2 : di,
      wh = this.stereo ? w * 0.5 : w,
      h = Math.ceil(pixelCount / wh),
      canvasCount = Math.ceil(relDuration / SECONDS_PER_CANVAS),
      cvsH = Math.ceil(h / canvasCount),
      cvsLastH = canvasCount === 1 ? h : h - cvsH * (canvasCount - 1);
    for (let i = 0; i < canvasCount; i++) {
      let canvas = new Canvas(this.$parent),
        ch = i === canvasCount - 1 ? cvsLastH : cvsH;
      canvas.setSize(w, ch);
      this.canvases.push(canvas);
    }
  }

  remove() {
    this.$parent.innerHTML = '';
  }

  handleEnd() {
    this.canvas.putImage(this.imageData, 0, 0);
    let canvas = new Canvas(),
      totalW = this.canvases[0].w,
      firstH = this.canvases[0].h,
      totalH = this.canvases.map(a => a.h).reduce((a, b) => a + b);
    canvas.setSize(totalW, totalH + 1);
    // Storing metadata in alpha channel of first four pixels
    let meta = new Canvas().createImage(4, 1);
    meta.data[3] = Math.floor(VERSION / 256);
    meta.data[7] = VERSION % 256;
    meta.data[11] = this.stereo ? 1 : 0;
    meta.data[15] = this.bits;
    canvas.putImage(meta, 0, 0);
    for (let i = 0; i < this.canvases.length; i++) {
      let cvs = this.canvases[i],
        y = i * firstH,
        d = cvs.imageData(0, 0);
      canvas.putImage(d, 0, y + 1);
    }
    this.$parent.innerHTML = '';
    this.$parent.appendChild(canvas.cvs);
  }

  stop() {
    this.off = true;
  }

  process(data) {
    if (this.off) return;
    if (!this.imageData)
      this.imageData = this.canvas.createImage(this.canvas.w, this.canvas.h);

    if (this.stereo) {
      let left = data.inputBuffer.getChannelData(0),
        right = data.inputBuffer.getChannelData(1),
        len = right.length;
      for (let i = 0; i < len; i += 3) {
        if (this.off) return;
        let { x, y } = this.tickPosition();
        // The image data starting index
        let idxL = y * this.canvas.w * 4 + x * 4,
          idxR = idxL + this.canvas.wh * 4,
          lefts = [left[i], left[i + 1], left[i + 2]],
          rights = [right[i], right[i + 1], right[i + 2]],
          { rgbsL, rgbsR } = this.adapter.rgbsStereo(lefts, rights);
        // Setting Left channel
        this.setDataAtIndex(idxL, rgbsL);
        // Setting Right channel
        this.setDataAtIndex(idxR, rgbsR);

        this.tick += 3;
      }
    } else {
      let channel = data.inputBuffer.getChannelData(0),
        len = channel.length;
      for (let i = 0; i < len; i++) {
        if (this.off) return;
        let { x, y } = this.tickPosition();
        let idx = y * this.canvas.w * 4 + x * 4,
          { rgb } = this.adapter.rgbMono(channel[i]);
        // Setting the only channel
        this.setDataAtIndex(idx, rgb);

        this.tick++;
      }
    }
  }

  setDataAtIndex(idx, rgbs) {
    if (!rgbs) return;
    let px1 = rgbs[0],
      px2 = rgbs[1];
    this.imageData.data[idx + 0] = px1[0];
    this.imageData.data[idx + 1] = px1[1];
    this.imageData.data[idx + 2] = px1[2];
    this.imageData.data[idx + 3] = 255;
    this.imageData.data[idx + 4] = px2[0];
    this.imageData.data[idx + 5] = px2[1];
    this.imageData.data[idx + 6] = px2[2];
    this.imageData.data[idx + 7] = 255;
  }

  tickPosition() {
    let xFactor = this.stereo ? this.canvas.wh : this.canvas.w,
      x = this.tick % xFactor,
      y = Math.floor(this.tick / xFactor);
    if (y !== this.lastY && y > this.canvas.h) {
      this.canvas.putImage(this.imageData, 0, 0);
      this.nextCanvas();
      this.imageData = this.canvas.createImage(this.canvas.w, this.canvas.h);
      this.tick = 0;
    }
    this.lastY = y;
    return { x, y };
  }

  get canvas() {
    return this.canvases[this.canvasesIdx];
  }

  nextCanvas() {
    this.canvasesIdx++;
  }
}
