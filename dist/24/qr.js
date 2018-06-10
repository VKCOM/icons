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
/******/ 		111: 0
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
/******/ 	deferredModules.push([114,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),

/***/ 114:
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
  "id": "qr_24",
  "use": "qr_24-usage",
  "viewBox": "0 0 24 24",
  "content": "<symbol viewBox=\"0 0 24 24\" id=\"qr_24\"><path d=\"M19.5,19 L21,19 C21.2761424,19 21.5,19.2238576 21.5,19.5 L21.5,21 C21.5,21.2761424 21.2761424,21.5 21,21.5 L19.5,21.5 C19.2238576,21.5 19,21.2761424 19,21 L19,19.5 C19,19.2238576 19.2238576,19 19.5,19 Z M14,19 L15.5,19 C15.7761424,19 16,19.2238576 16,19.5 L16,21 C16,21.2761424 15.7761424,21.5 15.5,21.5 L14,21.5 C13.7238576,21.5 13.5,21.2761424 13.5,21 L13.5,19.5 C13.5,19.2238576 13.7238576,19 14,19 Z M16.75,16.25 L18.25,16.25 C18.5261424,16.25 18.75,16.4738576 18.75,16.75 L18.75,18.25 C18.75,18.5261424 18.5261424,18.75 18.25,18.75 L16.75,18.75 C16.4738576,18.75 16.25,18.5261424 16.25,18.25 L16.25,16.75 C16.25,16.4738576 16.4738576,16.25 16.75,16.25 Z M19.5,13.5 L21,13.5 C21.2761424,13.5 21.5,13.7238576 21.5,14 L21.5,15.5 C21.5,15.7761424 21.2761424,16 21,16 L19.5,16 C19.2238576,16 19,15.7761424 19,15.5 L19,14 C19,13.7238576 19.2238576,13.5 19.5,13.5 Z M14,13.5 L15.5,13.5 C15.7761424,13.5 16,13.7238576 16,14 L16,15.5 C16,15.7761424 15.7761424,16 15.5,16 L14,16 C13.7238576,16 13.5,15.7761424 13.5,15.5 L13.5,14 C13.5,13.7238576 13.7238576,13.5 14,13.5 Z M4.5,13 L8.5,13 C9.88071187,13 11,14.1192881 11,15.5 L11,19.5 C11,20.8807119 9.88071187,22 8.5,22 L4.5,22 C3.11928813,22 2,20.8807119 2,19.5 L2,15.5 C2,14.1192881 3.11928813,13 4.5,13 Z M4.75,14.75 C4.19771525,14.75 3.75,15.1977153 3.75,15.75 L3.75,19.25 C3.75,19.8022847 4.19771525,20.25 4.75,20.25 L8.25,20.25 C8.80228475,20.25 9.25,19.8022847 9.25,19.25 L9.25,15.75 C9.25,15.1977153 8.80228475,14.75 8.25,14.75 L4.75,14.75 Z M5.75,16.25 L7.25,16.25 C7.52614237,16.25 7.75,16.4738576 7.75,16.75 L7.75,18.25 C7.75,18.5261424 7.52614237,18.75 7.25,18.75 L5.75,18.75 C5.47385763,18.75 5.25,18.5261424 5.25,18.25 L5.25,16.75 C5.25,16.4738576 5.47385763,16.25 5.75,16.25 Z M15.5,2 L19.5,2 C20.8807119,2 22,3.11928813 22,4.5 L22,8.5 C22,9.88071187 20.8807119,11 19.5,11 L15.5,11 C14.1192881,11 13,9.88071187 13,8.5 L13,4.5 C13,3.11928813 14.1192881,2 15.5,2 Z M15.75,3.75 C15.1977153,3.75 14.75,4.19771525 14.75,4.75 L14.75,8.25 C14.75,8.80228475 15.1977153,9.25 15.75,9.25 L19.25,9.25 C19.8022847,9.25 20.25,8.80228475 20.25,8.25 L20.25,4.75 C20.25,4.19771525 19.8022847,3.75 19.25,3.75 L15.75,3.75 Z M16.75,5.25 L18.25,5.25 C18.5261424,5.25 18.75,5.47385763 18.75,5.75 L18.75,7.25 C18.75,7.52614237 18.5261424,7.75 18.25,7.75 L16.75,7.75 C16.4738576,7.75 16.25,7.52614237 16.25,7.25 L16.25,5.75 C16.25,5.47385763 16.4738576,5.25 16.75,5.25 Z M4.5,2 L8.5,2 C9.88071187,2 11,3.11928813 11,4.5 L11,8.5 C11,9.88071187 9.88071187,11 8.5,11 L4.5,11 C3.11928813,11 2,9.88071187 2,8.5 L2,4.5 C2,3.11928813 3.11928813,2 4.5,2 Z M4.75,3.75 C4.19771525,3.75 3.75,4.19771525 3.75,4.75 L3.75,8.25 C3.75,8.80228475 4.19771525,9.25 4.75,9.25 L8.25,9.25 C8.80228475,9.25 9.25,8.80228475 9.25,8.25 L9.25,4.75 C9.25,4.19771525 8.80228475,3.75 8.25,3.75 L4.75,3.75 Z M5.75,5.25 L7.25,5.25 C7.52614237,5.25 7.75,5.47385763 7.75,5.75 L7.75,7.25 C7.75,7.52614237 7.52614237,7.75 7.25,7.75 L5.75,7.75 C5.47385763,7.75 5.25,7.52614237 5.25,7.25 L5.25,5.75 C5.25,5.47385763 5.47385763,5.25 5.75,5.25 Z\" /></symbol>"
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