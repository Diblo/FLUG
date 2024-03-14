const config = require("../config");
const ImageDataUriHandler = require("./ImageDataUriHandler");
const ImageProcessor = require("./ImageProcessor");
const crypto = require("crypto");

class Image {
  constructor(dataUri) {
    this.imageDataUriHandler = new ImageDataUriHandler(dataUri);
    this.imageSets = config.getImageSets().map((item) => require(item));
  }

  store() {
    const hash = crypto
      .createHash("sha224")
      .update(
        new ImageProcessor(this.imageDataUriHandler).optimize().getBuffer(),
      )
      .digest("hex");

    for (let i = 0; i < this.imageSets.length; i++) {
      new this.imageSets[i](this.imageDataUriHandler, hash).save();
    }

    return `${hash}.${this.imageDataUriHandler.getExt()}`;
  }
}

module.exports = Image;
