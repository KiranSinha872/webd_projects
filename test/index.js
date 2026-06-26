const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the HTML file to the browser
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Listen for WebSockets connections
io.on('connection', (socket) => {
  console.log('A user connected!');

  // Listen for the 'text-change' event from a client
  socket.on('text-change', (newText) => {
    // Broadcast this exact text to everyone EXCEPT the sender
    socket.broadcast.emit('update-text', newText);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server on port 3000
// Add '0.0.0.0' to tell the server to accept external connections
server.listen(3000, '0.0.0.0', () => {
  console.log('Live server listening on all network interfaces at port 3000');
});