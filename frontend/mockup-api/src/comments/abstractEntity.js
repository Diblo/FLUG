/**
 * @class Entity
 * @extends Database
 * @abstract
 */
class AbstractEntity {
  constructor(data, fields) {
    this.fields = ["uid", "createdAt", "updatedAt", ...fields]

    // Initialize entity properties from data.
    for (const key of this.fields) {
      this[key] = data.hasOwnProperty(key) ? data[key] : null
    }
  }

  /**
   * Get the entity as an object.
   * @returns {object} - Entity data.
   */
  asObject() {
    const data = {}
    for (const field of this.fields) {
      data[field] = this[field]
    }
    return data
  }
}

module.exports = AbstractEntity
