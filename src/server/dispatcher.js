const { OPEN: WS_OPEN } = require('ws');

class Dispatcher {
  constructor (server) {
    this.server = server
  }

  emit (client, message) {
    if (client.readyState !== WS_OPEN) {
      return;
    }

    client.send(JSON.stringify(message));
  }

  broadcast (message) {
    this.server.clients.forEach(client => {
      this.emit(client, message)
    })
  }
}

module.exports = Dispatcher
