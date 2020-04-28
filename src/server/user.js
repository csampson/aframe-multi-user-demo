const uuid = require('uuid').v4;

class User {
  constructor () {
    this.id = uuid();
    this.isAlive = true;
    this.position = { x: 0, y: 0, z: 0 };
  }

  serialize () {
    return {
      id: this.id,
      position: this.position
    };
  }

  stayAlive () {
    this.isAlive = true;
  }
}

module.exports = User;
