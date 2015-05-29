var React = require('react');
var routes = require('../lib/components/Routes');
var Router = require('react-router');
var $ = require('../lib/jquery.min.js');
var ServerActionCreators = require('../lib/actions/ServerActionCreators');
//var App = require('../lib/components/App');

// Since we're not using JSX here, we need to wrap the component in a factory
// manually. See https://gist.github.com/sebmarkbage/ae327f2eda03bf165261
//var AppFactory = React.createFactory(App);


var renderTarget = document.getElementById('content');

// Note the identical state to server/index.js
Router.run(routes, Router.HistoryLocation, function (Handler) {
  var dataUrl = "/data";
    $.ajax({
      url: dataUrl,
      dataType: 'json',
      success: function(data) {
        ServerActionCreators.receiveAllData(data);
        var HandlerFactory = React.createFactory(Handler);
  		React.render(HandlerFactory(), renderTarget);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(dataUrl, status, err.toString());
      }.bind(this)
    });
});
// var renderedComponent = React.render(
//   AppFactory({
//   		url:"", 
//         pollInterval:20000,
//         components:["InteractionsBox","InsectsBox","PlantsBox"],
//         numLimit:10
//   }),
//   renderTarget
// );