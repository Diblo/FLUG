const abstractEntity = require("../../comments/abstractEntity")

/**
 * Represents a user entity.
 * @extends abstractEntity
 */
class UserEntity extends abstractEntity {
  /**
   * Construct a UserEntity.
   * @param {object} data - Entity data.
   */
  constructor(data) {
    super(data, ["firstName", "lastName", "email", "loggedInAt"])
  }
}

module.exports = UserEntity
