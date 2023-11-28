const { BLOGS_PATH } = require("../../config");
const Db = require("./db");
const BlogEntity = require("./entities/blogEntity");

class Blogs extends Db {
  constructor() {
    super(BLOGS_PATH, BlogEntity);
  }

  getIdBySlug(slug) {
    return this.db.getIdBySlug(this.table, slug);
  }
}

const blogs = new Blogs();

module.exports = blogs;
