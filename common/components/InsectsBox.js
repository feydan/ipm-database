var React = require('react');
var Insect = require('./Insect');
var InputForm = require('./InputForm');

module.exports = React.createClass({
  displayName:'InsectBox',
  render: function() {
    var insects = [];
    var counter = this.props.numLimit ? this.props.numLimit : -1;
    for(var insectName in this.props.insects){
      if(counter-- === 0) break;
      insects.push(
        <div className="column">
          <Insect insectName={insectName} insectObj={this.props.insects[insectName]} key={counter} />
        </div>
      );
    }
    return (
      <div className="ui segment InsectsBox">
        <div className="ui top large attached label">
          <i className="bug icon"></i>Insects ({Object.keys(this.props.insects).length})
        </div>
        <div className="ui doubling six column grid">
          {insects}
        </div>
        <InputForm inputType="insects"
                   sample={this.props.insects[Object.keys(this.props.insects)[0]]}
                   onInputSubmit={this.props.onInputSubmit}
                   key={"insects"}
        />
      </div>  
    );
  }
});