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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BIT16 = 65536.0,
    BIT16H = Math.round(BIT16 * 0.5) * 1.0,
    BIT24 = 16777216.0,
    BIT24H = Math.round(BIT24 * 0.5) * 1.0;

var Converter = function () {
  function Converter(bits) {
    _classCallCheck(this, Converter);

    this.bits = bits;
  }

  // value = -1 to 1


  _createClass(Converter, [{
    key: "toRGB",
    value: function toRGB(value) {
      if (this.bits === 16) return this._valueToRGB16(value);else if (this.bits === 24) return this._valueToRGB24(value);
    }
  }, {
    key: "_valueToRGB16",
    value: function _valueToRGB16(value) {
      var val = value * BIT16H + BIT16H;
      var r = 0,
          g = Math.floor(val / 256.0),
          realG = g * 256.0,
          b = val - realG;
      return [r, g, b];
    }
  }, {
    key: "_valueToRGB24",
    value: function _valueToRGB24(value) {
      var val = value * BIT24H + BIT24H;
      var r = Math.floor(val / 256.0 / 256.0),
          realR = r * 256.0 * 256.0,
          g = Math.floor((val - realR) / 256.0),
          realG = g * 256.0,
          b = val - realR - realG;
      return [r, g, b];
    }

    // r, g, b each = 0-255

  }, {
    key: "toValue",
    value: function toValue(r, g, b) {
      if (this.bits === 16) return this._normalizedValue16(r, g, b);else if (this.bits === 24) return this._normalizedValue24(r, g, b);
    }
  }, {
    key: "_normalizedValue16",
    value: function _normalizedValue16(r, g, b) {
      var value = g * 256.0 + b;
      return value / BIT16 * 2.0 - 1.0;
    }
  }, {
    key: "_normalizedValue24",
    value: function _normalizedValue24(r, g, b) {
      var value = r * 256.0 * 256.0 + g * 256.0 + b;
      return value / BIT24 * 2.0 - 1.0;
    }
  }]);

  return Converter;
}();

exports.default = Converter;

/***/ }),
/* 3 */
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
            _this.$container.remove();
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _App = __webpack_require__(5);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VERSION = '0.1';

console.info('\n%cSonicPX v' + VERSION + '\n%c\xA9 Jake Albaugh ' + new Date().getFullYear() + '\nhttps://twitter.com/jake_albaugh\nhttps://github.com/jakealbaugh/sonicpx\n\n', 'font-family: sans-serif; font-weight: bold;', 'font-family: sans-serif; font-weight: normal;');

new _App2.default();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Player = __webpack_require__(6);

var _Player2 = _interopRequireDefault(_Player);

var _Recorder = __webpack_require__(7);

var _Recorder2 = _interopRequireDefault(_Recorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);

    this.recorder = new _Recorder2.default();
    this.player = new _Player2.default();
    this._initDOM();
  }

  _createClass(App, [{
    key: '_initDOM',
    value: function _initDOM() {
      var $record = document.querySelector('nav .record'),
          $play = document.querySelector('nav .play'),
          $recorder = document.querySelector('section.recorder'),
          $player = document.querySelector('section.player');
      $record.addEventListener('click', function () {
        $recorder.classList.add('active');
        $record.classList.add('active');
        $player.classList.remove('active');
        $play.classList.remove('active');
      });
      $play.addEventListener('click', function () {
        $player.classList.add('active');
        $play.classList.add('active');
        $recorder.classList.remove('active');
        $record.classList.remove('active');
      });

      // let $record = document.querySelector('.record');
      // let recording = false,
      //   started = false;
      // $record.addEventListener('click', () => {
      //   if (recording) this.recorder.stop();
      //   else this.recorder.reset();
      //   recording = !recording;
      //   let mtd = recording ? 'add' : 'remove';
      //   $record.classList[mtd]('active');
      //   if (recording && !started) {
      //     started = true;
      //     this.recorder.initializeStream().catch(alert);
      //   }
      // });
    }
  }]);

  return App;
}();

exports.default = App;

/***/ }),
/* 6 */
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

var _Converter = __webpack_require__(2);

var _Converter2 = _interopRequireDefault(_Converter);

var _File = __webpack_require__(3);

var _File2 = _interopRequireDefault(_File);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player() {
    _classCallCheck(this, Player);

    this.canvas = new _Canvas2.default(document.querySelector('.player .input'));
    this.file = new _File2.default({
      accept: 'image/*',
      $parent: document.querySelector('.player .upload'),
      handleChange: this.handleFileChange.bind(this)
    });
  }

  _createClass(Player, [{
    key: 'handleFileChange',
    value: function handleFileChange(target, file) {
      var _this = this;

      var sized = new Image(),
          data = target.result;
      sized.onload = function () {
        return _this.handleImage(data, sized);
      };
      sized.setAttribute('src', data);
    }
  }, {
    key: 'handleImage',
    value: function handleImage(data, sized) {
      this.canvas.clear();
      this.canvas.setSize(sized.width, sized.height);
      this.canvas.drawImage(sized, 0, 0);
      this._playImage();
    }
  }, {
    key: '_playImage',
    value: function _playImage() {
      var _canvas = this.canvas,
          w = _canvas.w,
          wh = _canvas.wh,
          h = _canvas.h,
          dataL = this.canvas.imageData(0, 0, wh, h),
          dataR = this.canvas.imageData(wh, 0, wh, h),
          bitsL = dataL.data,
          bitsR = dataR.data;


      var buffer = _audioContext2.default.createBuffer(2, wh * h, _audioContext2.default.sampleRate);
      var converter = new _Converter2.default(16);

      // Fill the buffer with data;
      // Values between -1.0 and 1.0
      var channelL = buffer.getChannelData(0),
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

        if (dLa === 255) channelL[channelIdx] = converter.toValue(dLr, dLg, dLb);
        if (dRa === 255) channelR[channelIdx] = converter.toValue(dRr, dRg, dRb);
      }

      var source = _audioContext2.default.createBufferSource(),
          gainNode = _audioContext2.default.createGain();

      gainNode.gain.value = 0.95;
      source.connect(gainNode);
      source.buffer = buffer;
      gainNode.connect(_audioContext2.default.destination);
      source.start();
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ }),
/* 7 */
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

var _Converter = __webpack_require__(2);

var _Converter2 = _interopRequireDefault(_Converter);

var _File = __webpack_require__(3);

var _File2 = _interopRequireDefault(_File);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SECONDS_PER_CANVAS = 5;

var Recorder = function () {
  function Recorder() {
    _classCallCheck(this, Recorder);

    this.$parent = document.querySelector('.recorder .output');
    this.file = new _File2.default({
      accept: 'audio/*',
      $parent: document.querySelector('.recorder .upload'),
      handleChange: this.handleFileChange.bind(this)
    });
    this.reset();
  }

  _createClass(Recorder, [{
    key: 'handleFileChange',
    value: function handleFileChange(target, file) {
      var _this = this;

      var element = new Audio();
      element.setAttribute('crossorigin', 'anonymous');
      element.src = target.result;
      // https://stackoverflow.com/questions/29317866/read-samples-from-wav-file
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer
      element.addEventListener('canplay', function () {
        _this.initializeElement(element);
      });
    }
  }, {
    key: 'initializeElement',
    value: function initializeElement(element) {
      this.mode = 'element';
      this.reset();
      this._recordElement(element);
      element.addEventListener('ended', this.stop.bind(this));
    }
  }, {
    key: 'initializeStream',
    value: function initializeStream() {
      var _this2 = this;

      this.mode = 'stream';
      this.reset();
      return new Promise(function (resolve, reject) {
        if (navigator.mediaDevices) navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
          resolve();
          _this2._recordStream(stream);
        }).catch(reject);else reject('getUserMedia not supported!');
      });
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.off = false;
      this.tick = 0;
      // this.canvas.clear();
      // this.canvas.setSize(2400, 6400);
      this.imageData = null;
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.off = true;
      if (this.mode === 'stream') this.redraw();
    }
  }, {
    key: 'redraw',
    value: function redraw() {
      var h = this.lastY;
      var data = this.canvas.imageData(0, 0, this.canvas.w, h);
      this.canvas.clear();
      this.canvas.setSize(this.canvas.w, h);
      this.canvas.putImageData(data, 0, 0);
    }
  }, {
    key: 'nextCanvas',
    value: function nextCanvas() {
      this.canvasesIdx++;
    }
  }, {
    key: '_recordElement',
    value: function _recordElement(element) {
      var _this3 = this;

      this.element = element;
      this.input = _audioContext2.default.createMediaElementSource(this.element);
      var bufferSize = 4096;
      this.recorder = _audioContext2.default.createScriptProcessor(bufferSize, 2, 2);
      this._setCanvases(element);
      // specify the processing function
      this.recorder.onaudioprocess = this._processAudio.bind(this);
      // connect stream to our recorder
      this.input.connect(this.recorder);
      this.input.connect(_audioContext2.default.destination);
      this.element.onended = function () {
        _this3.canvas.putImage(_this3.imageData, 0, 0);
        var canvas = new _Canvas2.default(),
            totalW = _this3.canvases[0].w,
            firstH = _this3.canvases[0].h,
            totalH = _this3.canvases.map(function (a) {
          return a.h;
        }).reduce(function (a, b) {
          return a + b;
        });
        canvas.setSize(totalW, totalH);
        for (var i = 0; i < _this3.canvases.length; i++) {
          var cvs = _this3.canvases[i],
              y = i * firstH,
              d = cvs.imageData(0, 0);
          canvas.putImage(d, 0, y);
        }
        _this3.$parent.innerHTML = '';
        _this3.$parent.appendChild(canvas.cvs);
        setTimeout(function () {
          alert('Download Image by right clicking and selecting "Save Image As..."');
        }, 1000);
        _this3.input.disconnect(_this3.recorder);
        _this3.input.disconnect(_audioContext2.default.destination);
        _this3.recorder.disconnect(_audioContext2.default.destination);
        _this3.recorder.onaudioprocess = null;
      };
      // connect our recorder to the previous destination
      this.recorder.connect(_audioContext2.default.destination);
      this.element.play();
    }
  }, {
    key: '_setCanvases',
    value: function _setCanvases(_ref) {
      var duration = _ref.duration;

      this.canvasesIdx = 0;
      this.canvases = [];
      var sampleCount = Math.ceil(duration * _audioContext2.default.sampleRate),
          w = Math.floor(Math.sqrt(sampleCount)) * 2,
          wh = w * 0.5,
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
    key: '_recordStream',
    value: function _recordStream(stream) {
      var _this4 = this;

      this.input = _audioContext2.default.createMediaStreamSource(stream);
      var bufferSize = 4096;
      this.recorder = _audioContext2.default.createScriptProcessor(bufferSize, 2, 2);
      // specify the processing function
      this.recorder.onaudioprocess = this._processAudio.bind(this);
      // connect stream to our recorder
      this.input.connect(this.recorder);
      this.input.onended = function () {
        _this4.input.disconnect(_this4.recorder);
        _this4.recorder.disconnect(_audioContext2.default.destination);
        _this4.recorder.onaudioprocess = null;
      };
      // connect our recorder to the previous destination
      this.recorder.connect(_audioContext2.default.destination);
    }
  }, {
    key: '_processAudio',
    value: function _processAudio(data) {
      if (this.off) return;
      if (!this.imageData) this.imageData = this.canvas.createImage(this.canvas.w, this.canvas.h);

      var left = data.inputBuffer.getChannelData(0),
          right = data.inputBuffer.getChannelData(1),
          converter = new _Converter2.default(16);

      for (var i = 0; i < left.length; i++) {
        if (this.off) return;

        var rgbL = converter.toRGB(left[i]),
            rgbR = converter.toRGB(right[i]);

        var x = this.tick % this.canvas.wh,
            y = Math.floor(this.tick / this.canvas.wh);
        if (y !== this.lastY && y > this.canvas.h) {
          this.canvas.putImage(this.imageData, 0, 0);
          this.nextCanvas();
          this.imageData = this.canvas.createImage(this.canvas.w, this.canvas.h);
          this.tick = 0;
        }
        this.lastY = y;

        // The image data starting index
        var idxL = y * this.canvas.w * 4 + x * 4,
            idxR = idxL + this.canvas.wh * 4;

        // Setting Left channel
        this.imageData.data[idxL + 0] = rgbL[0];
        this.imageData.data[idxL + 1] = rgbL[1];
        this.imageData.data[idxL + 2] = rgbL[2];
        this.imageData.data[idxL + 3] = 255;

        // Setting Right channel
        this.imageData.data[idxR + 0] = rgbR[0];
        this.imageData.data[idxR + 1] = rgbR[1];
        this.imageData.data[idxR + 2] = rgbR[2];
        this.imageData.data[idxR + 3] = 255;

        this.tick++;
      }
    }
  }, {
    key: 'canvas',
    get: function get() {
      return this.canvases[this.canvasesIdx];
    }
  }]);

  return Recorder;
}();

exports.default = Recorder;

/***/ })
/******/ ]);