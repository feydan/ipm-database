var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var InteractionConstants = {
  INTERACTION_CREATE:"INTERACTION_CREATE",
  INTERACTION_DESTROY:"INTERACTION_DESTORY",
  RECEIVE_ALL_INTERACTIONS:"RECEIVE_ALL_INTERACTIONS"
};

var CHANGE_EVENT = 'change';

var _interactions = []; // collection of interaction items

function _addInteractions(interactions) {
  _interactions = interactions;
  console.log(_interactions);
}

/**
 * Create a Interaction item.
 * @param {string} text The content of the Interaction
 */
function create(interactionObj) {
  // Using the current timestamp in place of a real id.
  var insertDate = Date.now();
  _interactions[interactionObj.inputName] = interactionObj.data;
}

/**
 * Delete a TODO item.
 * @param {string} id
 */
function destroy(interactionObj) {
  delete _interactions[interactionObj.inputName];
}

var InteractionStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _interactions;
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
      case InteractionConstants.INTERACTION_CREATE:
        interactionObj = action.inputObj;
        if (interactionObj !== null) {
          create(interactionObj);
          InteractionStore.emitChange();inter
        }
        break;

      case InteractionConstants.INTERACTION_DESTROY:
        destroy(action.inputObj.inputName);
        InteractionStore.emitChange();
        break;

      case InteractionConstants.RECEIVE_ALL_INTERACTIONS:
        _addInteractions(action.interactions);
        InteractionStore.emitChange();
        break;

      // add more cases for other actionTypes, like TODO_UPDATE, etc.
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = InteractionStore;