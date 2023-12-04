const config = require("../comments/config")
const Db = require("../comments/db")
const EventEntity = require("./entities/eventEntity")

class Events extends Db {
  constructor() {
    super(config.getEventsEndpoint(), EventEntity)
  }

  getIdBySlug(value) {
    const data = this.db.getsByValue(this.table, "slug", value)

    if (data.length !== 1) {
      return null
    }

    return data[0].uid
  }
}

const events = new Events()

module.exports = events
