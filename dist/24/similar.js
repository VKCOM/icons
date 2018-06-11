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
/******/ 	return __webpack_require__(__webpack_require__.s = 97);
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

/***/ 97:
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
  "id": "similar_24",
  "use": "similar_24-usage",
  "viewBox": "0 0 24 24",
  "content": "<symbol viewBox=\"0 0 24 24\" id=\"similar_24\"><path d=\"M4.05241513,20.3118169 C1.79904105,18.1566392 0.499998268,15.1806928 0.499998268,12 C0.499998268,8.83719853 1.78439495,5.87649564 4.01553571,3.72361187 C4.02807167,3.7115428 4.02807167,3.7115428 4.04155354,3.6986239 C4.06825778,3.67308194 4.06825778,3.67308194 4.07714316,3.66460475 C4.47673719,3.28336591 5.1097273,3.29824571 5.49096615,3.69783974 C5.872205,4.09743376 5.85732519,4.73042388 5.45773116,5.11166273 C5.44960212,5.11941841 5.44960212,5.11941841 5.42505983,5.14289202 C5.41290805,5.15453746 5.41290805,5.15453746 5.40428363,5.16284056 C3.55983883,6.94259169 2.49999827,9.38566324 2.49999827,12 C2.49999827,14.6291092 3.57193926,17.0847935 5.43478551,18.8664615 C5.83390938,19.2481926 5.84800905,19.8812005 5.46627801,20.2803244 C5.08454697,20.6794483 4.451539,20.6935479 4.05241513,20.3118169 Z M7.42368564,16.9618834 C6.04810767,15.6926564 5.24999491,13.9091636 5.24999491,12 C5.24999491,10.0903549 6.04851207,8.30645488 7.42469532,7.03718514 C7.83067088,6.66274919 8.46331942,6.68831709 8.83775538,7.09429265 C9.21219134,7.50026821 9.18662344,8.13291675 8.78064788,8.50735271 C7.81082194,9.40183439 7.24999491,10.6547309 7.24999491,12 C7.24999491,13.3449306 7.81053722,14.5975396 8.77993582,15.4919904 C9.18583557,15.8665086 9.21127538,16.4991623 8.83675724,16.905062 C8.46223909,17.3109618 7.82958539,17.3364016 7.42368564,16.9618834 Z M19.9475831,20.3118169 C19.5484593,20.6935479 18.9154513,20.6794483 18.5337203,20.2803244 C18.1519892,19.8812005 18.1660889,19.2481926 18.5652128,18.8664615 C20.428059,17.0847935 21.5,14.6291092 21.5,12 C21.5,9.38566324 20.4401594,6.94259169 18.5957146,5.16284056 C18.5870902,5.15453746 18.5870902,5.15453746 18.5749384,5.14289202 C18.5503961,5.11941841 18.5503961,5.11941841 18.5422671,5.11166273 C18.1426731,4.73042388 18.1277933,4.09743376 18.5090321,3.69783974 C18.890271,3.29824571 19.5232611,3.28336591 19.9228551,3.66460475 C19.9317405,3.67308194 19.9317405,3.67308194 19.9584447,3.6986239 C19.9719266,3.7115428 19.9719266,3.7115428 19.9844626,3.72361187 C22.2156033,5.87649564 23.5,8.83719853 23.5,12 C23.5,15.1806928 22.2009572,18.1566392 19.9475831,20.3118169 Z M16.5763093,16.9618834 C16.1704095,17.3364016 15.5377558,17.3109618 15.1632377,16.905062 C14.7887195,16.4991623 14.8141593,15.8665086 15.2200591,15.4919904 C16.1894577,14.5975396 16.75,13.3449306 16.75,12 C16.75,10.6547309 16.189173,9.40183439 15.219347,8.50735271 C14.8133715,8.13291675 14.7878036,7.50026821 15.1622395,7.09429265 C15.5366755,6.68831709 16.169324,6.66274919 16.5752996,7.03718514 C17.9514828,8.30645488 18.75,10.0903549 18.75,12 C18.75,13.9091636 17.9518872,15.6926564 16.5763093,16.9618834 Z M12,14.25 C10.7573593,14.25 9.75,13.2426407 9.75,12 C9.75,10.7573593 10.7573593,9.75 12,9.75 C13.2426407,9.75 14.25,10.7573593 14.25,12 C14.25,13.2426407 13.2426407,14.25 12,14.25 Z\" /></symbol>"
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