import audioContext from '../globals/audioContext';
import AudioPlayer from './AudioPlayer';
import AudioToImage from '../adapters/AudioToImage';
import Canvas from './Canvas';
import File from './File';

export default class RecordFile {
  constructor() {
    this.$output = document.querySelector('.recorder-file .output');
    this.audio = new AudioPlayer({
      $element: document.querySelector('.recorder-file .audio')
    });
    this.file = new File({
      accept: 'audio/*',
      $parent: document.querySelector('.recorder-file .file'),
      handleChange: this.handleFileChange.bind(this)
    });
  }

  handleFileChange(target, file) {
    this.audio.progress(0);
    this.audio.disable();
    this.file.disable();
    this.element = new Audio();
    this.element.setAttribute('crossorigin', 'anonymous');
    this.element.src = target.result;
    this.element.addEventListener('canplay', () => {
      if (this.element.duration <= 30) {
        if (this.converter) this.converter.remove();
        this.audio.bindPlay(() => {
          this.initializeElement();
        });
        this.audio.enable();
      } else {
        this.file.enable();
        alert('Will not process audio over 30 seconds long.');
      }
    });
  }

  initializeElement() {
    this.stereo = document.querySelector('#stereo').checked;
    this._recordElement();
    this.element.addEventListener('ended', () => this.converter.stop());
  }

  _recordElement() {
    this.converter = new AudioToImage({
      $parent: this.$output,
      duration: this.element.duration,
      bits: 16,
      stereo: this.stereo
    });
    this.input = audioContext.createMediaElementSource(this.element);
    let bufferSize = 8192,
      channels = this.stereo ? 2 : 1;
    this.processor = audioContext.createScriptProcessor(
      bufferSize,
      channels,
      channels
    );
    // specify the processing function
    this.processor.onaudioprocess = data => {
      this.audio.progress(this.element.currentTime / this.element.duration);
      this.converter.process(data);
    };
    // connect stream to our processor
    this.input.connect(this.processor);
    this.input.connect(audioContext.destination);
    this.element.onended = () => {
      this.audio.progress(1);
      this.file.enable();
      this.converter.handleEnd();
      this.input.disconnect(this.processor);
      this.input.disconnect(audioContext.destination);
      this.processor.disconnect(audioContext.destination);
      this.processor.onaudioprocess = null;
      delete this.element;
      delete this.input;
      delete this.processor;
    };
    // connect our processor to the previous destination
    this.processor.connect(audioContext.destination);
    this.element.play();
  }
}
