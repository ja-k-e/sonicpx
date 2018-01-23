import Player from './Player';
import Recorder from './Recorder';

export default class App {
  constructor() {
    this.recorder = new Recorder();
    this.player = new Player();
    let $record = document.querySelector('.record');
    let recording = false,
      started = false;
    $record.addEventListener('click', () => {
      if (recording) this.recorder.stop();
      else this.recorder.reset();
      recording = !recording;
      let mtd = recording ? 'add' : 'remove';
      $record.classList[mtd]('active');
      if (recording && !started) {
        started = true;
        this.recorder.initializeStream().catch(alert);
      }
    });
  }
}
