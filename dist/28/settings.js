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
/******/ 		38: 0
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
/******/ 	deferredModules.push([41,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),

/***/ 41:
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
  "id": "settings_28",
  "use": "settings_28-usage",
  "viewBox": "0 0 28 28",
  "content": "<symbol viewBox=\"0 0 28 28\" id=\"settings_28\"><path d=\"M10.6479449,5.89424326 C12.1130909,5.05494738 12.3667168,4.18025147 12.5416667,3.30555556 C12.736123,2.33333333 13.0277778,2.33333333 13.5138889,2.33333333 C14,2.33333333 14,2.33333333 14.4861111,2.33333333 C14.9722222,2.33333333 15.1666785,2.33333333 15.4583333,3.30555556 C15.7211337,4.18159258 15.9050167,5.05762961 17.3613746,5.89810353 C18.9908611,6.3406464 19.7887052,5.9014836 20.5309168,5.40668842 C21.3558831,4.85672487 21.5621142,5.06295596 21.9058467,5.40668842 C22.2495791,5.75042089 22.2495791,5.75042089 22.5933116,6.09415335 C22.937044,6.43788581 23.0745454,6.57538719 22.5933116,7.4690832 C22.1596878,8.27436288 21.6702609,9.02383945 22.1057567,10.6479449 C22.9450526,12.1130909 23.8197485,12.3667168 24.6944444,12.5416667 C25.6666667,12.736123 25.6666667,13.0277778 25.6666667,13.5138889 C25.6666667,14 25.6666667,14 25.6666667,14.4861111 C25.6666667,14.9722222 25.6666667,15.1666785 24.6944444,15.4583333 C23.8184074,15.7211337 22.9423704,15.9050167 22.1018965,17.3613746 C21.6593536,18.9908611 22.0985164,19.7887052 22.5933116,20.5309168 C23.1432751,21.3558831 22.937044,21.5621142 22.5933116,21.9058467 C22.2495791,22.2495791 22.2495791,22.2495791 21.9058467,22.5933116 C21.5621142,22.937044 21.4246128,23.0745454 20.5309168,22.5933116 C19.7256371,22.1596878 18.9761605,21.6702609 17.3520551,22.1057567 C15.8869091,22.9450526 15.6332832,23.8197485 15.4583333,24.6944444 C15.263877,25.6666667 14.9722222,25.6666667 14.4861111,25.6666667 C14,25.6666667 14,25.6666667 13.5138889,25.6666667 C13.0277778,25.6666667 12.8333215,25.6666667 12.5416667,24.6944444 C12.2788663,23.8184074 12.0949833,22.9423704 10.6386254,22.1018965 C9.00913886,21.6593536 8.21129484,22.0985164 7.4690832,22.5933116 C6.6441169,23.1432751 6.43788581,22.937044 6.09415335,22.5933116 C5.75042089,22.2495791 5.75042089,22.2495791 5.40668842,21.9058467 C5.06295596,21.5621142 4.92545458,21.4246128 5.40668842,20.5309168 C5.84031219,19.7256371 6.32973906,18.9761605 5.89424326,17.3520551 C5.05494738,15.8869091 4.18025147,15.6332832 3.30555556,15.4583333 C2.33333333,15.263877 2.33333333,14.9722222 2.33333333,14.4861111 C2.33333333,14 2.33333333,14 2.33333333,13.5138889 C2.33333333,13.0277778 2.33333333,12.8333215 3.30555556,12.5416667 C4.18159258,12.2788663 5.05762961,12.0949833 5.89810353,10.6386254 C6.3406464,9.00913886 5.9014836,8.21129484 5.40668842,7.4690832 C4.85672487,6.6441169 5.06295596,6.43788581 5.40668842,6.09415335 C5.75042089,5.75042089 5.75042089,5.75042089 6.09415335,5.40668842 C6.43788581,5.06295596 6.57538719,4.92545458 7.4690832,5.40668842 C8.27436288,5.84031219 9.02383945,6.32973906 10.6479449,5.89424326 Z M14,19.5016658 C17.0375661,19.5016658 19.5,17.0392319 19.5,14.0016658 C19.5,10.9640996 17.0375661,8.50166575 14,8.50166575 C10.9624339,8.50166575 8.5,10.9640996 8.5,14.0016658 C8.5,17.0392319 10.9624339,19.5016658 14,19.5016658 Z\" /></symbol>"
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