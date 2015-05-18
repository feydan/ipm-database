var React = require('react');
var Insect = require('./Insect');
var Plant = require('./Plant');

module.exports = React.createClass({
  displayName: 'Interaction',
  render: function() {
    return (
      React.createElement("div", {className: "ui segment Interaction"}, 
        React.createElement("div", {className: "ui top large attached label"}, "Interaction - ", this.props.insectName, " and ", this.props.plantName), 
        React.createElement("div", {className: "ui stackable three column grid"}, 
          React.createElement("div", {className: "five wide column"}, 
            React.createElement(Insect, {insectName: this.props.insectName, insectObj: this.props.insectObj})
          ), 
          React.createElement("div", {className: "five wide column"}, 
            React.createElement(Plant, {plantName: this.props.plantName, plantObj: this.props.plantObj})
          ), 
          React.createElement("div", {className: "six wide column"}, 
            React.createElement("div", {className: "ui segment interaction-info"}, 
              React.createElement("div", {className: "ui list"}, 
                React.createElement("div", {className: "item"}, 
                  React.createElement("div", {className: "header"}, "Relationship"), 
                  this.props.relationship
                ), 
                React.createElement("div", {className: "item"}, 
                  React.createElement("div", {className: "header"}, "Description"), 
                  this.props.description
                ), 
                React.createElement("div", {className: "item"}, 
                  React.createElement("div", {className: "header"}, "Source"), 
                  React.createElement("a", {href: this.props.source_url, target: "_blank"}, "Click Here")
                )
              )
            )
          )
        )
      )
    );
  }
});