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
/******/ 	return __webpack_require__(__webpack_require__.s = 164);
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

/***/ 164:
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
  "id": "forward_24",
  "use": "forward_24-usage",
  "viewBox": "0 0 24 24",
  "content": "<symbol viewBox=\"0 0 24 24\" id=\"forward_24\"><path d=\"M4,13.1811706 C4,17.4815268 7.61737361,21 12.038608,21 C15.8815248,21 19.1171242,18.341791 19.8978348,14.822431 C19.9337094,14.6607123 19.9656963,14.4582956 19.9937956,14.215181 L19.9937701,14.215178 C20.0525848,13.7063139 19.6877477,13.2461192 19.1788835,13.1873045 C19.1435327,13.1832186 19.1079761,13.1811706 19.07239,13.1811706 L18.9826251,13.1811282 C18.4799273,13.1811282 18.055359,13.5542996 17.9908508,14.0528412 C17.9685781,14.2249723 17.9435608,14.3698096 17.915799,14.4873531 C17.3012314,17.0894291 14.8933465,19.0452927 12.038608,19.0452927 C8.72268221,19.0452927 6.00965201,16.4064377 6.00965201,13.1811706 C6.00965201,9.95590352 8.68407419,7.31704861 12,7.31704861 L12,9.57305557 C12,9.79396947 12.1790861,9.97305557 12.4,9.97305557 C12.4960761,9.97305557 12.5889425,9.93847497 12.6616195,9.87563653 L16.3790464,6.66145107 C16.5461572,6.51696262 16.5644963,6.26436147 16.4200078,6.09725062 C16.4031878,6.07779702 16.3845308,6.06001086 16.3642961,6.0441391 L12.6374014,3.12083186 C12.4635803,2.98448978 12.2121433,3.01487255 12.0758013,3.18869369 C12.0201405,3.259655 11.9900937,3.34734383 11.9905371,3.43752936 L12,5.36234127 C7.57876559,5.36234127 4,8.88081448 4,13.1811706 Z M10.0014518,15.5951177 L10.0014518,12.4893397 L9.25739097,12.7064551 C9.10779492,12.7501069 8.95113658,12.6642221 8.90748477,12.5146261 C8.8999921,12.4889485 8.89618867,12.4623359 8.89618867,12.4355875 L8.89618867,12.3503646 C8.89618867,12.1768688 9.00803291,12.0231535 9.17311171,11.9697702 L10.6038808,11.5070867 C10.7615282,11.4561066 10.9306542,11.5425774 10.9816343,11.7002248 C10.9912776,11.7300449 10.9961886,11.7611919 10.9961886,11.7925325 L10.9961886,15.5951177 C10.9961886,15.8160316 10.8171025,15.9951177 10.5961886,15.9951177 L10.4014518,15.9951177 C10.1805379,15.9951177 10.0014518,15.8160316 10.0014518,15.5951177 Z M13.7499988,15.9987787 C12.7835027,15.9987787 11.9983073,15.4407477 12.0000027,13.7487787 C12.0016982,12.0568097 12.7835027,11.4987787 13.7499988,11.4987787 C14.7164949,11.4987787 15.5023261,12.0568097 15.4999948,13.7487787 C15.4976636,15.4407477 14.7164949,15.9987787 13.7499988,15.9987787 Z M13.75,15.3999878 C14.2364089,15.3999878 14.5,14.9902273 14.5,13.7499878 C14.5,12.5097484 14.2320774,12.0999879 13.75,12.0999879 C13.2679226,12.0999879 13,12.5102759 13,13.7499878 C13,14.9896998 13.2635911,15.3999878 13.75,15.3999878 Z\" /></symbol>"
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