const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

mongoose.Promise = Promise;

const DBUrl = "mongodb://localhost:27017/ChatApp";

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

mongoose.connect(DBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=> {
    if(err) {
        return console.error(err);
    }

    console.log('MongoDB connected successfully');
});

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        if(err) {
            console.error(err);
        }

        res.send(messages)
    });
});

app.post('/messages', async (req, res) => {

    try {
        let message = new Message(req.body);

        let savedMessaged = await message.save();

        console.log('Saved');

        let censored = await Message.findOne({ message: 'badword' });

        if(censored) {
            await Message.remove({ _id: censored.id });
        } else
            io.emit('message', req.body);

        res.sendStatus(200);

    } catch (error) {
        res.sendStatus(500)
        console.error(error)
    } finally {
        console.log('message post called')
    }
});

io.on('connection', (socket)=> {
    console.log(`user connected`);
});


const server = http.listen('3000', () => {
    console.log(`Server is listening on port ${ server.address().port }`);
});