const { IMAGE_PATH } = require("../../config");
const Db = require("./db");
const ImageEntity = require("./entities/imageEntity");

class Images extends Db {
  constructor() {
    super(IMAGE_PATH, ImageEntity);
  }
}

const images = new Images();

module.exports = images;
