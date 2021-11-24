const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json);
app.use(bodyParser.urlencoded());

const server = http.listen('3000', () => {
    console.log(`Server is lestening on port ${ server.address().port }`);
});