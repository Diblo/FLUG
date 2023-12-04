const abstractEntity = require("../../comments/abstractEntity")

/**
 * Represents a event entity.
 * @extends abstractEntity
 */
class EventEntity extends abstractEntity {
  /**
   * Construct a EventEntity.
   * @param {object} data - Entity data.
   */
  constructor(data) {
    super(data, [
      "title",
      "slug",
      "shortDesc",
      "startDateTime",
      "endDateTime",
      "location",
      "content",
    ])
  }
}

module.exports = EventEntity
