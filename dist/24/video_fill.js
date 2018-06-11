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
/******/ 	return __webpack_require__(__webpack_require__.s = 78);
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

/***/ 78:
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
  "id": "video_fill_24",
  "use": "video_fill_24-usage",
  "viewBox": "0 0 24 24",
  "content": "<symbol viewBox=\"0 0 24 24\" id=\"video_fill_24\"><path d=\"M5.8458278,4 L18.1541722,4 C19.4914503,4 19.9763797,4.13923842 20.4652686,4.40069906 C20.9541574,4.66215969 21.3378403,5.04584256 21.5993009,5.53473144 C21.8607616,6.02362033 22,6.50854969 22,7.8458278 L22,16.1541722 C22,17.4914503 21.8607616,17.9763797 21.5993009,18.4652686 C21.3378403,18.9541574 20.9541574,19.3378403 20.4652686,19.5993009 C19.9763797,19.8607616 19.4914503,20 18.1541722,20 L5.8458278,20 C4.50854969,20 4.02362033,19.8607616 3.53473144,19.5993009 C3.04584256,19.3378403 2.66215969,18.9541574 2.40069906,18.4652686 C2.13923842,17.9763797 2,17.4914503 2,16.1541722 L2,7.8458278 C2,6.50854969 2.13923842,6.02362033 2.40069906,5.53473144 C2.66215969,5.04584256 3.04584256,4.66215969 3.53473144,4.40069906 C4.02362033,4.13923842 4.50854969,4 5.8458278,4 Z M5.2819426,6 C4.83618323,6 4.67454011,6.04641281 4.51157715,6.13356635 C4.34861419,6.2207199 4.2207199,6.34861419 4.13356635,6.51157715 C4.04641281,6.67454011 4,6.83618323 4,7.2819426 L4,16.7180574 C4,17.1638168 4.04641281,17.3254599 4.13356635,17.4884229 C4.2207199,17.6513858 4.34861419,17.7792801 4.51157715,17.8664336 C4.67454011,17.9535872 4.83618323,18 5.2819426,18 L18.7180574,18 C19.1638168,18 19.3254599,17.9535872 19.4884229,17.8664336 C19.6513858,17.7792801 19.7792801,17.6513858 19.8664336,17.4884229 C19.9535872,17.3254599 20,17.1638168 20,16.7180574 L20,7.2819426 C20,6.83618323 19.9535872,6.67454011 19.8664336,6.51157715 C19.7792801,6.34861419 19.6513858,6.2207199 19.4884229,6.13356635 C19.3254599,6.04641281 19.1638168,6 18.7180574,6 L5.2819426,6 Z M9.6,13.8 C9.53508894,13.7134519 9.5,13.6081851 9.5,13.5 C9.5,13.2238576 9.72385763,13 10,13 L14,13 C14.1081851,13 14.2134519,13.0350889 14.3,13.1 C14.5209139,13.2656854 14.5656854,13.5790861 14.4,13.8 L12.4,16.4666667 C12.3715729,16.5045695 12.3379028,16.5382395 12.3,16.5666667 C12.0790861,16.7323521 11.7656854,16.6875806 11.6,16.4666667 L9.6,13.8 Z M9.6,10.2 L11.6,7.53333333 C11.7656854,7.31241943 12.0790861,7.26764791 12.3,7.43333333 C12.3379028,7.46176046 12.3715729,7.4954305 12.4,7.53333333 L14.4,10.2 C14.5656854,10.4209139 14.5209139,10.7343146 14.3,10.9 C14.2134519,10.9649111 14.1081851,11 14,11 L10,11 C9.72385763,11 9.5,10.7761424 9.5,10.5 C9.5,10.3918149 9.53508894,10.2865481 9.6,10.2 Z\" /></symbol>"
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