export default class Bit {
  constructor() {}

  get bitsH() {
    return this.bits * 0.5;
  }

  rgbStereo(valueL, valueR) {
    let rgbL = this.rgbMono(valueL).rgb,
      rgbR = this.rgbMono(valueR).rgb;
    return { rgbL, rgbR };
  }

  rgbMono(value) {
    let bytes = this._valToBytes(value),
      r = Math.floor(bytes / 256.0 / 256.0),
      g = Math.floor((bytes - r * 256.0 * 256.0) / 256.0),
      b = bytes % 256.0,
      rgb = [r, g, b];
    return { rgb };
  }

  valueStereo(rgbL, rgbR) {
    let valueL = this.valueMono(rgbL).value,
      valueR = this.valueMono(rgbR).value;
    return { valueL, valueR };
  }

  valueMono(rgb) {
    let bytes = rgb[0] * 256.0 * 256.0 + rgb[1] * 256.0 + rgb[2],
      value = this._bytesToVal(bytes);
    return { value };
  }

  _valToBytes(value) {
    return value * this.bitsH + this.bitsH;
  }

  _bytesToVal(bytes) {
    return bytes / this.bits * 2.0 - 1.0;
  }
}
