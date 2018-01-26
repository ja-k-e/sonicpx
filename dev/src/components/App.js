import Player from './Player';
import Recorder from './Recorder';

export default class App {
  constructor() {
    this.recorder = new Recorder();
    this.player = new Player();
  }
}
