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
/******/ 	return __webpack_require__(__webpack_require__.s = 161);
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

/***/ 161:
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
  "id": "game_24",
  "use": "game_24-usage",
  "viewBox": "0 0 24 24",
  "content": "<symbol viewBox=\"0 0 24 24\" id=\"game_24\"><path d=\"M8,10 L8,8.75 C8,8.47385763 7.77614237,8.25 7.5,8.25 L7.25,8.25 C6.97385763,8.25 6.75,8.47385763 6.75,8.75 L6.75,10 L5.5,10 C5.22385763,10 5,10.2238576 5,10.5 L5,10.75 C5,11.0261424 5.22385763,11.25 5.5,11.25 L6.75,11.25 L6.75,12.5 C6.75,12.7761424 6.97385763,13 7.25,13 L7.5,13 C7.77614237,13 8,12.7761424 8,12.5 L8,11.25 L9.25,11.25 C9.52614237,11.25 9.75,11.0261424 9.75,10.75 L9.75,10.5 C9.75,10.2238576 9.52614237,10 9.25,10 L8,10 Z M15.5,15.5 C14.1875,15.5 9.80823626,15.5 8.49573626,15.5 C7.18323626,15.5 5.5,20 3.68323626,20 C1.93323626,20 1.49573626,19.125 1.49573626,16.5 C1.49573626,13.875 1.93323626,6 6.74573626,6 L17.2457363,6 C22.0582363,6 22.4957363,13.875 22.4957363,16.5 C22.4957363,19.125 22.0582363,20 20.3082363,20 C18.5,20 16.8125,15.5 15.5,15.5 Z M14.75,10 C14.4738576,10 14.25,10.2238576 14.25,10.5 L14.25,10.75 C14.25,11.0261424 14.4738576,11.25 14.75,11.25 L15,11.25 C15.2761424,11.25 15.5,11.0261424 15.5,10.75 L15.5,10.5 C15.5,10.2238576 15.2761424,10 15,10 L14.75,10 Z M18.25,10 C17.9738576,10 17.75,10.2238576 17.75,10.5 L17.75,10.75 C17.75,11.0261424 17.9738576,11.25 18.25,11.25 L18.5,11.25 C18.7761424,11.25 19,11.0261424 19,10.75 L19,10.5 C19,10.2238576 18.7761424,10 18.5,10 L18.25,10 Z M16.5,11.75 C16.2238576,11.75 16,11.9738576 16,12.25 L16,12.5 C16,12.7761424 16.2238576,13 16.5,13 L16.75,13 C17.0261424,13 17.25,12.7761424 17.25,12.5 L17.25,12.25 C17.25,11.9738576 17.0261424,11.75 16.75,11.75 L16.5,11.75 Z M16.5,8.25 C16.2238576,8.25 16,8.47385763 16,8.75 L16,9 C16,9.27614237 16.2238576,9.5 16.5,9.5 L16.75,9.5 C17.0261424,9.5 17.25,9.27614237 17.25,9 L17.25,8.75 C17.25,8.47385763 17.0261424,8.25 16.75,8.25 L16.5,8.25 Z\" /></symbol>"
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

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ })

/******/ });
});