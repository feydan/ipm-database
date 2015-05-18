var React = require('react');
var Insect = require('./Insect');
var InputForm = require('./InputForm');

module.exports = React.createClass({
  displayName:'InsectBox',
  render: function() {
    var insects = [];
    var counter = this.props.numLimit ? this.props.numLimit : -1;
    for(var insectName in this.props.insects){
      if(counter-- === 0) break;
      insects.push(
        React.createElement("div", {className: "column"}, 
          React.createElement(Insect, {insectName: insectName, insectObj: this.props.insects[insectName], key: counter})
        )
      );
    }
    return (
      React.createElement("div", {className: "ui segment InsectsBox"}, 
        React.createElement("div", {className: "ui top large attached label"}, 
          React.createElement("i", {className: "bug icon"}), "Insects (", Object.keys(this.props.insects).length, ")"
        ), 
        React.createElement("div", {className: "ui doubling six column grid"}, 
          insects
        ), 
        React.createElement(InputForm, {inputType: "insects", 
                   sample: this.props.insects[Object.keys(this.props.insects)[0]], 
                   onInputSubmit: this.props.onInputSubmit, 
                   key: "insects"}
        )
      )  
    );
  }
});