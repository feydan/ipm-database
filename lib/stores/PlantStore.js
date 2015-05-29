var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var PlantConstants = {
  PLANT_CREATE:"PLANT_CREATE",
  PLANT_DESTROY:"PLANT_DESTORY",
  RECEIVE_ALL_PLANTS:"RECEIVE_ALL_PLANTS"
};

var CHANGE_EVENT = 'change';

var _plants = {}; // collection of plant items

function _addPlants(plants) {
  for(var plantName in plants){
    if (!_plants[plantName]) {
      _plants[plantName] = plants[plantName];
    }
  };
}

/**
 * Create a Plant item.
 * @param {string} text The content of the Plant
 */
function create(plantObj) {
  // Using the current timestamp in place of a real id.
  var insertDate = Date.now();
  _plants[plantObj.inputName] = plantObj.data;
}

/**
 * Delete a TODO item.
 * @param {string} id
 */
function destroy(plantObj) {
  delete _plants[plantObj.inputName];
}

var PlantStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _plants;
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
      case PlantConstants.PLANT_CREATE:
        plantObj = action.inputObj;
        if (plantObj !== null) {
          create(plantObj);
          PlantStore.emitChange();
        }
        break;

      case PlantConstants.PLANT_DESTROY:
        destroy(action.inputObj.inputName);
        PlantStore.emitChange();
        break;

      case PlantConstants.RECEIVE_ALL_PLANTS:
        _addPlants(action.plants);
        PlantStore.emitChange();
        break;

      // add more cases for other actionTypes, like TODO_UPDATE, etc.
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = PlantStore;