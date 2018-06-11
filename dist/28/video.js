(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("svg-sprite-loader/runtime/browser-sprite.build"), require("svg-baker-runtime/browser-symbol"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "svg-sprite-loader/runtime/browser-sprite.build", "svg-baker-runtime/browser-symbol"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("svg-sprite-loader/runtime/browser-sprite.build"), require("svg-baker-runtime/browser-symbol")) : factory(root["react"], root["svg-sprite-loader/runtime/browser-sprite.build"], root["svg-baker-runtime/browser-symbol"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__2__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _browserSymbol = __webpack_require__(2);

var _browserSymbol2 = _interopRequireDefault(_browserSymbol);

var _browserSprite = __webpack_require__(1);

var _browserSprite2 = _interopRequireDefault(_browserSprite);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbol = new _browserSymbol2.default({
  "id": "video_28",
  "use": "video_28-usage",
  "viewBox": "0 0 28 28",
  "content": "<symbol viewBox=\"0 0 28 28\" id=\"video_28\"><path d=\"M7,4 L20,4 C21.6568542,4 23,5.34314575 23,7 L23,22 C23,23.6568542 21.6568542,25 20,25 L7,25 C5.34314575,25 4,23.6568542 4,22 L4,7 C4,5.34314575 5.34314575,4 7,4 Z M7.75,7 C7.33578644,7 7,7.33578644 7,7.75 L7,9.25 C7,9.66421356 7.33578644,10 7.75,10 L9.25,10 C9.66421356,10 10,9.66421356 10,9.25 L10,7.75 C10,7.33578644 9.66421356,7 9.25,7 L7.75,7 Z M17.75,7 C17.3357864,7 17,7.33578644 17,7.75 L17,9.25 C17,9.66421356 17.3357864,10 17.75,10 L19.25,10 C19.6642136,10 20,9.66421356 20,9.25 L20,7.75 C20,7.33578644 19.6642136,7 19.25,7 L17.75,7 Z M7.75,19 C7.33578644,19 7,19.3357864 7,19.75 L7,21.25 C7,21.6642136 7.33578644,22 7.75,22 L9.25,22 C9.66421356,22 10,21.6642136 10,21.25 L10,19.75 C10,19.3357864 9.66421356,19 9.25,19 L7.75,19 Z M17.75,19 C17.3357864,19 17,19.3357864 17,19.75 L17,21.25 C17,21.6642136 17.3357864,22 17.75,22 L19.25,22 C19.6642136,22 20,21.6642136 20,21.25 L20,19.75 C20,19.3357864 19.6642136,19 19.25,19 L17.75,19 Z M7.75,13 C7.33578644,13 7,13.3357864 7,13.75 L7,15.25 C7,15.6642136 7.33578644,16 7.75,16 L9.25,16 C9.66421356,16 10,15.6642136 10,15.25 L10,13.75 C10,13.3357864 9.66421356,13 9.25,13 L7.75,13 Z M17.75,13 C17.3357864,13 17,13.3357864 17,13.75 L17,15.25 C17,15.6642136 17.3357864,16 17.75,16 L19.25,16 C19.6642136,16 20,15.6642136 20,15.25 L20,13.75 C20,13.3357864 19.6642136,13 19.25,13 L17.75,13 Z\" /></symbol>"
});
var result = _browserSprite2.default.add(symbol);

var width = symbol.viewBox.split(' ')[2];
var height = symbol.viewBox.split(' ')[3];
var size = Math.max(width, height);

function SvgIcon(props) {
  var className = 'Icon' + ' Icon--' + size + ' Icon--' + symbol.id + ' ' + (props.className || '');
  return _react2.default.createElement(
    "div",
    { className: className, style: _extends({ width: width + 'px', height: height + 'px' }, props.style), onClick: props.onClick },
    _react2.default.createElement(
      "svg",
      { viewBox: symbol.viewBox, width: width, height: height, style: { display: 'block' } },
      _react2.default.createElement("use", { xlinkHref: '#' + symbol.id, style: { fill: 'currentColor', color: props.fill } })
    )
  );
}
exports.default = SvgIcon;

/***/ })

/******/ });
});