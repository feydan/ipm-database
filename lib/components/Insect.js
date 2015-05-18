var React = require('react');

module.exports = React.createClass({
  displayName:'Insect',

  render: function() {
    var tmpImg = this.props.insectObj.image_url;
    return (
      React.createElement("div", {className: "ui segment Insect"}, 
        React.createElement("div", {className: "ui top attached label"}, React.createElement("i", {className: "bug icon"}), this.props.insectName), 
        React.createElement("img", {src: tmpImg})
      )
    );
  }
});