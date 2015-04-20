var React = require('react');
var App = require('../lib/components/App');

// Since we're not using JSX here, we need to wrap the component in a factory
// manually. See https://gist.github.com/sebmarkbage/ae327f2eda03bf165261
var AppFactory = React.createFactory(App);

var renderTarget = document.getElementById('content');

// Note the identical state to server/index.js
var renderedComponent = React.render(
  AppFactory({
  		url:"", 
        pollInterval:20000,
        components:["InteractionsBox","InsectsBox","PlantsBox"],
        numLimit:10
  }),
  renderTarget
);