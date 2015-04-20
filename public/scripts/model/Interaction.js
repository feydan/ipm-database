var Interaction = React.createClass({
  render: function() {
    return (
      <div className="Interaction">
        <h3>Interaction Relationship</h3>
        <Insect insectName={this.props.insectName} insectObj={this.props.insectObj} />
        <div className="interacts-text">Interacts With</div>
        <Plant plantName={this.props.plantName} plantObj={this.props.plantObj} />
        <div className="info">
          <strong>Relationship: {this.props.relationship}</strong><br />
          <strong>Description: {this.props.description}</strong><br />
          <strong>Source: </strong><a href={this.props.source_url} target="_blank">{this.props.source_url}</a>
        </div>
        <div className="horizontal-line"></div>
      </div>
    );
  }
});

var InteractionsBox = React.createClass({
  render: function() {
    return (
      <div className="InteractionsBox">
        <h2>Interactions</h2>
        <InteractionsList data={this.props.data} />
        <InputForm inputType="interactions"
                   sample={this.props.data.interactions[0]}
                   onInputSubmit={this.props.onInputSubmit}
        />
        <div className="horizontal-line"></div>
      </div>
    );
  }
});

var InteractionsList = React.createClass({
  render: function() {
    var plants = this.props.data.plants;
    var insects = this.props.data.insects;
    var interactions = this.props.data.interactions.map(function(interaction, index) {
      return (
        <Interaction plantName={interaction.plant} 
                     plantObj={plants[interaction.plant]} 
                     insectName={interaction.insect} 
                     insectObj={insects[interaction.insect]} 
                     relationship={interaction.relationship} 
                     description={interaction.description} 
                     source_url={interaction.source_url} 
                     key={index}>
        </Interaction>
      );
    });

    return (
      <div className="interactionsList">
        {interactions}
      </div>
    );
  }
});