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
/******/ 		99: 0
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
/******/ 	deferredModules.push([102,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),

/***/ 102:
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
  "id": "settings_24",
  "use": "settings_24-usage",
  "viewBox": "0 0 24 24",
  "content": "<symbol viewBox=\"0 0 24 24\" id=\"settings_24\"><path d=\"M9.12680989,5.05220851 C10.3826493,4.33281204 10.600043,3.58307268 10.75,2.83333333 C10.9166768,2 11.1666667,2 11.5833333,2 C12,2 12,2 12.4166667,2 C12.8333333,2 13.0000102,2 13.25,2.83333333 C13.4752575,3.58422221 13.6328714,4.33511109 14.8811783,5.05551731 C16.277881,5.43483977 16.9617473,5.05841451 17.5979287,4.63430436 C18.3050427,4.16290703 18.4818122,4.33967654 18.77644,4.63430436 C19.0710678,4.92893219 19.0710678,4.92893219 19.3656956,5.22356001 C19.6603235,5.51818784 19.7781818,5.63604616 19.3656956,6.40207132 C18.9940181,7.09231104 18.5745094,7.73471953 18.9477915,9.12680989 C19.667188,10.3826493 20.4169273,10.600043 21.1666667,10.75 C22,10.9166768 22,11.1666667 22,11.5833333 C22,12 22,12 22,12.4166667 C22,12.8333333 22,13.0000102 21.1666667,13.25 C20.4157778,13.4752575 19.6648889,13.6328714 18.9444827,14.8811783 C18.5651602,16.277881 18.9415855,16.9617473 19.3656956,17.5979287 C19.837093,18.3050427 19.6603235,18.4818122 19.3656956,18.77644 C19.0710678,19.0710678 19.0710678,19.0710678 18.77644,19.3656956 C18.4818122,19.6603235 18.3639538,19.7781818 17.5979287,19.3656956 C16.907689,18.9940181 16.2652805,18.5745094 14.8731901,18.9477915 C13.6173507,19.667188 13.399957,20.4169273 13.25,21.1666667 C13.0833232,22 12.8333333,22 12.4166667,22 C12,22 12,22 11.5833333,22 C11.1666667,22 10.9999898,22 10.75,21.1666667 C10.5247425,20.4157778 10.3671286,19.6648889 9.11882173,18.9444827 C7.72211902,18.5651602 7.03825272,18.9415855 6.40207132,19.3656956 C5.69495734,19.837093 5.51818784,19.6603235 5.22356001,19.3656956 C4.92893219,19.0710678 4.92893219,19.0710678 4.63430436,18.77644 C4.33967654,18.4818122 4.22181821,18.3639538 4.63430436,17.5979287 C5.00598188,16.907689 5.42549062,16.2652805 5.05220851,14.8731901 C4.33281204,13.6173507 3.58307268,13.399957 2.83333333,13.25 C2,13.0833232 2,12.8333333 2,12.4166667 C2,12 2,12 2,11.5833333 C2,11.1666667 2,10.9999898 2.83333333,10.75 C3.58422221,10.5247425 4.33511109,10.3671286 5.05551731,9.11882173 C5.43483977,7.72211902 5.05841451,7.03825272 4.63430436,6.40207132 C4.16290703,5.69495734 4.33967654,5.51818784 4.63430436,5.22356001 C4.92893219,4.92893219 4.92893219,4.92893219 5.22356001,4.63430436 C5.51818784,4.33967654 5.63604616,4.22181821 6.40207132,4.63430436 C7.09231104,5.00598188 7.73471953,5.42549062 9.12680989,5.05220851 Z M12,16.75 C14.6233526,16.75 16.75,14.6233526 16.75,12 C16.75,9.37664744 14.6233526,7.25 12,7.25 C9.37664744,7.25 7.25,9.37664744 7.25,12 C7.25,14.6233526 9.37664744,16.75 12,16.75 Z\" /></symbol>"
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