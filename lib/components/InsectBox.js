var React = require('react');
var Insect = require('Insect');
var InputForm = require('InputForm');

module.exports = React.createClass({
  displayName:'InsectBox',
  render: function() {
    var insects = [];
    var counter = this.props.numLimit ? this.props.numLimit : -1;
    for(var insectName in this.props.insects){
      if(counter-- == 0) break;
      insects.push(React.createElement(Insect, {insectName: insectName, insectObj: this.props.insects[insectName]}));
    }
    return (
      React.createElement("div", {className: "InsectsBox"}, 
        React.createElement("h2", null, "Insects"), 
        insects, 
        React.createElement(InputForm, {inputType: "insects", 
                   sample: this.props.insects[Object.keys(this.props.insects)[0]], 
                   onInputSubmit: this.props.onInputSubmit}
                   
        ), 
        React.createElement("div", {className: "horizontal-line"})
      )  
    );
  }
});