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
  }

  initialize(image) {
    this.canvas = new Canvas(this.$parent);
    this.canvas.setSize(image.width, image.height);
    this.canvas.drawImage(image, 0, 0);
    this.loadMeta();
    this.play();
  }

  loadMeta() {
    let { data } = this.canvas.imageData(0, 0, 4, 1);
    this.version = data[3] * 256 + data[7];
    this.stereo = data[11] === 1;
    this.bits = data[15];
    this.adapter = this.bits === 16 ? new Bit16() : new Bit24();
  }

  play() {
    let { w, wh, h } = this.canvas,
      buffer;

    if (this.stereo) {
      buffer = audioContext.createBuffer(2, wh * h, audioContext.sampleRate);

      let bitsL = this.canvas.imageData(0, 1, wh, h - 1).data,
        bitsR = this.canvas.imageData(wh, 1, wh, h - 1).data,
        channelL = buffer.getChannelData(0),
        channelR = buffer.getChannelData(1),
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
      buffer = audioContext.createBuffer(1, w * h, audioContext.sampleRate);

      let bits = this.canvas.imageData(0, 1, w, h - 1).data,
        channel = buffer.getChannelData(0),
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

    let source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
  }
}
