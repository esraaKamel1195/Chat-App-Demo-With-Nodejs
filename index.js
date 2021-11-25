const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const DBUrl = "mongodb://localhost:27017/ChatApp";

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

mongoose.connect(DBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=> {
    console.log('MongoDb connection', err);
});

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) =>{
        res.send(messages)
    });
});

app.post('/messages', (req, res) => {

    let message = new Message(req.body);

    message.save((err) => {
        if (err) {
            res.sendStatus = 500;
            console.error(err);
        }
        io.emit('message', req.body);
        res.sendStatus(200);
    });
});

io.on('connection', (socket)=> {
    console.log(`user connected`);
});


const server = http.listen('3000', () => {
    console.log(`Server is listening on port ${ server.address().port }`);
});