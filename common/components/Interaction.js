var React = require('react');
var Insect = require('./Insect');
var Plant = require('./Plant');

module.exports = React.createClass({
  displayName: 'Interaction',
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