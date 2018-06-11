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
/******/ 	return __webpack_require__(__webpack_require__.s = 220);
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

/***/ 220:
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
  "id": "verified_12",
  "use": "verified_12-usage",
  "viewBox": "0 0 12 12",
  "content": "<symbol viewBox=\"0 0 12 12\" id=\"verified_12\"><path d=\"M5.80896116,11.2931493 L4.52686318,11.7124285 C4.27296523,11.7954597 3.99450716,11.7049832 3.83790392,11.4885721 L3.047111,10.3957698 C2.97055129,10.2899714 2.86228217,10.2113093 2.73800366,10.1711902 L1.45431848,9.75679591 C1.2001062,9.67473209 1.02800965,9.43786151 1.02851823,9.17073215 L1.03108639,7.82182012 C1.03133503,7.69122675 0.989979903,7.56394877 0.913017896,7.45844265 L0.118069611,6.36865942 C-0.039356537,6.15284616 -0.039356537,5.86005803 0.118069611,5.64424477 L0.913017896,4.55446154 C0.989979903,4.44895543 1.03133503,4.32167744 1.03108639,4.19108407 L1.02851823,2.84217204 C1.02800965,2.57504268 1.2001062,2.3381721 1.45431848,2.25610828 L2.73800366,1.841714 C2.86228217,1.8015949 2.97055129,1.72293278 3.047111,1.61713438 L3.83790392,0.52433209 C3.99450716,0.307920963 4.27296523,0.217444452 4.52686318,0.300475653 L5.80896116,0.719754861 C5.933086,0.760346897 6.066914,0.760346897 6.19103884,0.719754861 L7.47313682,0.300475653 C7.72703477,0.217444452 8.00549284,0.307920963 8.16209608,0.52433209 L8.952889,1.61713438 C9.02944871,1.72293278 9.13771783,1.8015949 9.26199634,1.841714 L10.5456815,2.25610828 C10.7998938,2.3381721 10.9719903,2.57504268 10.9714818,2.84217204 L10.9689136,4.19108407 C10.968665,4.32167744 11.0100201,4.44895543 11.0869821,4.55446154 L11.8819304,5.64424477 C12.0393565,5.86005803 12.0393565,6.15284616 11.8819304,6.36865942 L11.0869821,7.45844265 C11.0100201,7.56394877 10.968665,7.69122675 10.9689136,7.82182012 L10.9714818,9.17073215 C10.9719903,9.43786151 10.7998938,9.67473209 10.5456815,9.75679591 L9.26199634,10.1711902 C9.13771783,10.2113093 9.02944871,10.2899714 8.952889,10.3957698 L8.16209608,11.4885721 C8.00549284,11.7049832 7.72703477,11.7954597 7.47313682,11.7124285 L6.19103884,11.2931493 C6.066914,11.2525573 5.933086,11.2525573 5.80896116,11.2931493 Z M3.95961941,6.04038059 C3.70577862,5.7865398 3.29422138,5.7865398 3.04038059,6.04038059 C2.7865398,6.29422138 2.7865398,6.70577862 3.04038059,6.95961941 L4.54038059,8.45961941 C4.79422138,8.7134602 5.20577862,8.7134602 5.45961941,8.45961941 L8.95961941,4.95961941 C9.2134602,4.70577862 9.2134602,4.29422138 8.95961941,4.04038059 C8.70577862,3.7865398 8.29422138,3.7865398 8.04038059,4.04038059 L5,7.08076118 L3.95961941,6.04038059 Z\" /></symbol>"
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