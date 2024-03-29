import getAudioContext from "../globals/audioContext.js";
import Canvas from "../components/Canvas.js";
import Bit16 from "./Bit16.js";

const CANVAS_WIDTH = 1200,
  MAX_SECONDS = 60,
  VERSION = 1;

export default class StreamToImage {
  constructor({ $parent, handleComplete }) {
    this.handleComplete = handleComplete;
    this.adapter = new Bit16();
    this.$parent = $parent;
    this.reset();
  }

  reset() {
    this.off = false;
    this.tick = 0;
    this.$parent.innerHTML = "";
    this.canvas = new Canvas(this.$parent);
    this.MAX_HEIGHT = Math.ceil(
      (MAX_SECONDS * getAudioContext().sampleRate) / CANVAS_WIDTH
    );
    this.canvas.setSize(CANVAS_WIDTH, this.MAX_HEIGHT);
    this.$parent.style.height = `0px`;
    this.$parent.style.overflowY = "hidden";
    this.imageData = this.canvas.createImage(this.canvas.w, this.canvas.h);
  }

  handleEnd() {
    let canvas = new Canvas();
    canvas.setSize(this.canvas.w, this.lastY + 1);
    // Storing metadata in alpha channel of cvs four pixels
    let meta = new Canvas().createImage(4, 1);
    meta.data[3] = Math.floor(VERSION / 256);
    meta.data[7] = VERSION % 256;
    meta.data[11] = 0; // mono only
    meta.data[15] = 16;
    canvas.putImage(meta, 0, 0);
    let d = this.canvas.imageData(0, 0, this.canvas.w, this.lastY);
    canvas.putImage(d, 0, 1);
    this.$parent.innerHTML = "";
    // this.$parent.appendChild(canvas.cvs);
    const img = new Image();
    img.src = canvas.cvs.toDataURL();
    this.$parent.appendChild(img);
  }

  stop() {
    this.off = true;
  }

  process(data) {
    if (this.off) return;

    let channel = data.inputBuffer.getChannelData(0),
      len = channel.length;
    for (let i = 0; i < len; i++) {
      if (this.off) return;
      let { x, y } = this.tickPosition();
      let idx = y * this.canvas.w * 4 + x * 4,
        { rgb } = this.adapter.rgbMono(channel[i]);
      // Setting the only channel
      this.setDataAtIndex(idx, rgb);

      this.tick++;
    }
  }

  setDataAtIndex(idx, rgb) {
    this.imageData.data[idx + 0] = rgb[0];
    this.imageData.data[idx + 1] = rgb[1];
    this.imageData.data[idx + 2] = rgb[2];
    this.imageData.data[idx + 3] = 255;
  }

  tickPosition() {
    let xFactor = this.canvas.w,
      x = this.tick % xFactor,
      y = Math.floor(this.tick / xFactor);
    if (y % 4 === 0 && y !== this.lastY) {
      this.canvas.clear();
      this.canvas.putImage(this.imageData, 0, 0);
      const height = this.canvas.cvs.clientHeight * (y / this.MAX_HEIGHT);
      this.$parent.style.height = `${height}px`;
    }
    if (y > this.MAX_HEIGHT) this.handleEnd();
    this.lastY = y;
    return { x, y };
  }
}
