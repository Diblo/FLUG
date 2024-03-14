const config = require("../config");
const path = require("path");
const ImageProcessor = require("./ImageProcessor");

class AbstractImageSet {
  constructor(imageHandler, hash) {
    this.imageHandler = imageHandler;
    this.hash = hash;
  }

  getImageHandler() {
    return this.imageHandler;
  }

  getHash() {
    return this.hash;
  }

  getExt() {
    return this.imageHandler.getExt();
  }

  getImagePath(filename) {
    return path.resolve(__dirname, `${config.getImagesPath()}/${filename}`);
  }

  getImageProcessor() {
    return new ImageProcessor(this.imageHandler);
  }

  async save() {
    throw new Error("Method 'save' must be implemented in the subclass.");
  }
}

module.exports = AbstractImageSet;
