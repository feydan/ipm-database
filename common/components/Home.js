var React = require('react');
var InteractionsList = require('./InteractionsList');
var InsectsBox = require('./InsectsBox');
var PlantsBox = require('./PlantsBox');

module.exports = React.createClass({
  displayName:'Home',
  render: function() {
    return (
      <div>
        <InteractionsList />
        <InsectsBox />
        <PlantsBox />
      </div>
    );
  }
});