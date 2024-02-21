const AbstractImageSet = require("../comments/images/AbstractImageSet");

class OriginalImage extends AbstractImageSet {
  /**
   *
   * @returns
   * @override
   */
  async save() {
    const filepath = this.getImagePath(`${this.getHash()}.${this.getExt()}`);
    return this.getImageHandler().save(filepath);
  }
}

module.exports = OriginalImage;
