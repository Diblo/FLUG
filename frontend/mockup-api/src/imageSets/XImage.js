const AbstractImageSet = require("../comments/images/AbstractImageSet")

class XImage extends AbstractImageSet {
  /**
   *
   * @returns
   * @override
   */
  async save() {
    const filepath = this.getImagePath(
      `optimized/${this.getHash()}-x.${this.getExt()}`
    )

    return this.getImageProcessor()
      .setAspectRatio(1)
      .fit(1280, 1280)
      .optimize()
      .save(filepath)
  }
}

module.exports = XImage
