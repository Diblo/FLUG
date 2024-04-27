const express = require("express")
const config = require("./comments/config")
const users = require("./db/users")
const blogs = require("./db/blogs")
const events = require("./db/events")
const images = require("./db/images")
const { jUserItem, jBlogItem, jEventItem, jImage } = require("./comments/json")
const {
  postUserSchema,
  patchUserSchema,
  postBlogSchema,
  patchBlogSchema,
  postEventSchema,
  patchEventSchema,
  postImageSchema,
  patchImageSchema,
} = require("./comments/inputSchemas")
const { NotFound } = require("./comments/errors")
const Image = require("./comments/images/Image")

// Initialize router
const router = express.Router()

function sleepFor(sleepDuration) {
  var now = new Date().getTime()
  while (new Date().getTime() < now + sleepDuration) {
    /* Do nothing */
  }
}

// Define endpoints for handling user data
router.get(`/${config.getUsersEndpoint()}`, (req, res) => {
  sleepFor(2000)
  const totalItems = users.countRows()
  const totalPages = Math.ceil(totalItems / config.getItemsPerPage())
  const currentPage = req.getPage()

  if (currentPage === null || currentPage > totalPages) {
    throw new NotFound(`Page '${currentPage}' does not exist.`)
  }

  const items = []
  const startItem = config.getItemsPerPage() * (currentPage - 1)
  for (const user of users.gets(startItem, config.getItemsPerPage())) {
    items.push(jUserItem(user))
  }

  res.jPage(items, totalItems, currentPage, totalPages)
})

router.get(`/${config.getUsersEndpoint()}/:uid`, (req, res) => {
  //sleepFor(2000)
  const uid = req.getUid()

  if (uid === null || !users.exists(uid)) {
    throw new NotFound(`The user with uid '${uid}' does not exist.`)
  }

  res.jUser(users.get(uid))
})

router.post(`/${config.getUsersEndpoint()}`, (req, res) => {
  //sleepFor(2000)
  // Respond with the created user
  res.status(201).jUser(users.add(req.getJson(postUserSchema)))
})

router.patch(`/${config.getUsersEndpoint()}/:uid`, (req, res) => {
  //sleepFor(2000)
  const uid = req.getUid()

  if (uid === null || !users.exists(uid)) {
    throw new NotFound(`The user with uid '${uid}' does not exist.`)
  }

  // Respond with the updated user
  res.jUser(users.update(uid, req.getJson(patchUserSchema)))
})

router.delete(`/${config.getUsersEndpoint()}/:uid`, (req, res) => {
  //sleepFor(2000)
  const uid = req.getUid()

  if (uid === null || !users.exists(uid)) {
    throw new NotFound(`The user with uid '${uid}' does not exist.`)
  }

  users.delete(uid)

  // Respond with a success message
  res.jSuccess()
})

// Define endpoints for handling blog data
router.get(`/${config.getBlogsEndpoint()}`, (req, res) => {
  const totalItems = blogs.countRows()
  const totalPages = Math.ceil(totalItems / config.getItemsPerPage())
  const currentPage = req.getPage()

  if (currentPage === null || currentPage > totalPages) {
    throw new NotFound(`Page '${currentPage}' does not exist.`)
  }

  const items = []
  const startItem = config.getItemsPerPage() * (currentPage - 1)
  for (const blog of blogs.gets(startItem, config.getItemsPerPage())) {
    items.push(jBlogItem(blog))
  }

  res.jPage(items, totalItems, currentPage, totalPages)
})

router.get(`/${config.getBlogsEndpoint()}/:id`, (req, res) => {
  let uid = req.getUid()
  if (uid === null || !blogs.exists(uid)) {
    uid = blogs.getIdBySlug(req.getSlug())
  }

  if (uid === null) {
    throw new NotFound(
      `The blog post with uid or slug '${uid}' does not exist.`,
    )
  }

  res.jBlog(blogs.get(uid))
})

router.post(`/${config.getBlogsEndpoint()}`, (req, res) => {
  const body = req.getJson(postBlogSchema)
  if (body.image) {
    body.image.src = new Image(body.image.src).store()
  }

  // Respond with the created blog
  res.status(201).jBlog(blogs.add(body))
})

router.patch(`/${config.getBlogsEndpoint()}/:uid`, (req, res) => {
  const uid = req.getUid()

  if (uid === null || !blogs.exists(uid)) {
    throw new NotFound(`The blog post with uid '${uid}' does not exist.`)
  }

  const body = req.getJson(patchBlogSchema)
  if (body.image) {
    body.image.src = new Image(body.image.src).store()
  }

  // Respond with the updated blog
  res.jBlog(blogs.update(uid, body))
})

router.delete(`/${config.getBlogsEndpoint()}/:uid`, (req, res) => {
  const uid = req.getUid()

  if (uid === null) {
    throw new NotFound(`The blog post with uid '${uid}' does not exist.`)
  }

  blogs.delete(uid)

  // Respond with a success message
  res.jSuccess()
})

// Define endpoints for handling event data
router.get(`/${config.getEventsEndpoint()}`, (req, res) => {
  const totalItems = events.countRows()
  const totalPages = Math.ceil(totalItems / config.getItemsPerPage())
  const currentPage = req.getPage()

  if (currentPage === null || currentPage > totalPages) {
    throw new NotFound(`Page '${currentPage}' does not exist.`)
  }

  const items = []
  const startItem = config.getItemsPerPage() * (currentPage - 1)
  for (const event of events.gets(startItem, config.getItemsPerPage())) {
    items.push(jEventItem(event))
  }

  res.jPage(items, totalItems, currentPage, totalPages)
})

router.get(`/${config.getEventsEndpoint()}/:id`, (req, res) => {
  let uid = req.getUid()
  if (uid === null || !events.exists(uid)) {
    uid = events.getIdBySlug(req.getSlug())
  }

  if (uid === null) {
    throw new NotFound(`The event with uid or slug '${uid}' does not exist.`)
  }

  res.jEvent(events.get(uid))
})

router.post(`/${config.getEventsEndpoint()}`, (req, res) => {
  // Respond with the created event
  res.status(201).jEvent(events.add(req.getJson(postEventSchema)))
})

router.patch(`/${config.getEventsEndpoint()}/:uid`, (req, res) => {
  const uid = req.getUid()

  if (uid === null || !events.exists(uid)) {
    throw new NotFound(`The event with uid '${uid}' does not exist.`)
  }

  // Respond with the updated event
  res.jEvent(events.update(uid, req.getJson(patchEventSchema)))
})

router.delete(`/${config.getEventsEndpoint()}/:uid`, (req, res) => {
  const uid = req.getUid()

  if (uid === null || !events.exists(uid)) {
    throw new NotFound(`The event with uid '${uid}' does not exist.`)
  }

  events.delete(uid)

  // Respond with a success message
  res.jSuccess()
})

// Define endpoints for handling image data
router.get(`/${config.getImagesEndpoint()}`, (req, res) => {
  const totalItems = images.countRows()
  const totalPages = Math.ceil(totalItems / config.getItemsPerPage())
  const currentPage = req.getPage()

  if (currentPage === null || currentPage > totalPages) {
    throw new NotFound(`Page '${currentPage}' does not exist.`)
  }

  const items = []
  const startItem = config.getItemsPerPage() * (currentPage - 1)
  for (const image of images.gets(startItem, config.getItemsPerPage())) {
    items.push(jImage(image))
  }

  res.jPage(items, totalItems, currentPage, totalPages)
})

router.get(`/${config.getImagesEndpoint()}/:uid`, (req, res) => {
  const uid = req.getUid()

  if (uid === null || !images.exists(uid)) {
    throw new NotFound(`The image with uid '${uid}' does not exist.`)
  }

  res.jImage(images.get(uid))
})

router.post(`/${config.getImagesEndpoint()}`, (req, res) => {
  const body = req.getJson(postImageSchema)
  body.src = new Image(body.src).store()

  // Respond with the created image
  res.status(201).jImage(images.add(body))
})

router.patch(`/${config.getImagesEndpoint()}/:uid`, (req, res) => {
  const uid = req.getUid()

  if (uid === null || !images.exists(uid)) {
    throw new NotFound(`The image with uid '${uid}' does not exist.`)
  }

  // Respond with the updated image
  res.jImage(images.update(uid, req.getJson(patchImageSchema)))
})

router.delete(`/${config.getImagesEndpoint()}/:uid`, (req, res) => {
  const uid = req.getUid()

  if (uid === null || !images.exists(uid)) {
    throw new NotFound(`The image with uid '${uid}' does not exist.`)
  }

  images.delete(uid)

  // Respond with a success message
  res.jSuccess()
})

module.exports = router
