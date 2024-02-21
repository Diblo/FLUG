const abstractEntity = require("../../comments/abstractEntity");

/**
 * Represents a blog entity.
 * @extends abstractEntity
 */
class BlogEntity extends abstractEntity {
  /**
   * Construct a BlogEntity.
   * @param {object} data - Entity data.
   */
  constructor(data) {
    super(data, ["title", "slug", "shortDesc", "image", "content"]);
  }
}

module.exports = BlogEntity;
