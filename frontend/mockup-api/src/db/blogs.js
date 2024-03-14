const config = require("../comments/config");
const Db = require("../comments/db");
const BlogEntity = require("./entities/blogEntity");

class Blogs extends Db {
  constructor() {
    super(config.getBlogsEndpoint(), BlogEntity);
  }

  getIdBySlug(value) {
    const data = this.db.getsByValue(this.table, "slug", value);

    if (data.length !== 1) {
      return null;
    }

    return data[0].uid;
  }
}

const blogs = new Blogs();

module.exports = blogs;
