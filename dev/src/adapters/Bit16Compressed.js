export default class Bit16Compressed {
  constructor() {}

  get bitsH() {
    return this.bits * 0.5;
  }

  rgbsStereo(valuesL, valuesR) {
    let rgbsL = this.rgbsMono(valuesL).rgb,
      rgbsR = this.rgbsMono(valuesR).rgb;
    return { rgbsL, rgbsR };
  }

  rgbsMono(values) {
    let rgbs = [[], []];
    values.forEach((value, i) => {
      let bytes = this._valToBytes(value);
      rgbs[0][i] = Math.floor(bytes / 256.0);
      rgbs[1][i] = bytes % 256.0;
    });
    return { rgbs };
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
