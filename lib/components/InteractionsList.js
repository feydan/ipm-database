var React = require('react');
var Interaction = require('./Interaction');

module.exports = React.createClass({
  displayName: "InteractionsList",
  render: function() {
    var plants = this.props.data.plants;
    var insects = this.props.data.insects;
    var interactions = this.props.data.interactions.map(function(interaction, index) {
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
  }
});