!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require){"use strict";var _interopRequire=function(obj){return obj&&obj.__esModule?obj["default"]:obj},UniqueWindowIdentifier=_interopRequire(require("./unique-window-identifier"));angular.module("angularUniqueWindow").service("uniqueWindowIdentifier",UniqueWindowIdentifier)},{"./unique-window-identifier":2}],2:[function(require,module){"use strict";var _createClass=function(){function defineProperties(target,props){for(var key in props){var prop=props[key];prop.configurable=!0,prop.value&&(prop.writable=!0)}Object.defineProperties(target,props)}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_classCallCheck=function(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")},UniqueWindowIdentifier=function(){function UniqueWindowIdentifier($window){_classCallCheck(this,UniqueWindowIdentifier),this.$window=$window,this.currentWindow=this.$window.self,this.nameKey="__uniqueWindowIdentifier"}return _createClass(UniqueWindowIdentifier,{_generateUniqueId:{value:function(){return Math.random().toString(36).slice(2)}},_setIdentifier:{value:function(nameObj){var windowNameObj=nameObj||{};windowNameObj[this.nameKey]=this._generateUniqueId(),this.currentWindow.name=JSON.stringify(windowNameObj)}},ensure:{value:function(){var windowNameObj;if(this.currentWindow.name){try{windowNameObj=JSON.parse(this.currentWindow.name)}catch(e){return console.warn("UniqueWindowIdentifier: the windows name is already set, overriding with an stringified object"),void this._setIdentifier()}windowNameObj[this.nameKey]||this._setIdentifier(windowNameObj)}else this._setIdentifier()}},reset:{value:function(){this._setIdentifier()}},get:{value:function(){var identifier;try{identifier=JSON.parse(this.currentWindow.name)[this.nameKey]}catch(e){return}return identifier}}}),UniqueWindowIdentifier}();module.exports=UniqueWindowIdentifier},{}]},{},[1]);
//# sourceMappingURL=unique-window-identifier.js.map