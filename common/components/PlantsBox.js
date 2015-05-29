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
        <div className="column">
          <Plant plantName={plantName} plantObj={this.state.plants[plantName]} key={counter} />
        </div>
      );
    }
    return (
      <div className="ui segment PlantsBox">
        <div className="ui top large attached label">
          <i className="leaf icon"></i>Plants ({Object.keys(this.state.plants).length})
        </div>
        <div className="ui doubling six column grid">
          {plants}
        </div>
        <InputForm inputType="plants"
                   sample={this.state.plants[Object.keys(this.state.plants)[0]]}
                   onInputSubmit={this.state.onInputSubmit}
                   key={"plant"}
        />
      </div>  
    );
  },
  _onChange: function() {
    this.setState(getStateFromStores());
  }
});