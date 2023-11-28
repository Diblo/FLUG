const abstractEntity = require("./abstractEntity");

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
    super(data, ["src", "alt"]);
  }
}

module.exports = UserEntity;
