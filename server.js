const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));



// Run when client connects
io.on('connection', socket => {
    // console.log(`New WS established : ${socket.id}`);

    /*
        socket.emit()           ----> to socket
        socket.broadcast.emit() ----> to every connection except current socket
        io.emit()               ----> all connections
    */

    // when client conencts
    socket.emit('message', 'Welome to the chat room!!');
    socket.broadcast.emit('message', 'A user has joined the chat!');
    
    // when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'user has left the chat');
    });


    // messages
    socket.on('chatMessage', msg => {
        io.emit('message', msg);
        console.log(msg);
    })
})

const PORT = process.env.PORT || 3000;


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));