import Player from "./Player.js";
import RecordFile from "./RecordFile.js";
import RecordStream from "./RecordStream.js";

export default class App {
  constructor() {
    this.recordFile = new RecordFile();
    this.recordStream = new RecordStream();
    this.player = new Player();
  }
}
