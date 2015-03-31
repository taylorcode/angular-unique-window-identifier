/**
 * @ngdoc service
 * @name UniqueWindowIdentifier
 *
 * @description
 * Creates a unique identifier on per-window basis that persists beyond a page reload.
 *
 */

export default class UniqueWindowIdentifier {

  constructor($window) {
    this.$window = $window
    this.currentWindow = this.$window.self
    this.nameKey = '__uniqueWindowIdentifier'
  }

  /**
   * @ngdoc method
   * @private
   * @name UniqueWindowIdentifier#_generateUniqueId
   *
   * @description
   * Generates a unique id.
   *
   * @returns {Number} An integer unique id
   */
  _generateUniqueId () {
    return Math.random().toString(36).slice(2)
  }

  /**
   * @ngdoc method
   * @private
   * @name UniqueWindowIdentifier#_setIdentifier
   *
   * @description
   * Generates a unique id an assigns it to the windows name property
   *
   * @param {Object | undefined} nameObj An object that will be stringified with the unique id property
   */
  _setIdentifier(nameObj) {
    let windowNameObj = nameObj || {}
    windowNameObj[this.nameKey] = this._generateUniqueId()
    this.currentWindow.name = JSON.stringify(windowNameObj)
  }

  /**
   * @ngdoc method
   * @name UniqueWindowIdentifier#ensure
   *
   * @description
   * When called, ensures that the window has a unique id. If the windows name property
   * is already set, if it's already a serialized object, it will add or update the unique
   * property on the object. If it's not an object, it will create one with the id property.
   */
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

  /**
   * @ngdoc method
   * @name UniqueWindowIdentifier#reset
   *
   * @description
   * Regenerates and sets the identifier on the window.
   */
  reset() {
    this._setIdentifier()
  }

  /**
   * @ngdoc method
   * @name UniqueWindowIdentifier#get
   *
   * @description
   * Picks the identifier from the parent object on the window's name property and
   * returns it.
   *
   * @returns {String} The unique identifier
   */
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