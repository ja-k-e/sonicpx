import Player from './Player';
import Recorder from './Recorder';

export default class App {
  constructor() {
    this.recorder = new Recorder();
    this.player = new Player();
    this._initDOM();
  }

  _initDOM() {
    let $record = document.querySelector('nav .record'),
      $play = document.querySelector('nav .play'),
      $recorder = document.querySelector('section.recorder'),
      $player = document.querySelector('section.player');
    $record.addEventListener('click', () => {
      $recorder.classList.add('active');
      $record.classList.add('active');
      $player.classList.remove('active');
      $play.classList.remove('active');
    });
    $play.addEventListener('click', () => {
      $player.classList.add('active');
      $play.classList.add('active');
      $recorder.classList.remove('active');
      $record.classList.remove('active');
    });

    // let $record = document.querySelector('.record');
    // let recording = false,
    //   started = false;
    // $record.addEventListener('click', () => {
    //   if (recording) this.recorder.stop();
    //   else this.recorder.reset();
    //   recording = !recording;
    //   let mtd = recording ? 'add' : 'remove';
    //   $record.classList[mtd]('active');
    //   if (recording && !started) {
    //     started = true;
    //     this.recorder.initializeStream().catch(alert);
    //   }
    // });
  }
}
