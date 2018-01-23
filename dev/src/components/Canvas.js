export default class Canvas {
  constructor($parent) {
    this.cvs = document.createElement('canvas');
    if ($parent) $parent.appendChild(this.cvs);
    this.ctx = this.cvs.getContext('2d');
  }

  clear() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }

  setSize(w, h) {
    this.w = w;
    this.wh = w * 0.5;
    this.h = h;
    this.hh = h * 0.5;
    this.cvs.width = w;
    this.cvs.height = h;
  }

  putImageData(data, x, y) {
    this.ctx.putImageData(data, x, y);
  }

  drawImage(data, x, y) {
    this.ctx.drawImage(data, 0, 0);
  }

  imageData(x, y, w, h) {
    return this.ctx.getImageData(x, y, w, h);
  }
}
