var React = require('react');

module.exports = React.createClass({
  displayName:'Insect',

  render: function() {
    var tmpImg = this.props.insectObj.image_url;
    return (
      <div className="ui segment Insect">
        <div className="ui top attached label"><i className="bug icon"></i>{this.props.insectName}</div>
        <img src={tmpImg} />
      </div>
    );
  }
});