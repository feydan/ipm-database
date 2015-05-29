var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var App = require('./App');
var PlantsBox = require('./PlantsBox');
var InsectsBox = require('./InsectsBox');
var InteractionsList = require('./InteractionsList');
var Home = require('./Home');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;

module.exports = (
  <Route name="app" path="/" handler={App}>
    <Route name="interactions" handler={InteractionsList}/>
    <Route name="insects" handler={InsectsBox}/>
    <Route name="plants" handler={PlantsBox}/>
    <DefaultRoute handler={Home}/>
  </Route>
);