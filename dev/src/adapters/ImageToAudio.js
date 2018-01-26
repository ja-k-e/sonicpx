import audioContext from '../globals/audioContext';
import Canvas from '../components/Canvas';
import Bit16 from './Bit16';
import Bit24 from './Bit24';

const SECONDS_PER_CANVAS = 5;

export default class ImageToAudio {
  constructor() {
    this.$parent = document.querySelector('.player .input');
  }

  remove() {
    this.$parent.innerHTML = '';
    this.source.stop();
    this.source.disconnect(audioContext.destination);
    this._playing = false;
    delete this.source;
  }

  play(handleEnd) {
    if (!this._playing) {
      this.source.onended = () => handleEnd();
      this.source.start();
      this._playing = true;
    }
  }

  initialize(image) {
    this.canvas = new Canvas(this.$parent);
    this.canvas.setSize(image.width, image.height);
    this.canvas.drawImage(image, 0, 0);
    this.loadMeta();
    this.initializeAudio();
  }

  loadMeta() {
    let { data } = this.canvas.imageData(0, 0, 4, 1);
    if (this._hasMeta(data)) {
      this.version = data[3] * 256 + data[7];
      this.stereo = data[11] === 1;
      this.bits = data[15];
    } else {
      this.version = 65536;
      this.stereo = true;
      this.bits = 16;
    }
    this.adapter = this.bits === 16 ? new Bit16() : new Bit24();
  }

  _hasMeta(data) {
    let hasMeta = true;
    // All these numbers should be black
    [0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14].forEach(v => {
      if (data[v] !== 0) hasMeta = false;
    });
    if (data[11] > 2) hasMeta = false;
    if (data[15] !== 16 && data[15] !== 24) hasMeta = false;

    return hasMeta;
  }

  initializeAudio() {
    let { w, wh, h } = this.canvas;

    if (this.stereo) {
      this.buffer = audioContext.createBuffer(
        2,
        wh * h,
        audioContext.sampleRate
      );

      let bitsL = this.canvas.imageData(0, 1, wh, h - 1).data,
        bitsR = this.canvas.imageData(wh, 1, wh, h - 1).data,
        channelL = this.buffer.getChannelData(0),
        channelR = this.buffer.getChannelData(1),
        len = bitsL.length;
      for (var i = 0; i < len; i += 4) {
        let channelIdx = Math.floor(i / 4),
          dLr = bitsL[i + 0],
          dLg = bitsL[i + 1],
          dLb = bitsL[i + 2],
          dLa = bitsL[i + 3],
          dRr = bitsR[i + 0],
          dRg = bitsR[i + 1],
          dRb = bitsR[i + 2],
          dRa = bitsR[i + 3];
        let { valueL, valueR } = this.adapter.valueStereo(
          [dLr, dLg, dLb],
          [dRr, dRg, dRb]
        );

        if (dLa === 255) channelL[channelIdx] = valueL;
        if (dRa === 255) channelR[channelIdx] = valueR;
      }
    } else {
      this.buffer = audioContext.createBuffer(
        1,
        w * h,
        audioContext.sampleRate
      );

      let bits = this.canvas.imageData(0, 1, w, h - 1).data,
        channel = this.buffer.getChannelData(0),
        len = bits.length;
      for (var i = 0; i < len; i += 4) {
        let channelIdx = Math.floor(i / 4),
          dr = bits[i + 0],
          dg = bits[i + 1],
          db = bits[i + 2],
          da = bits[i + 3],
          { value } = this.adapter.valueMono([dr, dg, db]);

        if (da === 255) channel[channelIdx] = value;
      }
    }

    this.source = audioContext.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(audioContext.destination);
  }
}
