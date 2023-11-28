const { USERS_PATH } = require("../../config");
const Db = require("./db");
const UserEntity = require("./entities/userEntity");

class Users extends Db {
  constructor() {
    super(USERS_PATH, UserEntity);
  }
}

const users = new Users();

module.exports = users;
