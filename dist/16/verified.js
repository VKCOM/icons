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
/******/ 		191: 0
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
/******/ 	deferredModules.push([194,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),

/***/ 194:
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
  "id": "verified_16",
  "use": "verified_16-usage",
  "viewBox": "0 0 16 16",
  "content": "<symbol viewBox=\"0 0 16 16\" id=\"verified_16\"><path d=\"M5.82331983,14.8223666 L4.54259486,15.0281417 C4.15718795,15.0900653 3.78122933,14.8730055 3.64215331,14.5082715 L3.17999726,13.2962436 C3.09635683,13.0768923 2.92310766,12.9036432 2.70375635,12.8200027 L1.49172846,12.3578467 C1.12699447,12.2187707 0.909934662,11.842812 0.971858288,11.4574051 L1.17763336,10.1766802 C1.21487428,9.94489615 1.15146068,9.70823338 1.00331709,9.52612299 L0.184748166,8.51987017 C-0.0615827221,8.21705981 -0.0615827221,7.78294019 0.184748166,7.48012983 L1.00331709,6.47387701 C1.15146068,6.29176662 1.21487428,6.05510385 1.17763336,5.82331983 L0.971858288,4.54259486 C0.909934662,4.15718795 1.12699447,3.78122933 1.49172846,3.64215331 L2.70375635,3.17999726 C2.92310766,3.09635683 3.09635683,2.92310766 3.17999726,2.70375635 L3.64215331,1.49172846 C3.78122933,1.12699447 4.15718795,0.909934662 4.54259486,0.971858288 L5.82331983,1.17763336 C6.05510385,1.21487428 6.29176662,1.15146068 6.47387701,1.00331709 L7.48012983,0.184748166 C7.78294019,-0.0615827221 8.21705981,-0.0615827221 8.51987017,0.184748166 L9.52612299,1.00331709 C9.70823338,1.15146068 9.94489615,1.21487428 10.1766802,1.17763336 L11.4574051,0.971858288 C11.842812,0.909934662 12.2187707,1.12699447 12.3578467,1.49172846 L12.8200027,2.70375635 C12.9036432,2.92310766 13.0768923,3.09635683 13.2962436,3.17999726 L14.5082715,3.64215331 C14.8730055,3.78122933 15.0900653,4.15718795 15.0281417,4.54259486 L14.8223666,5.82331983 C14.7851257,6.05510385 14.8485393,6.29176662 14.9966829,6.47387701 L15.8152518,7.48012983 C16.0615827,7.78294019 16.0615827,8.21705981 15.8152518,8.51987017 L14.9966829,9.52612299 C14.8485393,9.70823338 14.7851257,9.94489615 14.8223666,10.1766802 L15.0281417,11.4574051 C15.0900653,11.842812 14.8730055,12.2187707 14.5082715,12.3578467 L13.2962436,12.8200027 C13.0768923,12.9036432 12.9036432,13.0768923 12.8200027,13.2962436 L12.3578467,14.5082715 C12.2187707,14.8730055 11.842812,15.0900653 11.4574051,15.0281417 L10.1766802,14.8223666 C9.94489615,14.7851257 9.70823338,14.8485393 9.52612299,14.9966829 L8.51987017,15.8152518 C8.21705981,16.0615827 7.78294019,16.0615827 7.48012983,15.8152518 L6.47387701,14.9966829 C6.29176662,14.8485393 6.05510385,14.7851257 5.82331983,14.8223666 Z M5.3205358,7.68699833 C5.00826706,7.37442827 4.50173514,7.374184 4.18916508,7.68645273 C3.87659502,7.99872146 3.87635074,8.50525339 4.18861948,8.81782345 L6.43404184,11.0654126 C6.74641406,11.3780862 7.25315053,11.3782118 7.56567774,11.0656931 L12.060978,6.57051488 C12.3734017,6.25809969 12.3734086,5.75156771 12.0609934,5.43914403 C11.7485782,5.12672036 11.2420462,5.12671348 10.9296225,5.43912867 L7.00028055,9.36836397 L5.3205358,7.68699833 Z\" /></symbol>"
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