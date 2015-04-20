var React = require('react');
var InteractionsList = require('./InteractionsList');
var InputForm = require('./InputForm');

module.exports = React.createClass({
  displayName: 'InteractionsBox',
  render: function() {
    return (
      <div className="InteractionsBox">
        <h2>Interactions</h2>
        <InteractionsList data={this.props.data} />
        <InputForm inputType="interactions"
                   sample={this.props.data.interactions[0]}
                   data={this.props.data}
                   onInputSubmit={this.props.onInputSubmit}
        />
        <div className="horizontal-line"></div>
      </div>
    );
  }
});