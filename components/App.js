import Player from './Player.js';
import RecordFile from './RecordFile.js';
import RecordStream from './RecordStream.js';

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

  deactivate() {
    let $existingNav = this.$nav.querySelector('nav a.active'),
      $existingSection = document.querySelector('section.active');
    if ($existingNav) $existingNav.classList.remove('active');
    if ($existingSection) $existingSection.classList.remove('active');
  }

  processHash() {
    let hash = window.location.hash;
    let $link = {
      '#player': this.$navPlayer,
      '#file': this.$navFile,
      '#mic': this.$navMic
    }[hash];
    let $section = {
      '#player': this.$player,
      '#file': this.$file,
      '#mic': this.$mic
    }[hash];
    if ($section) this.deactivate();
    if ($link) $link.classList.add('active');
    if ($section) $section.classList.add('active');
  }

  handleNav(e, $el) {
    this.deactivate();
    e.target.classList.add('active');
    $el.classList.add('active');
  }
}
