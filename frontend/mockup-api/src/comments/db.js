const { database } = require("../../libs/memory_database");

class Db {
  constructor(table, entityType) {
    this.table = table;
    this.entityType = entityType;
    this.db = database;
  }

  /**
   * Add data to the database.
   *
   * @param {object} data
   * @returns {entity} - The created entity.
   */
  add(data) {
    const entity = new this.entityType(data);
    entity.createdAt = new Date().toISOString();
    return this.get(this.db.add(this.table, entity.asObject()));
  }

  /**
   * Retrieve data from the database by UID.
   *
   * @param {number} uid - Data ID.
   * @returns {entity|null} - Retrieved data.
   */
  get(uid) {
    const data = this.db.get(this.table, uid);
    return data === null ? null : new this.entityType(data);
  }

  /**
   * Retrieve a range of data from the database.
   *
   * @param {number} begin - Start index of the data range.
   * @param {number} max - Maximum number of items to retrieve.
   * @returns {Array[entity]} - An array of data within the specified range.
   */
  gets(begin, max) {
    const entities = [];
    for (const data of this.db.gets(this.table, begin, max)) {
      entities.push(new this.entityType(data));
    }
    return entities;
  }

  /**
   * Update data in the database.
   *
   * @param {number} uid - Data ID.
   * @param {object} data - Data to be added.
   * @returns {entity} - The created entity.
   */
  update(uid, data) {
    data.updatedAt = new Date().toISOString();
    this.db.update(this.table, uid, data);
    return this.get(uid);
  }

  exists(uid) {
    return this.db.exists(this.table, uid);
  }

  /**
   * Delete data from the database.
   *
   * @param {number} data - Data ID
   */
  delete(uid) {
    this.db.delete(this.table, uid);
  }

  /**
   * Count the number of entities in the database.
   *
   * @returns {number} - Count of entities.
   */
  countRows() {
    return this.db.countRows(this.table);
  }
}

module.exports = Db;
