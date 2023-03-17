import AudioPlayer from "./AudioPlayer.js";
import ImageToAudio from "../adapters/ImageToAudio.js";
import File from "./File.js";

export default class Player {
  constructor() {
    this.audio = new AudioPlayer({
      $element: document.querySelector(".player .audio"),
      stream: true,
    });
    this.file = new File({
      accept: "image/*",
      $parent: document.querySelector(".player .file"),
      handleChange: this.handleFileChange.bind(this),
    });
  }

  handleFileChange(target, file) {
    this.file.disable();
    this.audio.progress("reset");
    this.audio.disable();
    if (this.converter) this.converter.remove();
    this.converter = new ImageToAudio();
    this.sized = new Image();
    let data = target.result;
    this.sized.onload = () => {
      this.converter.initialize(this.sized);
      this.audio.enable();
      this.audio.bindPlay(this.handlePlay.bind(this));
    };
    this.sized.setAttribute("src", data);
  }

  handlePlay() {
    this.audio.progress("start");
    this.converter.play(() => this.handleEnd());
  }

  handleEnd() {
    this.file.enable();
    this.audio.progress("stop");
  }
}
