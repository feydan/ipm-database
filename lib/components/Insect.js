var React = require('react');

module.exports = React.createClass({
  displayName:'Insect',

  render: function() {
    var tmpImg = this.props.insectObj.image_url;
    return (
      React.createElement("span", {className: "Insect"}, 
        React.createElement("img", {src: tmpImg}), 
        React.createElement("div", {className: "InsectName"}, 
          this.props.insectName
        ), 
        React.createElement("span", null
          /*this.props.insectObj.comment*/
        )
      )
    );
  }
});