class UniqueWindowIdentifier {

  constructor($window) {
    this.$window = $window
    this.currentWindow = this.$window.self
    this.nameKey = '__uniqueWindowIdentifier'
  }

  _generateUniqueId () {
    return Math.random().toString(36).slice(2)
  }

  _setIdentifier(nameObj) {
    let windowNameObj = nameObj || {}
    windowNameObj[this.nameKey] = this._generateUniqueId()
    this.currentWindow.name = JSON.stringify(windowNameObj)
  }

  ensure() {
    var windowNameObj
    // if windowProps.name is set and it's not a stringified object, convert it to it
    if(this.currentWindow.name) {
      try {
        windowNameObj = JSON.parse(this.currentWindow.name)
      } catch (e) {
        // the name is not a stringified object
        console.warn('UniqueWindowIdentifier: the windows name is already set, overriding with an stringified object')
        this._setIdentifier()
        return
      }
      // what's saved is a stringifed object already
      if(!windowNameObj[this.nameKey]) {
        this._setIdentifier(windowNameObj)
      }
    } else {
      this._setIdentifier()
    }
  }

  reset() {
    this._setIdentifier()
  }

  get() {
    // return the identifier or undefined
    var identifier
    try {
      identifier = JSON.parse(this.currentWindow.name)[this.nameKey]
    } catch (e) {
      return
    }
    return identifier
  }
  
}

angular.module('angularUniqueWindow', []).service('uniqueWindowIdentifier', UniqueWindowIdentifier)