const BIT16 = 65536.0,
  BIT16H = Math.round(BIT16 * 0.5) * 1.0,
  BIT24 = 16777216.0,
  BIT24H = Math.round(BIT24 * 0.5) * 1.0;

export default class Converter {
  constructor(bits) {
    this.bits = bits;
  }

  // value = -1 to 1
  toRGB(value) {
    if (this.bits === 16) return this._valueToRGB16(value);
    else if (this.bits === 24) return this._valueToRGB24(value);
  }

  _valueToRGB16(value) {
    let val = value * BIT16H + BIT16H;
    let r = 0,
      g = Math.floor(val / 256.0),
      realG = g * 256.0,
      b = val - realG;
    return [r, g, b];
  }

  _valueToRGB24(value) {
    let val = value * BIT24H + BIT24H;
    let r = Math.floor(val / 256.0 / 256.0),
      realR = r * 256.0 * 256.0,
      g = Math.floor((val - realR) / 256.0),
      realG = g * 256.0,
      b = val - realR - realG;
    return [r, g, b];
  }

  // r, g, b each = 0-255
  toValue(r, g, b) {
    if (this.bits === 16) return this._normalizedValue16(r, g, b);
    else if (this.bits === 24) return this._normalizedValue24(r, g, b);
  }

  _normalizedValue16(r, g, b) {
    let value = g * 256.0 + b;
    return (value / BIT16) * 2.0 - 1.0;
  }

  _normalizedValue24(r, g, b) {
    let value = r * 256.0 * 256.0 + g * 256.0 + b;
    return (value / BIT24) * 2.0 - 1.0;
  }
}
