"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var UniqueWindowIdentifier = (function () {
  function UniqueWindowIdentifier($window) {
    _classCallCheck(this, UniqueWindowIdentifier);

    this.$window = $window;
    this.currentWindow = this.$window.self;
    this.nameKey = "__uniqueWindowIdentifier";
  }

  _createClass(UniqueWindowIdentifier, {
    _generateUniqueId: {
      value: function _generateUniqueId() {
        return Math.random().toString(36).slice(2);
      }
    },
    _setIdentifier: {
      value: function _setIdentifier(nameObj) {
        var windowNameObj = nameObj || {};
        windowNameObj[this.nameKey] = this._generateUniqueId();
        this.currentWindow.name = JSON.stringify(windowNameObj);
      }
    },
    ensure: {
      value: function ensure() {
        var windowNameObj;
        // if windowProps.name is set and it's not a stringified object, convert it to it
        if (this.currentWindow.name) {
          try {
            windowNameObj = JSON.parse(this.currentWindow.name);
          } catch (e) {
            // the name is not a stringified object
            console.warn("UniqueWindowIdentifier: the windows name is already set, overriding with an stringified object");
            this._setIdentifier();
            return;
          }
          // what's saved is a stringifed object already
          if (!windowNameObj[this.nameKey]) {
            this._setIdentifier(windowNameObj);
          }
        } else {
          this._setIdentifier();
        }
      }
    },
    reset: {
      value: function reset() {
        this._setIdentifier();
      }
    },
    get: {
      value: function get() {
        // return the identifier or undefined
        var identifier;
        try {
          identifier = JSON.parse(this.currentWindow.name)[this.nameKey];
        } catch (e) {
          return;
        }
        return identifier;
      }
    }
  });

  return UniqueWindowIdentifier;
})();

angular.module("angularUniqueWindow", []).service("uniqueWindowIdentifier", UniqueWindowIdentifier);
//# sourceMappingURL=unique-window-identifier.js.map