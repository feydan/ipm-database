var React = require('react');
var Plant = require('./Plant');
var InputForm = require('./InputForm');

module.exports = React.createClass({
  displayName:'PlantsBox',
  render: function() {
    var plants = [];
    var counter = this.props.numLimit ? this.props.numLimit : -1;
    for(var plantName in this.props.plants){
      if(counter-- === 0) break;
      plants.push(
        <div className="column">
          <Plant plantName={plantName} plantObj={this.props.plants[plantName]} key={counter} />
        </div>
      );
    }
    return (
      <div className="ui segment PlantsBox">
        <div className="ui top large attached label">
          <i className="leaf icon"></i>Plants ({Object.keys(this.props.plants).length})
        </div>
        <div className="ui doubling six column grid">
          {plants}
        </div>
        <InputForm inputType="plants"
                   sample={this.props.plants[Object.keys(this.props.plants)[0]]}
                   onInputSubmit={this.props.onInputSubmit}
                   key={"plant"}
        />
      </div>  
    );
  }
});