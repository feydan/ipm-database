var React = require('react');
var InteractionsList = require('./InteractionsList');
var InputForm = require('./InputForm');

module.exports = React.createClass({
  displayName: 'InteractionsBox',
  render: function() {
    return (
      <div className="ui segment InteractionsBox">
        <div className="ui top large attached label">Interactions ({this.props.data.interactions.length})</div>
        <InteractionsList data={this.props.data} />
        <InputForm inputType="interactions"
                   sample={this.props.data.interactions[0]}
                   data={this.props.data}
                   onInputSubmit={this.props.onInputSubmit}
                   key={"interactions"}
        />
      </div>
    );
  }
});