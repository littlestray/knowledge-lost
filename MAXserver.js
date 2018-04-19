

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
server.listen(2222);

app.use(bodyParser.json());
app.post('/', (req, res) => {
    res.send("Success!");
    client.send ("/deletions", req.body);
    // io.sockets.emit('deletions', req.body);
    console.log(req.body);
})



app.listen(3666);


app.use(express.static('public'));
