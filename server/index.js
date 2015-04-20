/* ----------
 * Rendering our component server side
 */
var React = require('react');
var App = require('../lib/components/App');

// Since we're not using JSX here, we need to wrap the component in a factory
// manually. See https://gist.github.com/sebmarkbage/ae327f2eda03bf165261
var AppFactory = React.createFactory(App);

var renderedComponent =  React.renderToString(
  AppFactory({
  		url:"", 
        pollInterval:20000,
        components:["InteractionsBox","InsectsBox","PlantsBox"],
        numLimit:10})
);  


/* ----------
 * Injecting the rendered component in the Handlebars template
 */
var Handlebars = require('handlebars');
var fs = require('fs');

var fileData = fs.readFileSync(__dirname + '/templates/layout.handlebars').toString();
var layoutTemplate = Handlebars.compile(fileData);

var renderedLayout = layoutTemplate({
  content: renderedComponent
});



/* ----------
 * Serving up the rendered template
 */
var express = require('express');
var app = express();

var path = 'data/example/';
var files = {
	plants: 'plants.json',
	insects: 'insects.json',
	interactions: 'interactions.json',
};

app.get('/data', function(req, res) {
  var data = {};
  data.plants = JSON.parse(fs.readFileSync(path+files.plants));
  data.insects = JSON.parse(fs.readFileSync(path+files.insects));
  data.interactions = JSON.parse(fs.readFileSync(path+files.interactions));
  //console.log(data);
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});



var handleInput = function(req, res, inputType){
  /*PUT SOME INPUT VALIDATION HURRR*/
  fs.readFile(path+files[inputType], function (err, data) {
    data = JSON.parse(data);
    var inputObj = req.body;
    if(inputType == "interactions"){
      data.push([inputObj.data]);
    } else {
      data[inputObj.inputName] = inputObj.data;
    }

    fs.writeFile(path+files[inputType], JSON.stringify(data, null, 4), function(err) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-cache');
      res.send(JSON.stringify(data));
    });
  });
}

app.post('/plants', function(req, res){ handleInput(req, res, 'plants'); });
app.post('/insects', function(req, res){ handleInput(req, res, 'insects'); });
app.post('/interactions', function(req, res){ handleInput(req, res, 'interactions'); });

app.get('/', function(req, res) {
  res.send(renderedLayout);
});

// NOTE: This route is last since we want to match the dynamic routes above
// first before attempting to match a static resource (js/css/etc)
app.use(express.static('./public'));

app.listen(3000, function() {
  console.log("Listening on port 3000");
});
