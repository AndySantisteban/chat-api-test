// server.js

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server);

const activeSockets = new Set();

io.on('connection', (socket) => {
  activeSockets.add(socket);
  console.log("socket",socket)
  socket.on('offer', (offer) => {
    socket.broadcast.emit('offer', offer);
    console.log("offer",offer)
  });

  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer);
    console.log("answer",answer)
  });

  socket.on('iceCandidate', (candidate) => {
    socket.broadcast.emit('iceCandidate', candidate);
    console.log("iceCandidate",iceCandidate)
  });

  socket.on('disconnect', () => {
    activeSockets.delete(socket);
    console.log("delete - socket",socket)
  });
});

const port = 443;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
