const sharp = require("sharp")
const ImageDataUriHandler = require("./ImageDataUriHandler")

/**
 * A class that extends ImageProcessor to handle image operations using Sharp library.
 * @extends ImageProcessor
 * @class
 */
class ImageProcessor {
  /**
   * ImageProcessor class to handle image data and operations.
   * @param {ImageDataUriHandler} imageDataUriHandler
   * @param {{optimize: false, fitDimensions: [number, number], aspectRatio: number }} [options]
   */
  constructor(imageDataUriHandler, options) {
    this.imageDataUriHandler = imageDataUriHandler

    const { optimize, fitDimensions, aspectRatio } = options || {}
    this.shouldOptimize = optimize || false
    this.fitDimensions = fitDimensions || []
    this.aspectRatio = aspectRatio > 0 ? aspectRatio : null
  }

  /**
   * Optimizes the image format and quality.
   * @returns {ImageProcessor} - ImageProcessor instance
   */
  optimize() {
    return new ImageProcessor(this.imageDataUriHandler, {
      optimize: true,
      fitDimensions: this.fitDimensions,
      aspectRatio: this.aspectRatio,
    })
  }

  /**
   * Resizes the image to fit within the specified maximum width and height while maintaining aspect ratio.
   * @param {number} maxWidth - Maximum width
   * @param {number} maxHeight - Maximum height
   * @returns {ImageProcessor} - ImageProcessor instance
   */
  fit(maxWidth, maxHeight) {
    return new ImageProcessor(this.imageDataUriHandler, {
      optimize: this.shouldOptimize,
      fitDimensions: [maxWidth, maxHeight],
      aspectRatio: this.aspectRatio,
    })
  }

  /**
   * Crops the image to a new aspect ratio.
   * @param {number} aspectRatio - New aspect ratio (width / height)
   * @returns {ImageProcessor} - ImageProcessor instance
   */
  setAspectRatio(aspectRatio) {
    return new ImageProcessor(this.imageDataUriHandler, {
      optimize: this.shouldOptimize,
      fitDimensions: this.fitDimensions,
      aspectRatio: aspectRatio,
    })
  }

  /**
   * Applies image operationss.
   * @private
   */
  _apply(sharpObject) {
    if (this.aspectRatio) {
      const width = this.imageDataUriHandler.getWidth()
      const height = this.imageDataUriHandler.getHeight()

      const newDimensions = calculateNewDimensions(
        width,
        height,
        this.aspectRatio
      )
      const offset = [
        Math.floor((width - newDimensions[0]) / 2),
        Math.floor((height - newDimensions[1]) / 2),
      ]

      sharpObject = sharpObject.extract({
        left: offset[0],
        top: offset[1],
        width: newDimensions[0],
        height: newDimensions[1],
      })
    }

    if (this.fitDimensions.length > 0) {
      sharpObject = sharpObject.resize({
        width: this.fitDimensions[0],
        height: this.fitDimensions[1],
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
    }

    if (this.shouldOptimize) {
      if (this.imageDataUriHandler.getExt() === "jpg") {
        sharpObject = sharpObject.jpeg({
          quality: 70,
          chromaSubsampling: "4:2:0",
          trellisQuantisation: true,
          optimiseScans: true,
          quantisationTable: 3,
          force: true,
        })
      } else {
        sharpObject = sharpObject.png({
          quality: 70,
          compressionLevel: 6,
          adaptiveFiltering: true,
          force: true,
        })
      }
    }

    return sharpObject
  }

  /**
   * Returns the image data as a buffer.
   * @returns {Promise<Buffer>} - Image data as a buffer
   */
  getBuffer() {
    // TODO: Get sharp to work.....!!
    //return this._apply(sharp(this.imageDataUriHandler.getBuffer())).toBuffer();
    return this.imageDataUriHandler.getBuffer()
  }

  /**
   * Saves the image to the specified filepath.
   * @param {string} filepath - Filepath to save the image
   * @returns {Promise<void>} - Promise indicating the completion of the save operation
   */
  save(filepath) {
    // TODO: Get sharp to work.....!!
    //return this._apply(sharp(this.imageDataUriHandler.getBuffer())).toFile(
    //  filepath
    //);
    this.imageDataUriHandler.save(filepath)
  }
}

/**
 * Calculates the new width and height based on a given aspect ratio.
 * @param {number} originalWidth - Original width
 * @param {number} originalHeight - Original height
 * @param {number} aspectRatio - Aspect ratio (width / height)
 * @returns {[number, number]} - New width and height
 */
function calculateNewDimensions(originalWidth, originalHeight, aspectRatio) {
  if (originalWidth / originalHeight > aspectRatio) {
    return [Math.floor(originalHeight * aspectRatio), originalHeight]
  }

  return [originalWidth, Math.floor(originalWidth / aspectRatio)]
}

module.exports = ImageProcessor
