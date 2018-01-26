/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var audioContext = new AudioContext();
exports.default = audioContext;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
  function Canvas($parent) {
    _classCallCheck(this, Canvas);

    this.cvs = document.createElement('canvas');
    if ($parent) $parent.appendChild(this.cvs);
    this.ctx = this.cvs.getContext('2d');
  }

  _createClass(Canvas, [{
    key: 'clear',
    value: function clear() {
      this.ctx.clearRect(0, 0, this.w, this.h);
    }
  }, {
    key: 'setSize',
    value: function setSize(w, h) {
      this.w = w;
      this.wh = w * 0.5;
      this.h = h;
      this.hh = h * 0.5;
      this.cvs.width = w;
      this.cvs.height = h;
    }
  }, {
    key: 'createImage',
    value: function createImage(w, h) {
      return this.ctx.createImageData(w, h);
    }
  }, {
    key: 'putImage',
    value: function putImage(data, x, y) {
      this.ctx.putImageData(data, x, y);
    }
  }, {
    key: 'drawImage',
    value: function drawImage(data, x, y) {
      this.ctx.drawImage(data, 0, 0);
    }
  }, {
    key: 'imageData',
    value: function imageData(x, y, w, h) {
      w = w || this.w;
      h = h || this.h;
      return this.ctx.getImageData(x, y, w, h);
    }
  }]);

  return Canvas;
}();

exports.default = Canvas;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Bit2 = __webpack_require__(3);

var _Bit3 = _interopRequireDefault(_Bit2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bit16 = function (_Bit) {
  _inherits(Bit16, _Bit);

  function Bit16() {
    _classCallCheck(this, Bit16);

    return _possibleConstructorReturn(this, (Bit16.__proto__ || Object.getPrototypeOf(Bit16)).apply(this, arguments));
  }

  _createClass(Bit16, [{
    key: 'bits',
    get: function get() {
      return 65536.0;
    }
  }]);

  return Bit16;
}(_Bit3.default);

exports.default = Bit16;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bit = function () {
  function Bit() {
    _classCallCheck(this, Bit);
  }

  _createClass(Bit, [{
    key: "rgbStereo",
    value: function rgbStereo(valueL, valueR) {
      var rgbL = this.rgbMono(valueL).rgb,
          rgbR = this.rgbMono(valueR).rgb;
      return { rgbL: rgbL, rgbR: rgbR };
    }

    // Optional right, will average if present, return left if not.

  }, {
    key: "rgbMono",
    value: function rgbMono(valueL) {
      var valueR = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var value = valueR === null ? valueL : Math.max(-1, Math.min(1, valueL + valueR)),
          bytes = this._valToBytes(value),
          r = Math.floor(bytes / 256.0 / 256.0),
          g = Math.floor((bytes - r * 256.0 * 256.0) / 256.0),
          b = bytes % 256.0,
          rgb = [r, g, b];
      return { rgb: rgb };
    }
  }, {
    key: "valueStereo",
    value: function valueStereo(rgbL, rgbR) {
      var valueL = this.valueMono(rgbL).value,
          valueR = this.valueMono(rgbR).value;
      return { valueL: valueL, valueR: valueR };
    }
  }, {
    key: "valueMono",
    value: function valueMono(rgb) {
      var bytes = rgb[0] * 256.0 * 256.0 + rgb[1] * 256.0 + rgb[2],
          value = this._bytesToVal(bytes);
      return { value: value };
    }
  }, {
    key: "_valToBytes",
    value: function _valToBytes(value) {
      return value * this.bitsH + this.bitsH;
    }
  }, {
    key: "_bytesToVal",
    value: function _bytesToVal(bytes) {
      return bytes / this.bits * 2.0 - 1.0;
    }
  }, {
    key: "bitsH",
    get: function get() {
      return this.bits * 0.5;
    }
  }]);

  return Bit;
}();

exports.default = Bit;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Bit2 = __webpack_require__(3);

var _Bit3 = _interopRequireDefault(_Bit2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bit24 = function (_Bit) {
  _inherits(Bit24, _Bit);

  function Bit24() {
    _classCallCheck(this, Bit24);

    return _possibleConstructorReturn(this, (Bit24.__proto__ || Object.getPrototypeOf(Bit24)).apply(this, arguments));
  }

  _createClass(Bit24, [{
    key: 'bits',
    get: function get() {
      return 16777216.0;
    }
  }]);

  return Bit24;
}(_Bit3.default);

exports.default = Bit24;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var File = function () {
  function File(_ref) {
    var accept = _ref.accept,
        handleChange = _ref.handleChange,
        $parent = _ref.$parent;

    _classCallCheck(this, File);

    this.handleChange = handleChange;
    this.initDOM(accept, $parent);
  }

  _createClass(File, [{
    key: 'initDOM',
    value: function initDOM(accept, $parent) {
      var _this = this;

      this.$container = document.createElement('div');
      this.$container.className = 'file-upload';
      $parent.appendChild(this.$container);

      this.$file = document.createElement('input');
      this.$file.setAttribute('type', 'file');
      this.$file.setAttribute('accept', accept);
      this.$container.appendChild(this.$file);

      this.$container.addEventListener('dragover', function () {
        return _this.$container.classList.add('is-active');
      });
      this.$container.addEventListener('dragleave', function () {
        return _this.$container.classList.remove('is-active');
      });

      this.$file.addEventListener('change', function () {
        _this.$container.classList.remove('is-active');
        if (_this.$file.files && _this.$file.files[0]) {
          var reader = new FileReader();
          reader.onload = function (_ref2) {
            var target = _ref2.target;

            _this.handleChange(target, _this.$file.files[0]);
            _this.$file.value = '';
          };
          reader.readAsDataURL(_this.$file.files[0]);
        }
      });
    }
  }]);

  return File;
}();

exports.default = File;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _App = __webpack_require__(7);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VERSION = '0.1';

console.info('\n%cSonicPX v' + VERSION + '\n%c\xA9 Jake Albaugh ' + new Date().getFullYear() + '\nhttps://twitter.com/jake_albaugh\nhttps://github.com/jakealbaugh/sonicpx\n\n', 'font-family: sans-serif; font-weight: bold;', 'font-family: sans-serif; font-weight: normal;');

new _App2.default();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Player = __webpack_require__(8);

var _Player2 = _interopRequireDefault(_Player);

var _Recorder = __webpack_require__(10);

var _Recorder2 = _interopRequireDefault(_Recorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function App() {
  _classCallCheck(this, App);

  this.recorder = new _Recorder2.default();
  this.player = new _Player2.default();
};

exports.default = App;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _audioContext = __webpack_require__(0);

var _audioContext2 = _interopRequireDefault(_audioContext);

var _Canvas = __webpack_require__(1);

var _Canvas2 = _interopRequireDefault(_Canvas);

var _ImageToAudio = __webpack_require__(9);

var _ImageToAudio2 = _interopRequireDefault(_ImageToAudio);

var _File = __webpack_require__(5);

var _File2 = _interopRequireDefault(_File);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player() {
    _classCallCheck(this, Player);

    this.converter = new _ImageToAudio2.default();
    this.file = new _File2.default({
      accept: 'image/*',
      $parent: document.querySelector('.player .file'),
      handleChange: this.handleFileChange.bind(this)
    });
  }

  _createClass(Player, [{
    key: 'handleFileChange',
    value: function handleFileChange(target, file) {
      var _this = this;

      this.converter.remove();
      var sized = new Image(),
          data = target.result;
      sized.onload = function () {
        return _this.converter.initialize(sized);
      };
      sized.setAttribute('src', data);
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _audioContext = __webpack_require__(0);

var _audioContext2 = _interopRequireDefault(_audioContext);

var _Canvas = __webpack_require__(1);

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Bit = __webpack_require__(2);

var _Bit2 = _interopRequireDefault(_Bit);

var _Bit3 = __webpack_require__(4);

var _Bit4 = _interopRequireDefault(_Bit3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SECONDS_PER_CANVAS = 5;

var ImageToAudio = function () {
  function ImageToAudio() {
    _classCallCheck(this, ImageToAudio);

    this.$parent = document.querySelector('.player .input');
  }

  _createClass(ImageToAudio, [{
    key: 'remove',
    value: function remove() {
      this.$parent.innerHTML = '';
    }
  }, {
    key: 'initialize',
    value: function initialize(image) {
      this.canvas = new _Canvas2.default(this.$parent);
      this.canvas.setSize(image.width, image.height);
      this.canvas.drawImage(image, 0, 0);
      this.loadMeta();
      this.play();
    }
  }, {
    key: 'loadMeta',
    value: function loadMeta() {
      var _canvas$imageData = this.canvas.imageData(0, 0, 4, 1),
          data = _canvas$imageData.data;

      this.version = data[3] * 256 + data[7];
      this.stereo = data[11] === 1;
      this.bits = data[15];
      this.adapter = this.bits === 16 ? new _Bit2.default() : new _Bit4.default();
    }
  }, {
    key: 'play',
    value: function play() {
      var _canvas = this.canvas,
          w = _canvas.w,
          wh = _canvas.wh,
          h = _canvas.h,
          buffer = void 0;


      if (this.stereo) {
        buffer = _audioContext2.default.createBuffer(2, wh * h, _audioContext2.default.sampleRate);

        var bitsL = this.canvas.imageData(0, 1, wh, h - 1).data,
            bitsR = this.canvas.imageData(wh, 1, wh, h - 1).data,
            channelL = buffer.getChannelData(0),
            channelR = buffer.getChannelData(1),
            len = bitsL.length;
        for (var i = 0; i < len; i += 4) {
          var channelIdx = Math.floor(i / 4),
              dLr = bitsL[i + 0],
              dLg = bitsL[i + 1],
              dLb = bitsL[i + 2],
              dLa = bitsL[i + 3],
              dRr = bitsR[i + 0],
              dRg = bitsR[i + 1],
              dRb = bitsR[i + 2],
              dRa = bitsR[i + 3];

          var _adapter$valueStereo = this.adapter.valueStereo([dLr, dLg, dLb], [dRr, dRg, dRb]),
              valueL = _adapter$valueStereo.valueL,
              valueR = _adapter$valueStereo.valueR;

          if (dLa === 255) channelL[channelIdx] = valueL;
          if (dRa === 255) channelR[channelIdx] = valueR;
        }
      } else {
        buffer = _audioContext2.default.createBuffer(1, w * h, _audioContext2.default.sampleRate);

        var bits = this.canvas.imageData(0, 1, w, h - 1).data,
            channel = buffer.getChannelData(0),
            _len = bits.length;
        for (var i = 0; i < _len; i += 4) {
          var _channelIdx = Math.floor(i / 4),
              dr = bits[i + 0],
              dg = bits[i + 1],
              db = bits[i + 2],
              da = bits[i + 3],
              _adapter$valueMono = this.adapter.valueMono([dr, dg, db]),
              value = _adapter$valueMono.value;


          if (da === 255) channel[_channelIdx] = value;
        }
      }

      var source = _audioContext2.default.createBufferSource();
      source.buffer = buffer;
      source.connect(_audioContext2.default.destination);
      source.start();
    }
  }]);

  return ImageToAudio;
}();

exports.default = ImageToAudio;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _audioContext = __webpack_require__(0);

var _audioContext2 = _interopRequireDefault(_audioContext);

var _Canvas = __webpack_require__(1);

var _Canvas2 = _interopRequireDefault(_Canvas);

var _AudioToImage = __webpack_require__(11);

var _AudioToImage2 = _interopRequireDefault(_AudioToImage);

var _File = __webpack_require__(5);

var _File2 = _interopRequireDefault(_File);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recorder = function () {
  function Recorder() {
    _classCallCheck(this, Recorder);

    this.file = new _File2.default({
      accept: 'audio/*',
      $parent: document.querySelector('.recorder .file'),
      handleChange: this.handleFileChange.bind(this)
    });
  }

  _createClass(Recorder, [{
    key: 'handleFileChange',
    value: function handleFileChange(target, file) {
      var _this = this;

      var element = new Audio();
      element.setAttribute('crossorigin', 'anonymous');
      element.src = target.result;
      if (this.converter) this.converter.remove();
      element.addEventListener('canplay', function () {
        _this.initializeElement(element);
      });
    }
  }, {
    key: 'initializeElement',
    value: function initializeElement(element) {
      var _this2 = this;

      this._recordElement(element);
      element.addEventListener('ended', function () {
        return _this2.converter.stop();
      });
    }
  }, {
    key: '_recordElement',
    value: function _recordElement(element) {
      var _this3 = this;

      var stereo = document.querySelector('#stereo').checked;
      this.converter = new _AudioToImage2.default({
        duration: element.duration,
        bits: 16,
        stereo: stereo
      });
      this.element = element;
      this.input = _audioContext2.default.createMediaElementSource(this.element);
      var bufferSize = 4096,
          channels = stereo ? 2 : 1;
      this.processor = _audioContext2.default.createScriptProcessor(bufferSize, channels, channels);
      // specify the processing function
      this.processor.onaudioprocess = function (data) {
        return _this3.converter.process(data);
      };
      // connect stream to our processor
      this.input.connect(this.processor);
      this.input.connect(_audioContext2.default.destination);
      this.element.onended = function () {
        _this3.converter.handleEnd();
        _this3.input.disconnect(_this3.processor);
        _this3.input.disconnect(_audioContext2.default.destination);
        _this3.processor.disconnect(_audioContext2.default.destination);
        _this3.processor.onaudioprocess = null;
      };
      // connect our processor to the previous destination
      this.processor.connect(_audioContext2.default.destination);
      this.element.play();
    }
  }]);

  return Recorder;
}();

exports.default = Recorder;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _audioContext = __webpack_require__(0);

var _audioContext2 = _interopRequireDefault(_audioContext);

var _Canvas = __webpack_require__(1);

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Bit = __webpack_require__(2);

var _Bit2 = _interopRequireDefault(_Bit);

var _Bit3 = __webpack_require__(4);

var _Bit4 = _interopRequireDefault(_Bit3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SECONDS_PER_CANVAS = 5,
    VERSION = 1;

var AudioToImage = function () {
  function AudioToImage(_ref) {
    var duration = _ref.duration,
        bits = _ref.bits,
        _ref$stereo = _ref.stereo,
        stereo = _ref$stereo === undefined ? true : _ref$stereo;

    _classCallCheck(this, AudioToImage);

    this.bits = bits;
    this.adapter = bits === 16 ? new _Bit2.default() : new _Bit4.default();
    this.$parent = document.querySelector('.recorder .output');
    this.stereo = stereo;
    this.initialize(duration);
    this.off = false;
    this.tick = 0;
    this.imageData = null;
  }

  _createClass(AudioToImage, [{
    key: 'initialize',
    value: function initialize(duration) {
      this.canvasesIdx = 0;
      this.canvases = [];
      var sampleCount = Math.ceil(duration * _audioContext2.default.sampleRate),
          di = Math.floor(Math.sqrt(sampleCount)),
          w = this.stereo ? di * 2 : di,
          wh = this.stereo ? w * 0.5 : w,
          h = Math.ceil(sampleCount / wh),
          canvasCount = Math.ceil(duration / SECONDS_PER_CANVAS),
          cvsH = Math.ceil(h / canvasCount),
          cvsLastH = canvasCount === 1 ? h : h - cvsH * (canvasCount - 1);
      for (var i = 0; i < canvasCount; i++) {
        var canvas = new _Canvas2.default(this.$parent),
            ch = i === canvasCount - 1 ? cvsLastH : cvsH;
        canvas.setSize(w, ch);
        this.canvases.push(canvas);
      }
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.$parent.innerHTML = '';
    }
  }, {
    key: 'handleEnd',
    value: function handleEnd() {
      this.canvas.putImage(this.imageData, 0, 0);
      var canvas = new _Canvas2.default(),
          totalW = this.canvases[0].w,
          firstH = this.canvases[0].h,
          totalH = this.canvases.map(function (a) {
        return a.h;
      }).reduce(function (a, b) {
        return a + b;
      });
      canvas.setSize(totalW, totalH + 1);
      // Storing metadata in alpha channel of first four pixels
      var meta = new _Canvas2.default().createImage(4, 1);
      meta.data[3] = Math.floor(VERSION / 256);
      meta.data[7] = VERSION % 256;
      meta.data[11] = this.stereo ? 1 : 0;
      meta.data[15] = this.bits;
      canvas.putImage(meta, 0, 0);
      for (var i = 0; i < this.canvases.length; i++) {
        var cvs = this.canvases[i],
            y = i * firstH,
            d = cvs.imageData(0, 0);
        canvas.putImage(d, 0, y + 1);
      }
      this.$parent.innerHTML = '';
      this.$parent.appendChild(canvas.cvs);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.off = true;
    }
  }, {
    key: 'process',
    value: function process(data) {
      if (this.off) return;
      if (!this.imageData) this.imageData = this.canvas.createImage(this.canvas.w, this.canvas.h);

      if (this.stereo) {
        var left = data.inputBuffer.getChannelData(0),
            right = data.inputBuffer.getChannelData(1),
            len = right.length;
        for (var i = 0; i < len; i++) {
          if (this.off) return;

          var _tickPosition = this.tickPosition(),
              x = _tickPosition.x,
              y = _tickPosition.y;
          // The image data starting index


          var idxL = y * this.canvas.w * 4 + x * 4,
              idxR = idxL + this.canvas.wh * 4,
              _adapter$rgbStereo = this.adapter.rgbStereo(left[i], right[i]),
              rgbL = _adapter$rgbStereo.rgbL,
              rgbR = _adapter$rgbStereo.rgbR;
          // Setting Left channel
          this.setDataAtIndex(idxL, rgbL);
          // Setting Right channel
          this.setDataAtIndex(idxR, rgbR);

          this.tick++;
        }
      } else {
        var channel = data.inputBuffer.getChannelData(0),
            _len = channel.length;
        for (var _i = 0; _i < _len; _i++) {
          if (this.off) return;

          var _tickPosition2 = this.tickPosition(),
              x = _tickPosition2.x,
              y = _tickPosition2.y;

          var idx = y * this.canvas.w * 4 + x * 4,
              _adapter$rgbMono = this.adapter.rgbMono(channel[_i]),
              rgb = _adapter$rgbMono.rgb;
          // Setting the only channel
          this.setDataAtIndex(idx, rgb);

          this.tick++;
        }
      }
    }
  }, {
    key: 'setDataAtIndex',
    value: function setDataAtIndex(idx, rgb) {
      this.imageData.data[idx + 0] = rgb[0];
      this.imageData.data[idx + 1] = rgb[1];
      this.imageData.data[idx + 2] = rgb[2];
      this.imageData.data[idx + 3] = 255;
    }
  }, {
    key: 'tickPosition',
    value: function tickPosition() {
      var xFactor = this.stereo ? this.canvas.wh : this.canvas.w,
          x = this.tick % xFactor,
          y = Math.floor(this.tick / xFactor);
      if (y !== this.lastY && y > this.canvas.h) {
        this.canvas.putImage(this.imageData, 0, 0);
        this.nextCanvas();
        this.imageData = this.canvas.createImage(this.canvas.w, this.canvas.h);
        this.tick = 0;
      }
      this.lastY = y;
      return { x: x, y: y };
    }
  }, {
    key: 'nextCanvas',
    value: function nextCanvas() {
      this.canvasesIdx++;
    }
  }, {
    key: 'canvas',
    get: function get() {
      return this.canvases[this.canvasesIdx];
    }
  }]);

  return AudioToImage;
}();

exports.default = AudioToImage;

/***/ })
/******/ ]);