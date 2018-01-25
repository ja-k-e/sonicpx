import audioContext from '../globals/audioContext';
import Canvas from './Canvas';
import Converter from './Converter';
import File from './File';

const SECONDS_PER_CANVAS = 5;

export default class Recorder {
  constructor() {
    this.$parent = document.querySelector('.recorder .output');
    this.file = new File({
      accept: 'audio/*',
      $parent: document.querySelector('.recorder .upload'),
      handleChange: this.handleFileChange.bind(this)
    });
    this.reset();
  }

  handleFileChange(target, file) {
    let element = new Audio();
    element.setAttribute('crossorigin', 'anonymous');
    element.src = target.result;
    // https://stackoverflow.com/questions/29317866/read-samples-from-wav-file
    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer
    element.addEventListener('canplay', () => {
      this.initializeElement(element);
    });
  }

  initializeElement(element) {
    this.mode = 'element';
    this.reset();
    this._recordElement(element);
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
    // this.canvas.clear();
    // this.canvas.setSize(2400, 6400);
    this.imageData = null;
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

  get canvas() {
    return this.canvases[this.canvasesIdx];
  }

  nextCanvas() {
    this.canvasesIdx++;
  }

  _recordElement(element) {
    this.element = element;
    this.input = audioContext.createMediaElementSource(this.element);
    let bufferSize = 4096;
    this.recorder = audioContext.createScriptProcessor(bufferSize, 2, 2);
    this._setCanvases(element);
    // specify the processing function
    this.recorder.onaudioprocess = this._processAudio.bind(this);
    // connect stream to our recorder
    this.input.connect(this.recorder);
    this.input.connect(audioContext.destination);
    this.element.onended = () => {
      this.canvas.putImage(this.imageData, 0, 0);
      let canvas = new Canvas(),
        totalW = this.canvases[0].w,
        firstH = this.canvases[0].h,
        totalH = this.canvases.map(a => a.h).reduce((a, b) => a + b);
      canvas.setSize(totalW, totalH);
      for (let i = 0; i < this.canvases.length; i++) {
        let cvs = this.canvases[i],
          y = i * firstH,
          d = cvs.imageData(0, 0);
        canvas.putImage(d, 0, y);
      }
      this.$parent.innerHTML = '';
      this.$parent.appendChild(canvas.cvs);
      setTimeout(() => {
        alert(
          'Download Image by right clicking and selecting "Save Image As..."'
        );
      }, 1000);
      this.input.disconnect(this.recorder);
      this.input.disconnect(audioContext.destination);
      this.recorder.disconnect(audioContext.destination);
      this.recorder.onaudioprocess = null;
    };
    // connect our recorder to the previous destination
    this.recorder.connect(audioContext.destination);
    this.element.play();
  }

  _setCanvases({ duration }) {
    this.canvasesIdx = 0;
    this.canvases = [];
    let sampleCount = Math.ceil(duration * audioContext.sampleRate),
      w = Math.floor(Math.sqrt(sampleCount)) * 2,
      wh = w * 0.5,
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
    if (!this.imageData)
      this.imageData = this.canvas.createImage(this.canvas.w, this.canvas.h);

    let left = data.inputBuffer.getChannelData(0),
      right = data.inputBuffer.getChannelData(1),
      converter = new Converter(16);

    for (let i = 0; i < left.length; i++) {
      if (this.off) return;

      let rgbL = converter.toRGB(left[i]),
        rgbR = converter.toRGB(right[i]);

      let x = this.tick % this.canvas.wh,
        y = Math.floor(this.tick / this.canvas.wh);
      if (y !== this.lastY && y > this.canvas.h) {
        this.canvas.putImage(this.imageData, 0, 0);
        this.nextCanvas();
        this.imageData = this.canvas.createImage(this.canvas.w, this.canvas.h);
        this.tick = 0;
      }
      this.lastY = y;

      // The image data starting index
      let idxL = y * this.canvas.w * 4 + x * 4,
        idxR = idxL + this.canvas.wh * 4;

      // Setting Left channel
      this.imageData.data[idxL + 0] = rgbL[0];
      this.imageData.data[idxL + 1] = rgbL[1];
      this.imageData.data[idxL + 2] = rgbL[2];
      this.imageData.data[idxL + 3] = 255;

      // Setting Right channel
      this.imageData.data[idxR + 0] = rgbR[0];
      this.imageData.data[idxR + 1] = rgbR[1];
      this.imageData.data[idxR + 2] = rgbR[2];
      this.imageData.data[idxR + 3] = 255;

      this.tick++;
    }
  }
}
