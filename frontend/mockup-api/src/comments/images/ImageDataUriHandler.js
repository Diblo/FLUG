const { dataUriToBuffer } = require("data-uri-to-buffer");
const sizeOf = require("image-size");
const fs = require("fs");
var mime = require("mime-types");

/**
 * Handles image data and operations.
 */
class ImageDataUriHandler {
  /**
   * Initializes the ImageHandler with image data.
   * @param {string} data - Data URI scheme
   * @throws {TypeError} - If image details cannot be determined
   */
  constructor(data) {
    this.buffer = Buffer.from(dataUriToBuffer(data).buffer);

    const { type, width, height } = sizeOf(this.buffer);
    if (!type || !width || !height) {
      throw new TypeError("Unable to determine the image details");
    }

    this.ext = type;
    this.mime = mime.lookup(type);
    this.width = width;
    this.height = height;
    this.bytes = this.buffer.length;
  }

  /**
   * Returns the image extension.
   * @returns {string} - Image extension
   */
  getExt() {
    return this.ext;
  }

  /**
   * Returns the image mime type.
   * @returns {string} - Image extension
   */
  getMime() {
    return this.mime;
  }

  /**
   * Returns the image width.
   * @returns {number} - Image width
   */
  getWidth() {
    return this.width;
  }

  /**
   * Returns the image height.
   * @returns {number} - Image height
   */
  getHeight() {
    return this.height;
  }

  /**
   * Returns the image size in bytes.
   * @returns {number} - Image size in bytes
   */
  getBytes() {
    return this.bytes;
  }

  getBuffer() {
    return this.buffer;
  }

  /**
   * Saves the image to the specified filepath.
   * @param {string} filepath - Filepath to save the image
   */
  save(filepath) {
    fs.writeFileSync(filepath, this.buffer);
  }
}

module.exports = ImageDataUriHandler;
