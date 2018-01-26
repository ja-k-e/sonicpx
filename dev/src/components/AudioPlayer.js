export default class AudioPlayer {
  constructor({ $element, stream = false }) {
    this.stream = stream;
    this.$element = $element;
    this.$play = this.$element.querySelector('.play');
    this.$progress = this.$element.querySelector('.progress > span');
  }

  bindPlay(handler) {
    this.$play.addEventListener('click', e => {
      this.disable();
      e.preventDefault();
      handler();
    });
  }

  enable() {
    this.$element.classList.remove('disabled');
  }

  disable() {
    this.$element.classList.add('disabled');
  }

  progress(rat) {
    if (this.stream) {
      if (rat === 'start') this.$element.classList.add('streaming');
      else if (rat === 'end') this.$element.classList.add('complete');
      else {
        this.$element.classList.remove('streaming');
        this.$element.classList.remove('complete');
      }
    } else {
      this.$progress.style.width = `${rat * 100}%`;
    }
  }
}
