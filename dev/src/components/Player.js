import audioContext from '../globals/audioContext';
import Canvas from './Canvas';
import ImageToAudio from '../adapters/ImageToAudio';
import File from './File';

export default class Player {
  constructor() {
    this.converter = new ImageToAudio();
    this.file = new File({
      accept: 'image/*',
      $parent: document.querySelector('.player .file'),
      handleChange: this.handleFileChange.bind(this)
    });
  }

  handleFileChange(target, file) {
    this.converter.remove();
    let sized = new Image(),
      data = target.result;
    sized.onload = () => this.converter.initialize(sized);
    sized.setAttribute('src', data);
  }
}
