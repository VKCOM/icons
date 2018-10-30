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
/******/ 	return __webpack_require__(__webpack_require__.s = 160);
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

/***/ 160:
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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var symbol = new _browserSymbol2.default({
  "id": "logo_instagram_24",
  "use": "logo_instagram_24-usage",
  "viewBox": "0 0 24 24",
  "content": "<symbol viewBox=\"0 0 24 24\" id=\"logo_instagram_24\"><g fill=\"none\" fill-rule=\"evenodd\"><path d=\"M0 0h24v24H0z\" /><path d=\"M12 3.003c2.444 0 2.75.01 3.71.054.957.044 1.611.196 2.183.418a4.41 4.41 0 0 1 1.594 1.038c.5.5.808 1.002 1.038 1.593.222.573.374 1.227.418 2.184.044.96.054 1.267.054 3.71 0 2.444-.01 2.75-.054 3.71-.044.957-.196 1.611-.418 2.183a4.41 4.41 0 0 1-1.038 1.594c-.5.5-1.002.808-1.593 1.038-.573.222-1.227.374-2.184.418-.96.044-1.267.054-3.71.054-2.444 0-2.75-.01-3.71-.054-.957-.044-1.611-.196-2.183-.418a4.41 4.41 0 0 1-1.594-1.038 4.41 4.41 0 0 1-1.038-1.593c-.222-.573-.374-1.227-.418-2.184-.044-.96-.054-1.267-.054-3.71 0-2.444.01-2.75.054-3.71.044-.957.196-1.611.418-2.183a4.41 4.41 0 0 1 1.038-1.594 4.41 4.41 0 0 1 1.594-1.038c.572-.222 1.226-.374 2.183-.418.96-.044 1.267-.054 3.71-.054zm-.004 1.793c-2.345 0-2.623.009-3.549.051-.856.04-1.321.182-1.63.303-.41.159-.703.35-1.01.657a2.72 2.72 0 0 0-.657 1.01c-.12.309-.264.774-.303 1.63-.042.926-.051 1.204-.051 3.549 0 2.345.009 2.623.051 3.549.04.856.182 1.321.303 1.63.159.41.35.703.657 1.01.307.308.6.498 1.01.657.309.12.774.264 1.63.303.926.042 1.204.051 3.549.051 2.345 0 2.623-.009 3.549-.051.856-.04 1.321-.182 1.63-.303.41-.159.703-.35 1.01-.657.308-.307.498-.6.657-1.01.12-.309.264-.774.303-1.63.042-.926.051-1.204.051-3.549 0-2.345-.009-2.623-.051-3.549-.04-.856-.182-1.321-.303-1.63a2.72 2.72 0 0 0-.657-1.01 2.721 2.721 0 0 0-1.01-.657c-.309-.12-.774-.264-1.63-.303-.926-.042-1.204-.051-3.549-.051zM12 7.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6zm0 7.8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5.882-7.803a1.08 1.08 0 1 1-2.159 0 1.08 1.08 0 0 1 2.16 0z\" fill=\"currentColor\" /></g></symbol>"
});
var result = _browserSprite2.default.add(symbol);

var width = symbol.viewBox.split(' ')[2];
var height = symbol.viewBox.split(' ')[3];
var size = Math.max(width, height);

function SvgIcon(_ref) {
  var className = _ref.className,
      fill = _ref.fill,
      style = _ref.style,
      getRootRef = _ref.getRootRef,
      restProps = _objectWithoutProperties(_ref, ["className", "fill", "style", "getRootRef"]);

  return _react2.default.createElement(
    "div",
    _extends({}, restProps, {
      ref: getRootRef,
      className: 'Icon' + ' Icon--' + size + ' Icon--' + symbol.id + ' ' + (className || ''),
      style: _extends({}, style, { width: width + 'px', height: height + 'px' })
    }),
    _react2.default.createElement(
      "svg",
      { viewBox: symbol.viewBox, width: width, height: height, style: { display: 'block' } },
      _react2.default.createElement("use", { xlinkHref: '#' + symbol.id, style: { fill: 'currentColor', color: fill } })
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