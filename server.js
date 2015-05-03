/**
 * This file provided by Facebook is for non-commercial testing and evaluation purposes only.
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var util = require('util');
var app = express();

app.use('/', express.static(path.join(__dirname, 'public')));
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
  console.log(req.body);
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

app.listen(3000);

console.log('IPM Database Server started: http://localhost:3000/');
