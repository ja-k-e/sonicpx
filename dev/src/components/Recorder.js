import audioContext from '../globals/audioContext';
import Canvas from './Canvas';
import File from './File';

export default class Recorder {
  constructor() {
    this.canvas = new Canvas(document.querySelector('.recorder .output'));
    this.file = new File({
      accept: 'audio/*',
      $parent: document.querySelector('.recorder .upload'),
      handleChange: this.handleFileChange.bind(this)
    });
    this.reset();
  }

  handleFileChange(target) {
    let element = new Audio();
    element.setAttribute('crossorigin', 'anonymous');
    element.src = target.result;
    this.initializeElement(element);
  }

  initializeElement(element) {
    this.mode = 'element';
    this.reset();
    element.addEventListener('canplay', () => this._recordElement(element));
    element.addEventListener('ended', this.stop.bind(this));
  }

  initializeStream() {
    this.mode = 'stream';
    this.reset();
    return new Promise((resolve, reject) => {
      if (navigator.mediaDevices)
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then(stream => {
            resolve();
            this._recordStream(stream);
          })
          .catch(reject);
      else reject('getUserMedia not supported!');
    });
  }

  reset() {
    this.off = false;
    this.tick = 0;
    this.canvas.clear();
    this.canvas.setSize(2400, 6400);
  }

  stop() {
    this.off = true;
    if (this.mode === 'stream') this.redraw();
  }

  redraw() {
    let h = this.lastY;
    let data = this.canvas.imageData(0, 0, this.canvas.w, h);
    this.canvas.clear();
    this.canvas.setSize(this.canvas.w, h);
    this.canvas.putImageData(data, 0, 0);
  }

  _recordElement(element) {
    this.element = element;
    this.input = audioContext.createMediaElementSource(this.element);
    let bufferSize = 4096;
    this.recorder = audioContext.createScriptProcessor(bufferSize, 2, 2);
    let sampleCount = Math.ceil(
      this.element.duration * audioContext.sampleRate
    );
    let w = Math.floor(Math.sqrt(sampleCount)) * 2,
      wh = w * 0.5,
      h = sampleCount / wh;
    this.canvas.setSize(w, h);
    // specify the processing function
    this.recorder.onaudioprocess = this._processAudio.bind(this);
    // connect stream to our recorder
    this.input.connect(this.recorder);
    this.input.connect(audioContext.destination);
    this.element.onended = () => {
      this.input.disconnect(this.recorder);
      this.input.disconnect(audioContext.destination);
      this.recorder.disconnect(audioContext.destination);
      this.recorder.onaudioprocess = null;
    };
    // connect our recorder to the previous destination
    this.recorder.connect(audioContext.destination);
    this.element.play();
  }

  _recordStream(stream) {
    this.input = audioContext.createMediaStreamSource(stream);
    let bufferSize = 4096;
    this.recorder = audioContext.createScriptProcessor(bufferSize, 2, 2);
    // specify the processing function
    this.recorder.onaudioprocess = this._processAudio.bind(this);
    // connect stream to our recorder
    this.input.connect(this.recorder);
    this.input.onended = () => {
      this.input.disconnect(this.recorder);
      this.recorder.disconnect(audioContext.destination);
      this.recorder.onaudioprocess = null;
    };
    // connect our recorder to the previous destination
    this.recorder.connect(audioContext.destination);
  }

  _processAudio(data) {
    if (this.off) return;
    let left = data.inputBuffer.getChannelData(0),
      right = data.inputBuffer.getChannelData(1);
    for (let i = 0; i < left.length; i++) {
      if (this.off) return;
      // -1 through 1 => 0 through 16777216, 24 bits
      let valL = left[i] * 8388608 + 8388608,
        valR = right[i] * 8388608 + 8388608;

      // A * 256, remainder b
      let valLA = Math.floor(valL / 256 / 256),
        valLB = Math.floor(valL - valLA * 256 * 256),
        valLC = Math.floor(valL - valLB * 256),
        valRA = Math.floor(valR / 256 / 256),
        valRB = Math.floor(valR - valRA * 256 * 256),
        valRC = Math.floor(valR - valRB * 256);
      let x = this.tick % this.canvas.wh,
        y = Math.floor(this.tick / this.canvas.wh),
        xtra = 0;
      this.lastY = y;
      this.canvas.ctx.fillStyle = `rgb(${valLA},${valLB},${valLC})`;
      this.canvas.ctx.fillRect(x, y, 1, 1);
      this.canvas.ctx.fillStyle = `rgb(${valRA},${valRB},${valRC})`;
      this.canvas.ctx.fillRect(x + this.canvas.wh, y, 1, 1);
      this.tick++;
    }
  }
}
