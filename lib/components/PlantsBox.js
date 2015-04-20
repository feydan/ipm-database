var React = require('react');
var Plant = require('./Plant');
var InputForm = require('./InputForm');

module.exports = React.createClass({
  displayName:'PlantsBox',
  render: function() {
    var plants = [];
    var counter = this.props.numLimit ? this.props.numLimit : -1;
    for(var plantName in this.props.plants){
      if(counter-- == 0) break;
      plants.push(React.createElement(Plant, {plantName: plantName, plantObj: this.props.plants[plantName]}));
    }
    return (
      React.createElement("div", {className: "PlantsBox"}, 
        React.createElement("h2", null, "Plants"), 
        plants, 
        React.createElement(InputForm, {inputType: "plants", 
                   sample: this.props.plants[Object.keys(this.props.plants)[0]], 
                   onInputSubmit: this.props.onInputSubmit}
        ), 
        React.createElement("div", {className: "horizontal-line"})
      )  
    );
  }
});