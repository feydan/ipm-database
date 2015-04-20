var React = require('react');

module.exports = React.createClass({
  displayName: 'Plant',
  render: function() {
    return (
      React.createElement("div", {className: "Plant"}, 
        React.createElement("img", {src: this.props.plantObj.image_url}), 
        React.createElement("div", {className: "PlantName"}, 
          this.props.plantName
        ), 
        React.createElement("span", null, 
          this.props.plantObj.comment
        )
      )
    );
  }
});