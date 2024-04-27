const path = require("path")
const fs = require("fs")
const {
  API_PORT,
  ITEMS_PER_PAGE,
  USERS_ENDPOINT,
  BLOGS_ENDPOINT,
  EVENTS_ENDPOINT,
  IMAGES_ENDPOINT,
  IMAGES_PATH,
  MAX_IMAGE_SIZE_BYTES,
  MIN_IMAGE_WIDTH,
  MIN_IMAGE_HEIGHT,
  IMAGE_SETS,
} = require("../../config")

class Config {
  constructor() {
    this.apiPort = process.env.API_PORT || API_PORT
    this.itemsPerPage = process.env.ITEMS_PER_PAGE || ITEMS_PER_PAGE
    this.usersEndpoint = process.env.USERS_ENDPOINT || USERS_ENDPOINT
    this.blogsEndpoint = process.env.BLOGS_ENDPOINT || BLOGS_ENDPOINT
    this.eventsEndpoint = process.env.EVENTS_ENDPOINT || EVENTS_ENDPOINT
    this.imagesEndpoint = process.env.IMAGES_ENDPOINT || IMAGES_ENDPOINT

    this.imagePath = path.resolve(
      __dirname,
      "../../",
      process.env.IMAGES_PATH || IMAGES_PATH,
    )
    if (!fs.existsSync(this.imagePath)) {
      throw new Error(`Image path : does not exist`)
    }

    this.maxImageSizeByte =
      process.env.MAX_IMAGE_SIZE_BYTES || MAX_IMAGE_SIZE_BYTES
    this.minImageWidth = process.env.MIN_IMAGE_WIDTH || MIN_IMAGE_WIDTH
    this.minImageHeight = process.env.MIN_IMAGE_HEIGHT || MIN_IMAGE_HEIGHT

    this.imageSets = (process.env.IMAGE_SETS || IMAGE_SETS).map((item) => {
      const imageSetPath = path.resolve(__dirname, "../../", item)

      if (!fs.existsSync(`${imageSetPath}.js`)) {
        throw new Error(`ImageSet class '${imageSetPath}' does not exist`)
      }

      return imageSetPath
    })
  }

  getApiPort() {
    return this.apiPort
  }
  getItemsPerPage() {
    return this.itemsPerPage
  }
  getUsersEndpoint() {
    return this.usersEndpoint
  }
  getBlogsEndpoint() {
    return this.blogsEndpoint
  }
  getEventsEndpoint() {
    return this.eventsEndpoint
  }
  getImagesEndpoint() {
    return this.imagesEndpoint
  }
  getImagesPath() {
    return this.imagePath
  }
  getMaxImageSizeBytes() {
    return this.maxImageSizeByte
  }
  getMinImageWidth() {
    return this.minImageWidth
  }
  getMinImageHeight() {
    return this.minImageHeight
  }
  getImageSets() {
    return this.imageSets
  }
}

const config = new Config()

module.exports = config
