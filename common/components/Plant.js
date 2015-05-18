var React = require('react');

module.exports = React.createClass({
  displayName: 'Plant',
  render: function() {
    return (
      <div className="ui segment Plant">
        <div className="ui top attached label"><i className="leaf icon"></i>{this.props.plantName}</div>
        <img src={this.props.plantObj.image_url} />
      </div>
    );
  }
});