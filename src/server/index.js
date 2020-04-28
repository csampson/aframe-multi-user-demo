const WebSocket = require('ws');
const Dispatcher = require('./dispatcher');
const Room = require('./room');

const server = new WebSocket.Server({ port: 3000 });
const dispatcher = new Dispatcher(server);
const room = new Room(dispatcher, server);

server.on('connection', client => {
  room.handleEnter(client);
});
