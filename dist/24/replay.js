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
/******/ 	return __webpack_require__(__webpack_require__.s = 109);
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

/***/ 109:
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
  "id": "replay_24",
  "use": "replay_24-usage",
  "viewBox": "0 0 24 24",
  "content": "<symbol viewBox=\"0 0 24 24\" id=\"replay_24\"><path d=\"M19.9999908,13.1811706 C19.9999908,17.4815268 16.3826172,21 11.9613828,21 C8.11846604,21 4.88286667,18.341791 4.10215601,14.822431 C4.06628145,14.6607123 4.03429453,14.4582956 4.00619524,14.215181 L4.00622073,14.215178 C3.94740603,13.7063139 4.31224319,13.2461192 4.82110735,13.1873045 C4.8564581,13.1832186 4.89201471,13.1811706 4.9276008,13.1811706 L5.0173657,13.1811282 C5.5200635,13.1811282 5.94463189,13.5542996 6.00914006,14.0528412 C6.03141275,14.2249723 6.05643002,14.3698096 6.08419187,14.4873531 C6.69875944,17.0894291 9.10664439,19.0452927 11.9613828,19.0452927 C15.2773086,19.0452927 17.9903388,16.4064377 17.9903388,13.1811706 C17.9903388,9.95590352 15.3159167,7.31704861 11.9999908,7.31704861 L11.9999908,9.57305557 C11.9999908,9.79396947 11.8209047,9.97305557 11.5999908,9.97305557 C11.5039148,9.97305557 11.4110483,9.93847497 11.3383714,9.87563653 L7.62094447,6.66145107 C7.45383362,6.51696262 7.43549454,6.26436147 7.579983,6.09725062 C7.59680308,6.07779702 7.61546003,6.06001086 7.63569478,6.0441391 L11.3625894,3.12083186 C11.5364105,2.98448978 11.7878475,3.01487255 11.9241896,3.18869369 C11.9798503,3.259655 12.0098971,3.34734383 12.0094537,3.43752936 L11.9999908,5.36234127 C16.4212253,5.36234127 19.9999908,8.88081448 19.9999908,13.1811706 Z M10.0014518,15.5951177 L10.0014518,12.4893397 L9.25739097,12.7064551 C9.10779492,12.7501069 8.95113658,12.6642221 8.90748477,12.5146261 C8.8999921,12.4889485 8.89618867,12.4623359 8.89618867,12.4355875 L8.89618867,12.3503646 C8.89618867,12.1768688 9.00803291,12.0231535 9.17311171,11.9697702 L10.6038808,11.5070867 C10.7615282,11.4561066 10.9306542,11.5425774 10.9816343,11.7002248 C10.9912776,11.7300449 10.9961886,11.7611919 10.9961886,11.7925325 L10.9961886,15.5951177 C10.9961886,15.8160316 10.8171025,15.9951177 10.5961886,15.9951177 L10.4014518,15.9951177 C10.1805379,15.9951177 10.0014518,15.8160316 10.0014518,15.5951177 Z M13.7499988,15.9987787 C12.7835027,15.9987787 11.9983073,15.4407477 12.0000027,13.7487787 C12.0016982,12.0568097 12.7835027,11.4987787 13.7499988,11.4987787 C14.7164949,11.4987787 15.5023261,12.0568097 15.4999948,13.7487787 C15.4976636,15.4407477 14.7164949,15.9987787 13.7499988,15.9987787 Z M13.75,15.3999878 C14.2364089,15.3999878 14.5,14.9902273 14.5,13.7499878 C14.5,12.5097484 14.2320774,12.0999879 13.75,12.0999879 C13.2679226,12.0999879 13,12.5102759 13,13.7499878 C13,14.9896998 13.2635911,15.3999878 13.75,15.3999878 Z\" /></symbol>"
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