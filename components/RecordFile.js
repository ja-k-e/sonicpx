import getAudioContext from "../globals/audioContext.js";
import AudioPlayer from "./AudioPlayer.js";
import AudioToImage from "../adapters/AudioToImage.js";
import File from "./File.js";

export default class RecordFile {
  constructor() {
    this.$output = document.querySelector(".recorder-file .output");
    this.audio = new AudioPlayer({
      $element: document.querySelector(".recorder-file .audio"),
    });
    this.file = new File({
      accept: "audio/*",
      $parent: document.querySelector(".recorder-file .file"),
      handleChange: this.handleFileChange.bind(this),
    });
  }

  handleFileChange(target, file) {
    this.audio.progress(0);
    this.audio.disable();
    this.file.disable();
    this.element = new Audio();
    this.element.setAttribute("crossorigin", "anonymous");
    this.element.src = target.result;
    this.element.addEventListener("canplay", () => {
      if (this.element.duration <= 60) {
        if (this.converter) this.converter.remove();
        this.audio.bindPlay(() => {
          this.initializeElement();
        });
        this.audio.enable();
      } else {
        this.file.enable();
        alert("Will not process audio over 60 seconds long.");
      }
    });
  }

  initializeElement() {
    this.stereo = document.querySelector("#stereo").checked;
    this._recordElement();
    this.element.addEventListener("ended", () => this.converter.stop());
  }

  _recordElement() {
    this.converter = new AudioToImage({
      $parent: this.$output,
      duration: this.element.duration,
      bits: 16,
      stereo: this.stereo,
    });
    this.input = getAudioContext().createMediaElementSource(this.element);
    let bufferSize = 8192,
      channels = this.stereo ? 2 : 1;
    this.processor = getAudioContext().createScriptProcessor(
      bufferSize,
      channels,
      channels
    );
    // specify the processing function
    this.processor.onaudioprocess = (data) => {
      this.audio.progress(this.element.currentTime / this.element.duration);
      this.converter.process(data);
    };
    // connect stream to our processor
    this.input.connect(this.processor);
    this.input.connect(getAudioContext().destination);
    this.element.onended = () => {
      this.audio.progress(1);
      this.file.enable();
      this.converter.handleEnd();
      this.input.disconnect(this.processor);
      this.input.disconnect(getAudioContext().destination);
      this.processor.disconnect(getAudioContext().destination);
      this.processor.onaudioprocess = null;
      delete this.element;
      delete this.input;
      delete this.processor;
    };
    // connect our processor to the previous destination
    this.processor.connect(getAudioContext().destination);
    this.element.play();
  }
}
