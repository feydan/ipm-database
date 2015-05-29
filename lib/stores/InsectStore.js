var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var InsectConstants = {
  INSECT_CREATE:"INSECT_CREATE",
  INSECT_DESTROY:"INSECT_DESTORY",
  RECEIVE_ALL_INSECTS:"RECEIVE_ALL_INSECTS"
};

var CHANGE_EVENT = 'change';

var _insects = {}; // collection of insect items

function _addInsects(insects) {
  for(var insectName in insects){
    if (!_insects[insectName]) {
      _insects[insectName] = insects[insectName];
    }
  };
}

/**
 * Create a Insect item.
 * @param {string} text The content of the Insect
 */
function create(insectObj) {
  // Using the current timestamp in place of a real id.
  var insertDate = Date.now();
  _insects[insectObj.inputName] = insectObj.data;
}

/**
 * Delete a TODO item.
 * @param {string} id
 */
function destroy(insectObj) {
  delete _insects[insectObj.inputName];
}

var InsectStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _insects;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload;

    switch(action.actionType) {
      case InsectConstants.INSECT_CREATE:
        insectObj = action.inputObj;
        if (insectObj !== null) {
          create(insectObj);
          InsectStore.emitChange();
        }
        break;

      case InsectConstants.INSECT_DESTROY:
        destroy(action.inputObj.inputName);
        InsectStore.emitChange();
        break;

      case InsectConstants.RECEIVE_ALL_INSECTS:
        _addInsects(action.insects);
        InsectStore.emitChange();
        break;

      // add more cases for other actionTypes, like TODO_UPDATE, etc.
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = InsectStore;