(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		97: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([100,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),

/***/ 100:
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
  "id": "share_outline_24",
  "use": "share_outline_24-usage",
  "viewBox": "0 0 24 24",
  "content": "<symbol viewBox=\"0 0 24 24\" id=\"share_outline_24\"><path d=\"M19,18.75 C19.2718875,18.75 19.5,18.4572502 19.5,18.0499878 L19.5,5.51000977 C19.5,5.28982441 19.448136,5.25 19,5.25 L18.8712181,5.25 C18.7684931,5.33768792 18.6483329,5.4559131 18.429669,5.68358439 C17.6337251,6.51231535 17.3880198,6.75462327 16.8393462,7.20480911 C15.061788,8.66329288 12.9773207,9.5 10.327563,9.5 L6.25,9.5 C5.25393376,9.5 4.5625,10.5371506 4.5625,12 C4.5625,13.4628494 5.25393376,14.5 6.25,14.5 L7.5,14.5 C7.76934829,14.5 8.01801282,14.6444331 8.15146758,14.8783954 C8.94967356,16.2777464 9.17239336,16.9339555 9.44132401,18.2183805 C9.48617054,18.4325696 9.5175882,18.5561816 9.55890557,18.6733063 C9.58547917,18.748636 9.61603367,18.8194927 9.65327652,18.8908428 C9.69808287,18.9466431 9.74355707,18.9949716 9.78954749,19.0365982 C9.98011924,19.2090877 10.1299049,19.25 10.327563,19.25 C10.5956577,19.25 10.7931904,19.1946118 10.919723,19.0224355 C11.2591551,18.5982316 11.1845159,17.4422066 10.7653298,15.4008632 L10.7036663,15.1005754 C10.64812,14.8300773 10.8223729,14.5657662 11.092871,14.5102199 C11.1259647,14.5034241 11.1596621,14.5 11.1934464,14.5 L11.5,14.5 C13.6645601,14.5 15.4208717,15.3454075 17.0195117,16.8244826 C17.2932353,17.0777341 17.5543936,17.3415723 17.8361658,17.6441431 C17.9968113,17.8166464 18.4756371,18.3463179 18.4605398,18.3298083 C18.6530623,18.5403399 18.7770295,18.6662543 18.8691169,18.743851 C18.8712253,18.7456276 18.914853,18.7476773 19,18.75 Z M6.25,16 C4.26689957,16 3.0625,14.1934006 3.0625,12 C3.0625,9.80659936 4.26689957,8 6.25,8 L10.327563,8 C12.6081506,8 14.3647938,7.29488177 15.8878813,6.04519089 C16.1001155,5.87105302 18.1372534,3.75 18.7400055,3.75 L19,3.75 C20.2029995,3.75 21,4.36198688 21,5.51000977 L21,18.0499878 C21,19.2152993 20.1937546,20.25 19,20.25 L18.7400055,20.25 C18.1007343,20.25 15.8336428,17.770839 16.000825,17.9255174 C14.9023926,16.9092385 13.7552392,16.2679731 12.4228666,16.0675694 C12.7810057,18.0542757 12.7581812,19.1255472 12.1112232,19.9330455 C11.6387405,20.5806814 11.0348947,20.75 10.327563,20.75 C9.79275526,20.75 9.29797992,20.6148577 8.78296111,20.1487061 C8.6550255,20.0329095 8.53484329,19.9007975 8.42321776,19.7521445 L8.36841852,19.6679666 C8.27745494,19.5053685 8.20447304,19.3427721 8.14434139,19.1723135 C8.07590478,18.9783123 8.03053553,18.7998082 7.97316042,18.525782 C7.75944048,17.5050458 7.59723038,16.9850322 7.0600206,16 L6.25,16 Z\" /></symbol>"
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