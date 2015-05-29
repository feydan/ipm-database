/* ----------
 * Rendering our component server side
 */
var React = require('react');
var Router = require('react-router');
var routes = require('../lib/components/Routes');
var ApiUtils = require('../lib/api/ApiUtils');


/* ----------
 * Injecting the rendered component in the Handlebars template
 */
var Handlebars = require('handlebars');
var fs = require('fs');

var fileData = fs.readFileSync(__dirname + '/templates/layout.handlebars').toString();
var layoutTemplate = Handlebars.compile(fileData);


/* ----------
 * Serving up the rendered template
 */
var express = require('express');
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


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
      data.push(inputObj.data);
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

// app.get('/', function(req, res) {
//   res.send(renderedLayout);
// });

// NOTE: This route is last since we want to match the dynamic routes above
// first before attempting to match a static resource (js/css/etc)
app.use(express.static('./public'));
app.use( function (req, res) {
  Router.run(routes, req.path, function (Handler) {
    ApiUtils.getAllData();
    var HandlerFactory = React.createFactory(Handler);
    var renderedComponent =  React.renderToString(
      HandlerFactory({
          path:req.q
        })
    );  
    var renderedLayout = layoutTemplate({
      content: renderedComponent
    });
    res.send(renderedLayout);
  });
});

app.listen(3000, function() {
  console.log("Listening on port 3000");
});
