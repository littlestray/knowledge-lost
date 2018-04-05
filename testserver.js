

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());

app.post('/', (req, res) => {
    res.send("Success!");

    console.log(req.body);
})

app.listen(3666);
