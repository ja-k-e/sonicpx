import audioContext from '../globals/audioContext';
import AudioPlayer from './AudioPlayer';
import Canvas from './Canvas';
import ImageToAudio from '../adapters/ImageToAudio';
import File from './File';

export default class Player {
  constructor() {
    this.audio = new AudioPlayer({
      $element: document.querySelector('.player .audio'),
      stream: true
    });
    this.file = new File({
      accept: 'image/*',
      $parent: document.querySelector('.player .file'),
      handleChange: this.handleFileChange.bind(this)
    });
  }

  handleFileChange(target, file) {
    this.file.disable();
    this.audio.progress('reset');
    this.audio.disable();
    if (this.converter) this.converter.remove();
    this.converter = new ImageToAudio();
    let sized = new Image(),
      data = target.result;
    sized.onload = () => {
      this.converter.initialize(sized);
      this.audio.enable();
      this.audio.bindPlay(this.handlePlay.bind(this));
    };
    sized.setAttribute('src', data);
  }

  handlePlay() {
    this.audio.progress('start');
    this.converter.play(() => this.handleEnd());
  }

  handleEnd() {
    this.file.enable();
    this.audio.progress('end');
  }
}
