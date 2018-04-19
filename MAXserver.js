

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


const Osc = require('node-osc');
const client = new Osc.Client("localhost", 5555);
const oscServer = new Osc.Server(5554, 'localhost');

var server = require('http').createServer(app);
// var io = require('socket.io')(server);
// io.on('connection', function(client){
//   console.log("new connection: ");
//   client.on('join', function(data) {
//        console.log(data);
//    });
//
//  });
var deletionBank = [];

server.listen(2222);

app.use(bodyParser.json());
app.post('/', (req, res) => {
    res.send("Success!");


      var Thelist = Object.keys(req.body);

      for (var i = 0; i < req.body[Thelist[0]].length; i++) {
        if (req.body[Thelist[0]][i]) {
          var TempDeleted = {}
          TempDeleted.deletion = req.body[Thelist[0]][i];
          TempDeleted.prelife = i*8;
          deletionBank.push(TempDeleted);
        }
      }


    // io.sockets.emit('deletions', req.body);
    console.log(req.body);
});


(function(){

    for (var i = 0; i < TempDeleted.length; i++) {
      TempDeleted[i]
    }
    setTimeout(arguments.callee, 13);
})();

// client.send ("/deletions",

app.listen(3666);


app.use(express.static('public'));
