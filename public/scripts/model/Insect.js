var Insect = React.createClass({
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

var InsectsBox = React.createClass({
  render: function() {
    var insects = [];
    var counter = this.props.numLimit ? this.props.numLimit : -1;
    for(var insectName in this.props.insects){
      if(counter-- == 0) break;
      insects.push(<Insect insectName={insectName} insectObj={this.props.insects[insectName]} />);
    }
    return (
      <div className="InsectsBox">
        <h2>Insects</h2>
        {insects}
        <InputForm inputType="insects"
                   sample={this.props.insects[Object.keys(this.props.insects)[0]]}
                   onInputSubmit={this.props.onInputSubmit}
                   
        />
        <div className="horizontal-line"></div>
      </div>  
    );
  }
});