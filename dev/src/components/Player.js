import audioContext from '../globals/audioContext';
import Canvas from './Canvas';
import File from './File';

export default class Player {
  constructor() {
    this.canvas = new Canvas(document.querySelector('.player .input'));
    this.file = new File({
      accept: 'image/*.png',
      $parent: document.querySelector('.player .upload'),
      handleChange: this.handleFileChange.bind(this)
    });
  }

  handleFileChange(target) {
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
      bitsL = dataL.data,
      dataR = this.canvas.imageData(wh, 0, wh, h),
      bitsR = dataR.data;

    let buffer = audioContext.createBuffer(2, wh * h, audioContext.sampleRate);

    // Fill the buffer with data;
    // Values between -1.0 and 1.0
    let channelL = buffer.getChannelData(0),
      channelR = buffer.getChannelData(1);
    for (var i = 0; i < bitsL.length; i += 4) {
      let channelIdx = Math.floor(i / 4),
        alphaL = bitsL[i + 3],
        alphaR = bitsR[i + 3],
        dL1 = bitsL[i + 0],
        dL2 = bitsL[i + 1],
        dL3 = bitsL[i + 2],
        dR1 = bitsR[i + 0],
        dR2 = bitsR[i + 1],
        dR3 = bitsR[i + 2],
        valL = dL1 * 256.0 * 256.0 + dL2 * 256.0 + dL3,
        relL = valL / 16777216.0 * 2.0 - 1.0,
        valR = dR1 * 256.0 * 256.0 + dR2 * 256.0 + dR3,
        relR = valR / 16777216.0 * 2.0 - 1.0;
      if (alphaL > 0) channelL[channelIdx] = relL;
      if (alphaR > 0) channelR[channelIdx] = relR;
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
