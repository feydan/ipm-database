var React = require('react');
var PlantsBox = require('./PlantsBox');
var InsectsBox = require('./InsectsBox');
var InteractionsBox = require('./InteractionsBox');
var Router = require('react-router'); 
var RouteHandler = Router.RouteHandler;
var $ = require('../jquery.min.js');
var ServerActionCreators = require('../actions/ServerActionCreators');
var Link = Router.Link;

module.exports = React.createClass({
  displayName: 'App',
  loadDataFromServer: function() {
    var dataUrl = "/data";
    $.ajax({
      url: dataUrl,
      dataType: 'json',
      success: function(data) {
        console.log(data);
        ServerActionCreators.receiveAllData(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(dataUrl, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: {plants:{},insects:{},interactions:[]}};
  },
  componentDidMount: function() {
    setInterval(this.loadDataFromServer, 3000);
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
      var postUrl = "/"+type;
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
  render: function() {
    var data = this.state.data;
    var self = this;

    return(
      React.createElement("div", {className: "Main"}, 
        React.createElement("div", {className: "ui one fluid buttons"}, 
          React.createElement("div", {className: "ui big button active"}, React.createElement(Link, {to: "app"}, "EntAgronomy"))
        ), 
        React.createElement("div", {className: "ui three fluid buttons"}, 
          React.createElement("div", {className: "ui big button"}, React.createElement(Link, {to: "interactions"}, "Interactions")), 
          React.createElement("div", {className: "ui big button"}, React.createElement(Link, {to: "insects"}, "Insects")), 
          React.createElement("div", {className: "ui big button"}, React.createElement(Link, {to: "plants"}, "Plants"))
        ), 
        React.createElement(RouteHandler, null)
      )
    );
  }
});
