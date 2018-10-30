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
/******/ 	return __webpack_require__(__webpack_require__.s = 153);
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

/***/ 153:
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
  "id": "mention_24",
  "use": "mention_24-usage",
  "viewBox": "0 0 24 34",
  "content": "<symbol viewBox=\"0 0 24 34\" id=\"mention_24\"><g fill=\"none\" fill-rule=\"evenodd\"><path d=\"M0 7h24v24H0z\" /><path d=\"M12.007 29.869c-2.02 0-3.781-.408-5.287-1.224a8.532 8.532 0 0 1-3.489-3.476C2.411 23.668 2 21.916 2 19.915v-.724c0-1.993.428-3.761 1.284-5.306a9.043 9.043 0 0 1 3.607-3.601C8.441 9.428 10.211 9 12.204 9h.105c1.861 0 3.527.384 4.997 1.152 1.47.768 2.62 1.83 3.45 3.186.83 1.357 1.244 2.895 1.244 4.615v.659c0 1.176-.193 2.216-.58 3.12-.386.904-.925 1.609-1.619 2.113-.693.505-1.492.757-2.396.757-.816 0-1.519-.17-2.107-.513-.588-.342-.939-.79-1.053-1.343h-.132a2.13 2.13 0 0 1-.58.941c-.289.286-.642.51-1.059.672a3.578 3.578 0 0 1-1.31.243c-.72 0-1.347-.175-1.883-.526-.535-.351-.948-.852-1.238-1.501-.29-.65-.434-1.418-.434-2.304v-1.317c0-.86.147-1.61.441-2.252.294-.64.715-1.132 1.264-1.474.549-.343 1.192-.514 1.929-.514.65 0 1.22.16 1.712.48.491.321.816.74.974 1.258h.105v-.342c0-.351.097-.63.29-.836.193-.206.456-.31.79-.31.325 0 .584.104.777.31.193.206.29.485.29.836v5.267c0 .447.135.805.408 1.073.272.267.627.401 1.066.401.465 0 .873-.18 1.225-.54.35-.36.62-.87.81-1.534.188-.662.282-1.437.282-2.323v-.435c0-1.378-.327-2.611-.98-3.7-.655-1.088-1.563-1.94-2.726-2.554-1.163-.614-2.482-.922-3.957-.922h-.105c-1.597 0-3.01.351-4.24 1.054a7.292 7.292 0 0 0-2.863 2.969c-.68 1.277-1.02 2.745-1.02 4.404v.566c0 1.65.328 3.096.987 4.338a6.918 6.918 0 0 0 2.798 2.87c1.207.672 2.613 1.008 4.22 1.008h.105c.597 0 1.339-.066 2.225-.197.465-.062.768-.093.909-.093.254 0 .465.077.632.23.166.154.25.35.25.587s-.07.439-.211.605c-.14.167-.342.286-.606.356-.851.22-1.94.329-3.265.329h-.118zM9.9 19.968c0 .886.169 1.56.507 2.02.338.462.836.692 1.494.692.65 0 1.146-.222 1.488-.665.342-.443.514-1.086.514-1.929V19.02c0-.773-.183-1.383-.547-1.83-.364-.448-.858-.672-1.481-.672-.623 0-1.108.235-1.455.705s-.52 1.125-.52 1.968v.777z\" fill=\"currentColor\" /></g></symbol>"
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