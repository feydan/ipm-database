var React = require('react');
var Insect = require('./Insect');
var Plant = require('./Plant');

module.exports = React.createClass({
  displayName: 'Interaction',
  render: function() {
    return (
      <div className="ui segment Interaction">
        <div className="ui top large attached label">Interaction - {this.props.insectName} and {this.props.plantName}</div>
        <div className="ui stackable three column grid">
          <div className="five wide column">
            <Insect insectName={this.props.insectName} insectObj={this.props.insectObj} />
          </div>
          <div className="five wide column">
            <Plant plantName={this.props.plantName} plantObj={this.props.plantObj} />
          </div>  
          <div className="six wide column">
            <div className="ui segment interaction-info">
              <div className="ui list">
                <div className="item">
                  <div className="header">Relationship</div>
                  {this.props.relationship}
                </div>
                <div className="item">
                  <div className="header">Description</div>
                  {this.props.description}
                </div>
                <div className="item">
                  <div className="header">Source</div>
                  <a href={this.props.source_url} target="_blank">Click Here</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});