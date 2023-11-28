const { EVENTS_PATH } = require("../../config");
const Db = require("./db");
const EventEntity = require("./entities/eventEntity");

class Events extends Db {
  constructor() {
    super(EVENTS_PATH, EventEntity);
  }

  getIdBySlug(slug) {
    return this.db.getIdBySlug(this.table, slug);
  }
}

const events = new Events();

module.exports = events;
