var React = require('react');
var Plant = require('./Plant');
var InputForm = require('./InputForm');

module.exports = React.createClass({
  displayName:'PlantsBox',
  render: function() {
    var plants = [];
    var counter = this.props.numLimit ? this.props.numLimit : -1;
    for(var plantName in this.props.plants){
      if(counter-- === 0) break;
      plants.push(
        React.createElement("div", {className: "column"}, 
          React.createElement(Plant, {plantName: plantName, plantObj: this.props.plants[plantName], key: counter})
        )
      );
    }
    return (
      React.createElement("div", {className: "ui segment PlantsBox"}, 
        React.createElement("div", {className: "ui top large attached label"}, 
          React.createElement("i", {className: "leaf icon"}), "Plants (", Object.keys(this.props.plants).length, ")"
        ), 
        React.createElement("div", {className: "ui doubling six column grid"}, 
          plants
        ), 
        React.createElement(InputForm, {inputType: "plants", 
                   sample: this.props.plants[Object.keys(this.props.plants)[0]], 
                   onInputSubmit: this.props.onInputSubmit, 
                   key: "plant"}
        )
      )  
    );
  }
});