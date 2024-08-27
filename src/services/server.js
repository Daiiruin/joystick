const WebSocket = require('ws');
const { Buffer } = require('buffer');


const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('Client connected');

  socket.send(JSON.stringify({ message: 'Hello from server' }));

  socket.on('message', (message) => {
    if (Buffer.isBuffer(message)) {
      message = message.toString();
    }
    try {
      const parsedMessage = JSON.parse(message);
      console.log('Message from client:', parsedMessage);
    } catch (error) {
      console.error('Failed to parse message:', error);
    }
  });
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is listening on ws://0.0.0.0:8080');
