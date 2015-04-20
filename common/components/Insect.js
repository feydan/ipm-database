var React = require('react');

module.exports = React.createClass({
  displayName:'Insect',

  render: function() {
    var tmpImg = this.props.insectObj.image_url;
    return (
      <span className="Insect">
        <img src={tmpImg} />
        <div className="InsectName">
          {this.props.insectName}
        </div>
        <span>
          {/*this.props.insectObj.comment*/}
        </span>
      </span>
    );
  }
});