var React = require('react');

module.exports = React.createClass({
  displayName: 'Plant',
  render: function() {
    return (
      React.createElement("div", {className: "ui segment Plant"}, 
        React.createElement("div", {className: "ui top attached label"}, React.createElement("i", {className: "leaf icon"}), this.props.plantName), 
        React.createElement("img", {src: this.props.plantObj.image_url})
      )
    );
  }
});