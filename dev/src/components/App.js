import Player from './Player';
import RecordFile from './RecordFile';
import RecordStream from './RecordStream';

export default class App {
  constructor() {
    this.recordFile = new RecordFile();
    this.recordStream = new RecordStream();
    this.player = new Player();
    this.initDOM();
    this.processHash();
  }

  initDOM() {
    this.$nav = document.querySelector('nav');
    this.$navPlayer = this.$nav.querySelector('#nav-player');
    this.$navFile = this.$nav.querySelector('#nav-file');
    this.$navMic = this.$nav.querySelector('#nav-mic');
    this.$player = document.body.querySelector('section#player');
    this.$file = document.body.querySelector('section#file');
    this.$mic = document.body.querySelector('section#mic');
    this.$navPlayer.addEventListener('click', e => {
      this.handleNav(e, this.$player);
    });
    this.$navFile.addEventListener('click', e => {
      this.handleNav(e, this.$file);
    });
    this.$navMic.addEventListener('click', e => {
      this.handleNav(e, this.$mic);
    });
    window.addEventListener('hashchange', () => {
      this.processHash();
    });
  }

  processHash() {
    let hash = window.location.hash;
    if (hash === '#player') this.$navPlayer.click();
    else if (hash === '#file') this.$navFile.click();
    else if (hash === '#mic') this.$navMic.click();
  }

  handleNav(e, $el) {
    let $existingNav = this.$nav.querySelector('nav a.active'),
      $existingSection = document.querySelector('section.active');
    if ($existingNav) $existingNav.classList.remove('active');
    if ($existingSection) $existingSection.classList.remove('active');
    e.target.classList.add('active');
    $el.classList.add('active');
  }
}
