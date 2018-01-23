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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
    key: 'putImageData',
    value: function putImageData(data, x, y) {
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
            return _this.handleChange(target);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _App = __webpack_require__(4);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VERSION = '0.1';

console.info('\n%cSonicPX v' + VERSION + '\n%c\xA9 Jake Albaugh ' + new Date().getFullYear() + '\nhttps://twitter.com/jake_albaugh\nhttps://github.com/jakealbaugh/sonicpx\n\n', 'font-family: sans-serif; font-weight: bold;', 'font-family: sans-serif; font-weight: normal;');

new _App2.default();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Player = __webpack_require__(5);

var _Player2 = _interopRequireDefault(_Player);

var _Recorder = __webpack_require__(6);

var _Recorder2 = _interopRequireDefault(_Recorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function App() {
  var _this = this;

  _classCallCheck(this, App);

  this.recorder = new _Recorder2.default();
  this.player = new _Player2.default();
  var $record = document.querySelector('.record');
  var recording = false,
      started = false;
  $record.addEventListener('click', function () {
    if (recording) _this.recorder.stop();else _this.recorder.reset();
    recording = !recording;
    var mtd = recording ? 'add' : 'remove';
    $record.classList[mtd]('active');
    if (recording && !started) {
      started = true;
      _this.recorder.initializeStream().catch(alert);
    }
  });
};

exports.default = App;

/***/ }),
/* 5 */
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

var _File = __webpack_require__(2);

var _File2 = _interopRequireDefault(_File);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player() {
    _classCallCheck(this, Player);

    this.canvas = new _Canvas2.default(document.querySelector('.player .input'));
    this.file = new _File2.default({
      accept: 'image/*.png',
      $parent: document.querySelector('.player .upload'),
      handleChange: this.handleFileChange.bind(this)
    });
  }

  _createClass(Player, [{
    key: 'handleFileChange',
    value: function handleFileChange(target) {
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
          bitsL = dataL.data,
          dataR = this.canvas.imageData(wh, 0, wh, h),
          bitsR = dataR.data;


      var buffer = _audioContext2.default.createBuffer(2, wh * h, _audioContext2.default.sampleRate);

      // Fill the buffer with data;
      // Values between -1.0 and 1.0
      var channelL = buffer.getChannelData(0),
          channelR = buffer.getChannelData(1);
      for (var i = 0; i < bitsL.length; i += 4) {
        var channelIdx = Math.floor(i / 4),
            alphaL = bitsL[i + 3],
            alphaR = bitsR[i + 3],
            dL1 = bitsL[i + 0],
            dL2 = bitsL[i + 1],
            dL3 = bitsL[i + 2],
            dR1 = bitsR[i + 0],
            dR2 = bitsR[i + 1],
            dR3 = bitsR[i + 2],
            valL = dL1 * 256.0 * 256.0 + dL2 * 256.0 + dL3,
            relL = valL / 16777216.0 * 2.0 - 1.0,
            valR = dR1 * 256.0 * 256.0 + dR2 * 256.0 + dR3,
            relR = valR / 16777216.0 * 2.0 - 1.0;
        if (alphaL > 0) channelL[channelIdx] = relL;
        if (alphaR > 0) channelR[channelIdx] = relR;
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

var _File = __webpack_require__(2);

var _File2 = _interopRequireDefault(_File);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recorder = function () {
  function Recorder() {
    _classCallCheck(this, Recorder);

    this.canvas = new _Canvas2.default(document.querySelector('.recorder .output'));
    this.file = new _File2.default({
      accept: 'audio/*',
      $parent: document.querySelector('.recorder .upload'),
      handleChange: this.handleFileChange.bind(this)
    });
    this.reset();
  }

  _createClass(Recorder, [{
    key: 'handleFileChange',
    value: function handleFileChange(target) {
      var element = new Audio();
      element.setAttribute('crossorigin', 'anonymous');
      element.src = target.result;
      this.initializeElement(element);
    }
  }, {
    key: 'initializeElement',
    value: function initializeElement(element) {
      var _this = this;

      this.mode = 'element';
      this.reset();
      element.addEventListener('canplay', function () {
        return _this._recordElement(element);
      });
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
      this.canvas.clear();
      this.canvas.setSize(2400, 6400);
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
    key: '_recordElement',
    value: function _recordElement(element) {
      var _this3 = this;

      this.element = element;
      this.input = _audioContext2.default.createMediaElementSource(this.element);
      var bufferSize = 2048;
      this.recorder = _audioContext2.default.createScriptProcessor(bufferSize, 2, 2);
      var sampleCount = Math.ceil(this.element.duration * _audioContext2.default.sampleRate);
      var w = Math.floor(Math.sqrt(sampleCount)) * 2,
          wh = w * 0.5,
          h = sampleCount / wh;
      this.canvas.setSize(w, h);
      // specify the processing function
      this.recorder.onaudioprocess = this._processAudio.bind(this);
      // connect stream to our recorder
      this.input.connect(this.recorder);
      this.input.connect(_audioContext2.default.destination);
      this.element.onended = function () {
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
    key: '_recordStream',
    value: function _recordStream(stream) {
      var _this4 = this;

      this.input = _audioContext2.default.createMediaStreamSource(stream);
      var bufferSize = 2048;
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
      var left = data.inputBuffer.getChannelData(0),
          right = data.inputBuffer.getChannelData(1);
      for (var i = 0; i < left.length; i++) {
        if (this.off) return;
        // -1 through 1 => 0 through 16777216, 24 bits
        var valL = left[i] * 8388608 + 8388608,
            valR = right[i] * 8388608 + 8388608;

        // A * 256, remainder b
        var valLA = Math.floor(valL / 256 / 256),
            valLB = Math.floor(valL - valLA * 256 * 256),
            valLC = Math.floor(valL - valLB * 256),
            valRA = Math.floor(valR / 256 / 256),
            valRB = Math.floor(valR - valRA * 256 * 256),
            valRC = Math.floor(valR - valRB * 256);
        var x = this.tick % this.canvas.wh,
            y = Math.floor(this.tick / this.canvas.wh),
            xtra = 0;
        this.lastY = y;
        this.canvas.ctx.fillStyle = 'rgb(' + valLA + ',' + valLB + ',' + valLC + ')';
        this.canvas.ctx.fillRect(x, y, 1, 1);
        this.canvas.ctx.fillStyle = 'rgb(' + valRA + ',' + valRB + ',' + valRC + ')';
        this.canvas.ctx.fillRect(x + this.canvas.wh, y, 1, 1);
        this.tick++;
      }
    }
  }]);

  return Recorder;
}();

exports.default = Recorder;

/***/ })
/******/ ]);