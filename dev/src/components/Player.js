import audioContext from '../globals/audioContext';
import Canvas from './Canvas';
import Converter from './Converter';
import File from './File';

export default class Player {
  constructor() {
    this.canvas = new Canvas(document.querySelector('.player .input'));
    this.file = new File({
      accept: 'image/*',
      $parent: document.querySelector('.player .upload'),
      handleChange: this.handleFileChange.bind(this)
    });
  }

  handleFileChange(target, file) {
    let sized = new Image(),
      data = target.result;
    sized.onload = () => this.handleImage(data, sized);
    sized.setAttribute('src', data);
  }

  handleImage(data, sized) {
    this.canvas.clear();
    this.canvas.setSize(sized.width, sized.height);
    this.canvas.drawImage(sized, 0, 0);
    this._playImage();
  }

  _playImage() {
    let { w, wh, h } = this.canvas,
      dataL = this.canvas.imageData(0, 0, wh, h),
      dataR = this.canvas.imageData(wh, 0, wh, h),
      bitsL = dataL.data,
      bitsR = dataR.data;

    let buffer = audioContext.createBuffer(2, wh * h, audioContext.sampleRate);
    let converter = new Converter(16);

    // Fill the buffer with data;
    // Values between -1.0 and 1.0
    let channelL = buffer.getChannelData(0),
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

      if (dLa === 255) channelL[channelIdx] = converter.toValue(dLr, dLg, dLb);
      if (dRa === 255) channelR[channelIdx] = converter.toValue(dRr, dRg, dRb);
    }

    let source = audioContext.createBufferSource(),
      gainNode = audioContext.createGain();

    gainNode.gain.value = 0.95;
    source.connect(gainNode);
    source.buffer = buffer;
    gainNode.connect(audioContext.destination);
    source.start();
  }
}
