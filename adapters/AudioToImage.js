import getAudioContext from "../globals/audioContext.js";
import Canvas from "../components/Canvas.js";
import Bit16 from "./Bit16.js";
import Bit24 from "./Bit24.js";

const SECONDS_PER_CANVAS = 5,
  VERSION = 1;

export default class AudioToImage {
  constructor({ $parent, duration, bits, stereo = true }) {
    this.bits = bits;
    this.adapter = bits === 16 ? new Bit16() : new Bit24();
    this.$parent = $parent;
    this.stereo = stereo;
    this.initialize(duration);
    this.reset();
  }

  reset() {
    this.off = false;
    this.tick = 0;
    this.imageData = null;
  }

  initialize(duration) {
    this.canvasesIdx = 0;
    this.canvases = [];
    let sampleCount = Math.ceil(duration * getAudioContext().sampleRate),
      di = Math.floor(Math.sqrt(sampleCount)),
      w = this.stereo ? di * 2 : di,
      wh = this.stereo ? w * 0.5 : w,
      h = Math.ceil(sampleCount / wh),
      canvasCount = Math.ceil(duration / SECONDS_PER_CANVAS),
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
    this.$parent.innerHTML = "";
  }

  handleEnd() {
    this.canvas.putImage(this.imageData, 0, 0);
    let canvas = new Canvas(),
      totalW = this.canvases[0].w,
      firstH = this.canvases[0].h,
      totalH = this.canvases.map((a) => a.h).reduce((a, b) => a + b);
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
    this.$parent.innerHTML = "";
    // this.$parent.appendChild(canvas.cvs);
    const img = new Image();
    img.src = canvas.cvs.toDataURL();
    this.$parent.appendChild(img);
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
      for (let i = 0; i < len; i++) {
        if (this.off) return;
        let { x, y } = this.tickPosition();
        // The image data starting index
        let idxL = y * this.canvas.w * 4 + x * 4,
          idxR = idxL + this.canvas.wh * 4,
          { rgbL, rgbR } = this.adapter.rgbStereo(left[i], right[i]);
        // Setting Left channel
        this.setDataAtIndex(idxL, rgbL);
        // Setting Right channel
        this.setDataAtIndex(idxR, rgbR);

        this.tick++;
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

  setDataAtIndex(idx, rgb) {
    this.imageData.data[idx + 0] = rgb[0];
    this.imageData.data[idx + 1] = rgb[1];
    this.imageData.data[idx + 2] = rgb[2];
    this.imageData.data[idx + 3] = 255;
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
