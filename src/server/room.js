const User = require('./user');

class Room {
  constructor (dispatcher, server) {
    this.dispatcher = dispatcher;
    this.server = server;
    this.users = new Map();
  }

  serialize () {
    return {
      users: [...this.users.values()].map(user => user.serialize())
    }
  }

  handleEnter (client) {
    client.user = new User();
    this.users.set(client.user.id, client.user);

    client.on('close', () => {
      this.users.delete(client.user.id);
      this.sendUpdate();
    });

    this.sendUpdate();
  }

  sendUpdate () {
    this.dispatcher.broadcast({
      payload: {
        room: this.serialize()
      }
    });
  }
}

module.exports = Room
