const AbstractImageSet = require("../comments/images/AbstractImageSet");

class OpenGrapImage extends AbstractImageSet {
  /**
   *
   * @returns
   * @override
   */
  async save() {
    const filepath = this.getImagePath(
      `optimized/${this.getHash()}-og.${this.getExt()}`,
    );

    return this.getImageProcessor()
      .setAspectRatio(1.9)
      .fit(1920, 1010)
      .optimize()
      .save(filepath);
  }
}

module.exports = OpenGrapImage;
