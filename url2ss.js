// const Screenshot = require('url-to-screenshot')

var webshot = require('webshot');
var options = {
  windowSize:{ width: 1151
, height: 1920 },
  shotSize: {
    width: 'all'
  , height: 2000
}}

// const fs = require('fs')

const Osc = require('node-osc');
const client = new Osc.Client("localhost", 3434);
const oscServer = new Osc.Server(4545, 'localhost');
var index = 0;
oscServer.on("message", function (msg, rinfo) {
  console.log(msg[0]);
  if(msg[0]=="/reset"){
    index = 0;
    console.log("RESET");
  };
  if(msg[0]=="/req"){
    console.log(msg);
    var link = msg[1];
    webshot(link, '/Users/John/Desktop/timelapses/'+msg[2]+'/'+index+'.png', options, function(err) {
      // screenshot now saved to google.png
      index ++;
      console.log(index);
      client.send ("/next", "next");
    });
  }
  if(msg[0]=="test"){

    console.log("http://en.wikipedia.org/w/index.php?title=50_Cent&oldid=838578135");

  }
});
