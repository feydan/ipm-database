var React = require('react');
var Insect = require('./Insect');
var InputForm = require('./InputForm');
var InsectStore = require('../stores/InsectStore');

function getStateFromStores() {
  return {
      insects:InsectStore.getAll(),
      numLimit:-1,
      onInputSubmit: function(){}
  };
}

module.exports = React.createClass({
  displayName:'InsectsBox',
  getInitialState: function() {
    return getStateFromStores();
  },
  componentWillMount: function() {
    this.setState(getStateFromStores());
  },
  componentDidMount: function() {
    InsectStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    InsectStore.removeChangeListener(this._onChange);
  },
  render: function() {
    var insects = [];
    var counter = this.state.numLimit ? this.state.numLimit : -1;
    for(var insectName in this.state.insects){
      if(counter-- === 0) break;
      insects.push(
        <div className="column">
          <Insect insectName={insectName} insectObj={this.state.insects[insectName]} key={counter} />
        </div>
      );
    }
    return (
      <div className="ui segment InsectsBox">
        <div className="ui top large attached label">
          <i className="bug icon"></i>Insects ({Object.keys(this.state.insects).length})
        </div>
        <div className="ui doubling six column grid">
          {insects}
        </div>
        <InputForm inputType="insects"
                   sample={this.state.insects[Object.keys(this.state.insects)[0]]}
                   onInputSubmit={this.state.onInputSubmit}
                   key={"insects"}
        />
      </div>  
    );
  },
  _onChange: function() {
    this.setState(getStateFromStores());
  }
});