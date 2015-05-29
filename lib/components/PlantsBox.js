var React = require('react');
var Plant = require('./Plant');
var InputForm = require('./InputForm');
var PlantStore = require('../stores/PlantStore');

function getStateFromStores() {
  return {
      plants:PlantStore.getAll(),
      numLimit:-1,
      onInputSubmit: function(){}
  };
}

module.exports = React.createClass({
  displayName:'PlantsBox',
  getInitialState: function() {
    return getStateFromStores();
  },
  componentWillMount: function() {
    this.setState(getStateFromStores());
  },
  componentDidMount: function() {
    PlantStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PlantStore.removeChangeListener(this._onChange);
  },
  render: function() {
    var plants = [];
    var counter = this.state.numLimit ? this.state.numLimit : -1;
    for(var plantName in this.state.plants){
      if(counter-- === 0) break;
      plants.push(
        React.createElement("div", {className: "column"}, 
          React.createElement(Plant, {plantName: plantName, plantObj: this.state.plants[plantName], key: counter})
        )
      );
    }
    return (
      React.createElement("div", {className: "ui segment PlantsBox"}, 
        React.createElement("div", {className: "ui top large attached label"}, 
          React.createElement("i", {className: "leaf icon"}), "Plants (", Object.keys(this.state.plants).length, ")"
        ), 
        React.createElement("div", {className: "ui doubling six column grid"}, 
          plants
        ), 
        React.createElement(InputForm, {inputType: "plants", 
                   sample: this.state.plants[Object.keys(this.state.plants)[0]], 
                   onInputSubmit: this.state.onInputSubmit, 
                   key: "plant"}
        )
      )  
    );
  },
  _onChange: function() {
    this.setState(getStateFromStores());
  }
});