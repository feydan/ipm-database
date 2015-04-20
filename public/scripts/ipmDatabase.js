var converter = new Showdown.converter();

var InputForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var input = {
      type: this.refs.inputType.getDOMNode().value.trim(),
      data: {}
    };
    delete this.refs.inputType;

    if(this.refs.hasOwnProperty("inputName")){
      input.inputName = this.refs.inputName.getDOMNode().value.trim();
      delete this.refs.inputName;
    }

    for(var field in this.refs){
      input.data[field] = this.refs[field].getDOMNode().value.trim();
    }
    console.log(this.props.onInputSubmit);

    this.props.onInputSubmit(input);
  },
  render: function() {
    var form = [];
    if(this.props.inputType != "interactions"){
      form.push(<input type="text" placeholder="Name" ref="inputName" />);
    }
    for(var field in this.props.sample){
      form.push(<input type="text" placeholder={field} ref={field} />);
    }

    return (
      <form className="InputForm" onSubmit={this.handleSubmit}>
        <div>Add {this.props.inputType}</div>
        {form}
        <input type="hidden" ref="inputType" value={this.props.inputType} />
        <input type="submit" value="Post" />
      </form>
    );
  }
});


var Main = React.createClass({
  loadDataFromServer: function() {
    var dataUrl = this.props.url+"/data";
    $.ajax({
      url: dataUrl,
      dataType: 'json',
      success: function(data) {
        console.log(data);
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(dataUrl, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: {plants:{},insects:{},interactions:[]},
            components: this.props.components,
            numLimit: this.props.numLimit };
  },
  componentDidMount: function() {
    this.loadDataFromServer();
    setInterval(this.loadDataFromServer, this.props.pollInterval);
  },
  handleInputSubmit: function(inputObj) {
    var data = this.state.data;
    var type = inputObj.type;
    if(type == "interactions"){
      data.interactions.push(inputObj.data);
    } else {
      data[type][inputObj.inputName] = inputObj.data;
    }
    console.log(data);
    this.setState({data: data}, function() {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
      var postUrl = this.props.url+"/"+type;
      $.ajax({
        url: postUrl,
        dataType: 'json',
        type: 'POST',
        data: inputObj,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(postUrl, status, err.toString());
        }.bind(this)
      });
    });
  },
  handleToggle: function(e) {
    e.preventDefault();
    this.state.components=$(e.target).attr("data-components").split(' ');
    this.state.numLimit=$(e.target).attr("data-num-limit");
    this.setState(this.state);
  },
  render: function() {
    var numLimit = this.state.numLimit;
    var data = this.state.data;
    var self = this;
    var components = this.state.components.map(function(component, index) {
      if(component == "InteractionsBox"){
        return (<InteractionsBox data={data} onInputSubmit={self.handleInputSubmit} />);
      } else if (component == "InsectsBox"){
        return (<InsectsBox insects={data.insects} numLimit={numLimit} onInputSubmit={self.handleInputSubmit} />);
      } else if (component == "PlantsBox"){
        return (<PlantsBox plants={data.plants} numLimit={numLimit} onInputSubmit={self.handleInputSubmit} />);
      }
    });

    return(
      <div className="Main">
        <h1><a data-components="InteractionsBox InsectsBox PlantsBox" data-num-limit="10" onClick={this.handleToggle}>IPM Database</a> |
            &nbsp;<a data-components="InteractionsBox" data-num-limit="30" onClick={this.handleToggle}>Interactions</a> |
            &nbsp;<a data-components="InsectsBox" data-num-limit="" onClick={this.handleToggle}>Insects</a> |
            &nbsp;<a data-components="PlantsBox" data-num-limit="" onClick={this.handleToggle}>Plants</a> </h1>
        {components}
      </div>
    );
  }
});

React.render(
  <Main url="" 
        pollInterval={20000} 
        components={["InteractionsBox","InsectsBox","PlantsBox"]}
        numLimit={10} />,
  document.getElementById('content')
);
