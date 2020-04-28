const User = require('./user');

class Room {
  constructor (dispatcher, server) {
    this.dispatcher = dispatcher;
    this.server = server;
    this.users = new Map();

    this.heartbeat();
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

    client.on('pong', () => {
      client.stayAlive();
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

  heartbeat () {
    setInterval(() => {
      if (!this.server.clients.length) {
        return;
      }

      this.server.clients.forEach(client => {
        if (!client.isAlive) {
          client.terminate();
          this.users.delete(client.user.id);

          return;
        }

        client.isAlive = false;
        client.ping(() => {});
      });
    }, 3000);
  }
}

module.exports = Room
