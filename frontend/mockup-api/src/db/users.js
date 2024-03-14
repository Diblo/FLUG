const config = require("../comments/config");
const Db = require("../comments/db");
const UserEntity = require("./entities/userEntity");

class Users extends Db {
  constructor() {
    super(config.getUsersEndpoint(), UserEntity);
  }
}

const users = new Users();

module.exports = users;
