var React = require('react');
var InteractionsList = require('./InteractionsList');
var InsectsBox = require('./InsectsBox');
var PlantsBox = require('./PlantsBox');

module.exports = React.createClass({
  displayName:'Home',
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(InteractionsList, null), 
        React.createElement(InsectsBox, null), 
        React.createElement(PlantsBox, null)
      )
    );
  }
});