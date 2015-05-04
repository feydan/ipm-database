var React = require('react');
var InteractionsList = require('./InteractionsList');
var InputForm = require('./InputForm');

module.exports = React.createClass({
  displayName: 'InteractionsBox',
  render: function() {
    return (
      React.createElement("div", {className: "InteractionsBox"}, 
        React.createElement("h2", {className: "ui header"}, "Interactions"), 
        React.createElement(InteractionsList, {data: this.props.data}), 
        React.createElement(InputForm, {inputType: "interactions", 
                   sample: this.props.data.interactions[0], 
                   data: this.props.data, 
                   onInputSubmit: this.props.onInputSubmit, 
                   key: "interactions"}
        ), 
        React.createElement("div", {className: "horizontal-line"})
      )
    );
  }
});