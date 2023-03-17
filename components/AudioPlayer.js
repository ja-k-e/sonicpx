export default class AudioPlayer {
  constructor({ $element, stream = false }) {
    this.stream = stream;
    this.$element = $element;
    this.$play = this.$element.querySelector('.play');
    this.$progress = this.$element.querySelector('.progress > span');
  }

  bindPlay(handler) {
    let self = this;
    this.$play.addEventListener('click', playHandler, false);
    // Call once
    function playHandler(e) {
      e.preventDefault();
      e.target.removeEventListener(e.type, playHandler, false);
      self.disable();
      handler();
    }
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
