var ServerActionCreators = require('../actions/ServerActionCreators');
var fs = require('fs');


var path = 'data/example/';
var files = {
  plants: 'plants.json',
  insects: 'insects.json',
  interactions: 'interactions.json',
};
//var $ = require('../jquery.min.js');

module.exports = {

  getAllData: function() {
    var data = {};
    data.plants = JSON.parse(fs.readFileSync(path+files.plants));
    data.insects = JSON.parse(fs.readFileSync(path+files.insects));
    data.interactions = JSON.parse(fs.readFileSync(path+files.interactions));
    ServerActionCreators.receiveAllData(data);
    // $.ajax({
    //   url: '/data',
    //   dataType: 'json',
    //   success: function(data) {
    //     console.log(data);
    //     ServerActionCreators.receiveAllData(data);
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(dataUrl, status, err.toString());
    //   }.bind(this)
    // });
  },

  // createMessage: function(message, threadName) {
  //   // simulate writing to a database
  //   var rawMessages = JSON.parse(localStorage.getItem('messages'));
  //   var timestamp = Date.now();
  //   var id = 'm_' + timestamp;
  //   var threadID = message.threadID || ('t_' + Date.now());
  //   var createdMessage = {
  //     id: id,
  //     threadID: threadID,
  //     threadName: threadName,
  //     authorName: message.authorName,
  //     text: message.text,
  //     timestamp: timestamp
  //   };
  //   rawMessages.push(createdMessage);
  //   localStorage.setItem('messages', JSON.stringify(rawMessages));

  //   // simulate success callback
  //   setTimeout(function() {
  //     ChatServerActionCreators.receiveCreatedMessage(createdMessage);
  //   }, 0);
  // }

};