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
      insects.push(<Insect insectName={insectName} insectObj={this.props.insects[insectName]} key={counter} />);
    }
    return (
      <div className="InsectsBox">
        <h2 className="ui header">Insects</h2>
        {insects}
        <InputForm inputType="insects"
                   sample={this.props.insects[Object.keys(this.props.insects)[0]]}
                   onInputSubmit={this.props.onInputSubmit}
                   key={"insects"}
        />
        <div className="horizontal-line"></div>
      </div>  
    );
  }
});