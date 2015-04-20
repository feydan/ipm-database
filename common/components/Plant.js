var React = require('react');

module.exports = React.createClass({
  displayName: 'Plant',
  render: function() {
    return (
      <div className="Plant">
        <img src={this.props.plantObj.image_url} />
        <div className="PlantName">
          {this.props.plantName}
        </div>
        <span>
          {this.props.plantObj.comment}
        </span>
      </div>
    );
  }
});