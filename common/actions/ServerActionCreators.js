var AppDispatcher = require('../dispatcher/AppDispatcher');

module.exports = {

  receiveAllData: function(data) {
    AppDispatcher.dispatch({
      actionType: "RECEIVE_ALL_PLANTS",
      plants: data.plants
    });
    AppDispatcher.dispatch({
      actionType: "RECEIVE_ALL_INSECTS",
      insects: data.insects
    });
    AppDispatcher.dispatch({
      actionType: "RECEIVE_ALL_INTERACTIONS",
      interactions: data.interactions
    });
  },

  // receiveCreatedMessage: function(createdMessage) {
  //   ChatAppDispatcher.dispatch({
  //     type: ActionTypes.RECEIVE_RAW_CREATED_MESSAGE,
  //     rawMessage: createdMessage
  //   });
  // }

};