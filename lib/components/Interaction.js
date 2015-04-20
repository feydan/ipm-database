var React = require('react');
var Insect = require('./Insect');
var Plant = require('./Plant');

module.exports = React.createClass({
  displayName: 'Interaction',
  render: function() {
    return (
      React.createElement("div", {className: "Interaction"}, 
        React.createElement("h3", null, "Interaction Relationship"), 
        React.createElement(Insect, {insectName: this.props.insectName, insectObj: this.props.insectObj}), 
        React.createElement("div", {className: "interacts-text"}, "Interacts With"), 
        React.createElement(Plant, {plantName: this.props.plantName, plantObj: this.props.plantObj}), 
        React.createElement("div", {className: "info"}, 
          React.createElement("strong", null, "Relationship: ", this.props.relationship), React.createElement("br", null), 
          React.createElement("strong", null, "Description: ", this.props.description), React.createElement("br", null), 
          React.createElement("strong", null, "Source: "), React.createElement("a", {href: this.props.source_url, target: "_blank"}, this.props.source_url)
        ), 
        React.createElement("div", {className: "horizontal-line"})
      )
    );
  }
});