var React = require('react');
var Interaction = require('./Interaction');
var InteractionStore = require('../stores/InteractionStore');
var InsectStore = require('../stores/InsectStore');
var PlantStore = require('../stores/PlantStore');

function getStateFromStores() {
  return {
      data:{
        interactions:InteractionStore.getAll(),
        insects:InsectStore.getAll(),
        plants:PlantStore.getAll()
      },
      numLimit:-1,
      onInputSubmit: function(){}
  };
}

module.exports = React.createClass({
  displayName: "InteractionsList",
    getInitialState: function() {
    return getStateFromStores();
  },
  componentWillMount: function() {
    this.setState(getStateFromStores());
  },
  componentDidMount: function() {
    InteractionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    InteractionStore.removeChangeListener(this._onChange);
  },
  render: function() {
    var plants = this.state.data.plants;
    var insects = this.state.data.insects;
    var interactions = this.state.data.interactions.map(function(interaction, index) {
      return (
        React.createElement("div", {className: "column"}, 
          React.createElement(Interaction, {plantName: interaction.plant, 
                       plantObj: plants[interaction.plant], 
                       insectName: interaction.insect, 
                       insectObj: insects[interaction.insect], 
                       relationship: interaction.relationship, 
                       description: interaction.description, 
                       source_url: interaction.source_url, 
                       key: index}
          )
        )
      );
    });

    return (
      React.createElement("div", {className: "ui grid interactionsList"}, 
        React.createElement("div", {className: "doubling two column row"}, 
          interactions
        )
      )
    );
  },
  _onChange: function() {
    this.setState(getStateFromStores());
  }
});