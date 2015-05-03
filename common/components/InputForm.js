var React = require('react');

module.exports = React.createClass({
  displayName:"InputForm",
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
      if(field == "plant" || field == "insect"){
        var options = [];
        for(var index in this.props.data[field+'s']){
          options.push(<option value={index}>{index}</option>);
        }
        form.push(<select ref={field}>{options}</select>);
      }else{
        form.push(<input type="text" placeholder={field} ref={field} />);
      }
    }

    return (
      <form className="InputForm" onSubmit={this.handleSubmit}>
        <div>Add {this.props.inputType}</div>
        {form}
        <input type="hidden" ref="inputType" value={this.props.inputType} />
        <input className="ui button" type="submit" value="Post" />
      </form>
    );
  }
});