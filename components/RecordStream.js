import getAudioContext from "../globals/audioContext.js";
import StreamToImage from "../adapters/StreamToImage.js";

export default class RecordStream {
  constructor() {
    this.$output = document.querySelector(".recorder-mic .output");
    this.recording = false;
    this.started = false;
    this.$toggle = document.querySelector("#record");
    this.$toggle.addEventListener("click", () => {
      if (this.recording) this.stop();
      else this.reset();
      this.recording = !this.recording;
      let mtd = this.recording ? "add" : "remove";
      this.$toggle.classList[mtd]("active");
      if (this.recording && !this.started) {
        this.started = true;
        this.initializeStream().catch(() => {
          alert("Your device is not supported.");
          this.$toggle.classList.remove("active");
        });
      }
    });
  }

  reset() {
    if (this.converter) this.converter.reset();
  }

  stop() {
    this.converter.stop();
    this.converter.handleEnd();
  }

  initializeStream() {
    return new Promise((resolve, reject) => {
      if (navigator.mediaDevices)
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((stream) => {
            resolve();
            this._recordStream(stream);
          })
          .catch(reject);
      else reject("getUserMedia not supported!");
    });
  }

  _recordStream(stream) {
    this.converter = new StreamToImage({
      $parent: this.$output,
      handleComplete: () => {
        this.$toggle.click();
      },
    });
    this.input = getAudioContext().createMediaStreamSource(stream);
    let bufferSize = 8192;
    this.processor = getAudioContext().createScriptProcessor(bufferSize, 1, 1);
    // specify the processing function
    this.processor.onaudioprocess = (data) => {
      this.converter.process(data);
    };
    // connect stream to our processor
    this.input.connect(this.processor);
    this.input.onended = () => {
      this.input.disconnect(this.processor);
      this.processor.disconnect(getAudioContext().destination);
      this.processor.onaudioprocess = null;
    };
    // connect our processor to the previous destination
    this.processor.connect(getAudioContext().destination);
  }
}
