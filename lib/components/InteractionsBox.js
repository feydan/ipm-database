var React = require('react');
var InteractionsList = require('./InteractionsList');
var InputForm = require('./InputForm');

module.exports = React.createClass({
  displayName: 'InteractionsBox',
  render: function() {
    return (
      React.createElement("div", {className: "ui segment InteractionsBox"}, 
        React.createElement("div", {className: "ui top large attached label"}, "Interactions (", this.props.data.interactions.length, ")"), 
        React.createElement(InteractionsList, {data: this.props.data}), 
        React.createElement(InputForm, {inputType: "interactions", 
                   sample: this.props.data.interactions[0], 
                   data: this.props.data, 
                   onInputSubmit: this.props.onInputSubmit, 
                   key: "interactions"}
        )
      )
    );
  }
});