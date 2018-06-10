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
/******/ 		141: 0
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
/******/ 	deferredModules.push([144,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),

/***/ 144:
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
  "id": "logo_instagram_24",
  "use": "logo_instagram_24-usage",
  "viewBox": "0 0 24 24",
  "content": "<symbol viewBox=\"0 0 24 24\" id=\"logo_instagram_24\"><path d=\"M9,0.00282142857 C11.4435,0.00282142857 11.7498929,0.0131785714 12.7095,0.0569642857 C13.6671786,0.100678571 14.3211786,0.25275 14.8935,0.475178571 C15.4851429,0.705107143 15.9868929,1.01275 16.4870714,1.51292857 C16.98725,2.01310714 17.2948929,2.51485714 17.5248214,3.1065 C17.74725,3.67882143 17.8993214,4.33282143 17.9430357,5.2905 C17.9868214,6.25010714 17.9971786,6.5565 17.9971786,9 C17.9971786,11.4435 17.9868214,11.7498929 17.9430357,12.7095 C17.8993214,13.6671786 17.74725,14.3211786 17.5248214,14.8935 C17.2948929,15.4851429 16.98725,15.9868929 16.4870714,16.4870714 C15.9868929,16.98725 15.4851429,17.2948929 14.8935,17.5248214 C14.3211786,17.74725 13.6671786,17.8993214 12.7095,17.9430357 C11.7498929,17.9868214 11.4435,17.9971429 9,17.9971429 C6.5565,17.9971429 6.25014286,17.9868214 5.2905,17.9430357 C4.33282143,17.8993214 3.67882143,17.74725 3.1065,17.5248214 C2.51485714,17.2948929 2.01310714,16.98725 1.51292857,16.4870714 C1.01275,15.9868929 0.705107143,15.4851071 0.475178571,14.8935 C0.25275,14.3211786 0.100678571,13.6671786 0.0569642857,12.7095 C0.0131785714,11.7498929 0.00285714286,11.4435 0.00285714286,9 C0.00285714286,6.5565 0.0131785714,6.25010714 0.0569642857,5.2905 C0.100678571,4.33282143 0.25275,3.67882143 0.475178571,3.1065 C0.705107143,2.51485714 1.01275,2.01310714 1.51292857,1.51292857 C2.01310714,1.01275 2.51485714,0.705107143 3.1065,0.475178571 C3.67882143,0.25275 4.33282143,0.100678571 5.2905,0.0569642857 C6.25014286,0.0131785714 6.5565,0.00282142857 9,0.00282142857 Z M8.99603465,1.79603102 C6.65101198,1.79603102 6.37326697,1.80495568 5.44715976,1.84720834 C4.59091587,1.88628856 4.12589257,2.02936193 3.8164232,2.14960073 C3.40648175,2.30891976 3.11388556,2.4992659 2.80657764,2.80657382 C2.49926972,3.11388175 2.30892357,3.40647794 2.14963941,3.81638453 C2.02936574,4.12588875 1.88629238,4.59091205 1.84721215,5.44719081 C1.80495949,6.37326315 1.79603484,6.65100816 1.79603484,8.99603083 C1.79603484,11.3410535 1.80495949,11.6187985 1.84721215,12.5449057 C1.88629238,13.4011496 2.02936574,13.8661729 2.14963941,14.1756771 C2.30892357,14.5855837 2.49926972,14.8781799 2.80657764,15.1854878 C3.11388556,15.4927958 3.40648175,15.6831419 3.8164232,15.8424261 C4.12589257,15.9626997 4.59091587,16.1057731 5.44719463,16.1448533 C6.37312752,16.187106 6.65087253,16.1960306 8.99603465,16.1960306 C11.3411968,16.1960306 11.6189418,16.187106 12.5448747,16.1448533 C13.4011534,16.1057731 13.8661767,15.9626997 14.175681,15.8424261 C14.5855875,15.6831419 14.8781837,15.4927958 15.1854917,15.1854878 C15.4927996,14.8781799 15.6831457,14.5855837 15.8424299,14.1756771 C15.9627035,13.8661729 16.1057769,13.4011496 16.1448571,12.5448709 C16.1871098,11.6187985 16.1960345,11.3410535 16.1960345,8.99603083 C16.1960345,6.65100816 16.1871098,6.37326315 16.1448571,5.44715595 C16.1057769,4.59091205 15.9627035,4.12588875 15.8424299,3.81638453 C15.6831457,3.40647794 15.4927996,3.11388175 15.1854917,2.80657382 C14.8781837,2.4992659 14.5855875,2.30891976 14.175681,2.14960073 C13.8661767,2.02936193 13.4011534,1.88628856 12.5448747,1.84720834 C11.6188023,1.80495568 11.3410573,1.79603102 8.99603465,1.79603102 Z M8.99999905,4.20000267 C11.6509542,4.20000267 13.7999992,6.34904771 13.7999992,9.00000286 C13.7999992,11.650958 11.6509542,13.8000031 8.99999905,13.8000031 C6.34904389,13.8000031 4.19999886,11.650958 4.19999886,9.00000286 C4.19999886,6.34904771 6.34904389,4.20000267 8.99999905,4.20000267 Z M9,11.9990714 C10.6563214,11.9990714 11.9990714,10.6563214 11.9990714,9 C11.9990714,7.34367857 10.6563214,6.00092857 9,6.00092857 C7.34367857,6.00092857 6.00092857,7.34367857 6.00092857,9 C6.00092857,10.6563214 7.34367857,11.9990714 9,11.9990714 Z M14.8823571,4.19728571 C14.8823571,4.79357143 14.399,5.27696429 13.8027143,5.27696429 C13.2064286,5.27696429 12.7230357,4.79357143 12.7230357,4.19728571 C12.7230357,3.601 13.2064286,3.11764286 13.8027143,3.11764286 C14.399,3.11764286 14.8823571,3.601 14.8823571,4.19728571 Z\" /></symbol>"
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