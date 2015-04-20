var Plant = React.createClass({
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
var PlantsBox = React.createClass({
  render: function() {
    var plants = [];
    var counter = this.props.numLimit ? this.props.numLimit : -1;
    for(var plantName in this.props.plants){
      if(counter-- == 0) break;
      plants.push(<Plant plantName={plantName} plantObj={this.props.plants[plantName]} />);
    }
    return (
      <div className="PlantsBox">
        <h2>Plants</h2>
        {plants}
        <InputForm inputType="plants"
                   sample={this.props.plants[Object.keys(this.props.plants)[0]]}
                   onInputSubmit={this.props.onInputSubmit}
        />
        <div className="horizontal-line"></div>
      </div>  
    );
  }
});