const express = require('express');
const app = express();
const path = require('path');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'public')));

const server = app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});

const io = socketIO(server);

io.on('connection', (socket) => {

    socket.on('new_msg', (data) => {
        io.emit('update_msgs', data);
    });

});
