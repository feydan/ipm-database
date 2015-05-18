var React = require('react');
var Interaction = require('./Interaction');

module.exports = React.createClass({
  displayName: "InteractionsList",
  render: function() {
    var plants = this.props.data.plants;
    var insects = this.props.data.insects;
    var interactions = this.props.data.interactions.map(function(interaction, index) {
      return (
        <div className="column">
          <Interaction plantName={interaction.plant} 
                       plantObj={plants[interaction.plant]} 
                       insectName={interaction.insect} 
                       insectObj={insects[interaction.insect]} 
                       relationship={interaction.relationship} 
                       description={interaction.description} 
                       source_url={interaction.source_url} 
                       key={index}>
          </Interaction>
        </div>
      );
    });

    return (
      <div className="ui grid interactionsList">
        <div className="doubling two column row">
          {interactions}
        </div>
      </div>
    );
  }
});