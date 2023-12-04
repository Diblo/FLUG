const config = require("../comments/config")
const Db = require("../comments/db")
const ImageEntity = require("./entities/imageEntity")

class Images extends Db {
  constructor() {
    super(config.getImagesEndpoint(), ImageEntity)
  }
}

const images = new Images()

module.exports = images
