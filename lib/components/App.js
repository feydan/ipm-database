var React = require('react');
var PlantsBox = require('./PlantsBox');
var InsectsBox = require('./InsectsBox');
var InteractionsBox = require('./InteractionsBox');
var $ = require('../jquery.min.js');

module.exports = React.createClass({
  displayName: 'App',
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
        return (React.createElement(InteractionsBox, {data: data, onInputSubmit: self.handleInputSubmit}));
      } else if (component == "InsectsBox"){
        return (React.createElement(InsectsBox, {insects: data.insects, numLimit: numLimit, onInputSubmit: self.handleInputSubmit}));
      } else if (component == "PlantsBox"){
        return (React.createElement(PlantsBox, {plants: data.plants, numLimit: numLimit, onInputSubmit: self.handleInputSubmit}));
      }
    });

    return(
      React.createElement("div", {className: "Main"}, 
        React.createElement("div", {className: "ui one fluid buttons"}, 
          React.createElement("div", {className: "ui big button active", "data-components": "InteractionsBox InsectsBox PlantsBox", "data-num-limit": "10", onClick: this.handleToggle}, "EntAgronomy")
        ), 
        React.createElement("div", {className: "ui three fluid buttons"}, 
          React.createElement("div", {className: "ui big button", "data-components": "InteractionsBox", "data-num-limit": "30", onClick: this.handleToggle}, "Interactions"), 
          React.createElement("div", {className: "ui big button", "data-components": "InsectsBox", "data-num-limit": "", onClick: this.handleToggle}, "Insects"), 
          React.createElement("div", {className: "ui big button", "data-components": "PlantsBox", "data-num-limit": "", onClick: this.handleToggle}, "Plants"), " "), 
        components
      )
    );
  }
});
