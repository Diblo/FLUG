const AbstractImageSet = require("../comments/images/AbstractImageSet")

class WebImage extends AbstractImageSet {
  /**
   *
   * @returns
   * @override
   */
  async save() {
    const filepath = this.getImagePath(
      `optimized/${this.getHash()}.${this.getExt()}`
    )

    return this.getImageProcessor().fit(1920, 1280).optimize().save(filepath)
  }
}

module.exports = WebImage
