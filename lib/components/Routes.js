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
  React.createElement(Route, {name: "app", path: "/", handler: App}, 
    React.createElement(Route, {name: "interactions", handler: InteractionsList}), 
    React.createElement(Route, {name: "insects", handler: InsectsBox}), 
    React.createElement(Route, {name: "plants", handler: PlantsBox}), 
    React.createElement(DefaultRoute, {handler: Home})
  )
);