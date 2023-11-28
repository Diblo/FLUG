const express = require("express");
const {
  USERS_PATH,
  BLOGS_PATH,
  EVENTS_PATH,
  ITEMS_PER_PAGE,
  IMAGE_PATH,
} = require("../config");
const { jUserItem, jBlogItem, jEventItem, jImage } = require("./json");
const {
  postUserSchema,
  patchUserSchema,
  postBlogSchema,
  patchBlogSchema,
  postEventSchema,
  patchEventSchema,
  postImageSchema,
  patchImageSchema,
} = require("./inputSchemas");
const users = require("./db/users");
const blogs = require("./db/blogs");
const events = require("./db/events");
const images = require("./db/images");
const { ResourceNotFound } = require("./Error");

function getCurrentPage(page, totalPages) {
  const currentPage = page ? parseInt(page) : 1;

  if (currentPage <= 0 || currentPage > totalPages) {
    return null;
  }

  return currentPage;
}

// Initialize routes
const router = express.Router();

// Define routes for handling user data
router.get("/" + USERS_PATH, (req, res) => {
  const totalItems = users.countRows();
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const currentPage = getCurrentPage(req.query.page, totalPages);

  if (currentPage === null) {
    throw new ResourceNotFound();
  }

  const items = [];
  const startItem = ITEMS_PER_PAGE * (currentPage - 1);
  for (const user of users.gets(startItem, ITEMS_PER_PAGE)) {
    items.push(jUserItem(user));
  }

  res.jPage(USERS_PATH, items, totalItems, currentPage, totalPages);
});

router.get("/" + USERS_PATH + "/:uid", (req, res) => {
  const uid = req.getUid();

  if (uid === null || !users.exists(uid)) {
    throw new ResourceNotFound();
  }

  res.jUser(users.get(uid));
});

router.post("/" + USERS_PATH, (req, res) => {
  // Respond with the created user
  res.jUser(201, users.add(req.getJson(postUserSchema)));
});

router.patch("/" + USERS_PATH + "/:uid", (req, res) => {
  const uid = req.getUid();

  if (uid === null || !users.exists(uid)) {
    throw new ResourceNotFound();
  }

  // Respond with the updated user
  res.jUser(users.update(uid, req.getJson(patchUserSchema)));
});

router.delete("/" + USERS_PATH + "/:uid", (req, res) => {
  const uid = req.getUid();

  if (uid === null || !users.exists(uid)) {
    throw new ResourceNotFound();
  }

  users.delete(uid);

  // Respond with a success message
  res.jSuccess("Resource deleted successfully");
});

// Define routes for handling blog data
router.get("/" + BLOGS_PATH, (req, res) => {
  const totalItems = blogs.countRows();
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const currentPage = getCurrentPage(req.query.page, totalPages);

  if (currentPage === null) {
    throw new ResourceNotFound();
  }

  const items = [];
  const startItem = ITEMS_PER_PAGE * (currentPage - 1);
  for (const blog of blogs.gets(startItem, ITEMS_PER_PAGE)) {
    items.push(jBlogItem(blog));
  }

  res.jPage(BLOGS_PATH, items, totalItems, currentPage, totalPages);
});

router.get("/" + BLOGS_PATH + "/:id", (req, res) => {
  let uid = req.getUid();
  if (uid === null || !blogs.exists(uid)) {
    uid = blogs.getIdBySlug(req.getSlug());
  }

  if (uid === null) {
    throw new ResourceNotFound();
  }

  res.jBlog(blogs.get(uid));
});

router.post("/" + BLOGS_PATH, (req, res) => {
  // Respond with the created blog
  res.jBlog(201, blogs.add(req.getJson(postBlogSchema)));
});

router.patch("/" + BLOGS_PATH + "/:uid", (req, res) => {
  const uid = req.getUid();

  if (uid === null || !blogs.exists(uid)) {
    throw new ResourceNotFound();
  }

  // Respond with the updated blog
  res.jBlog(blogs.update(uid, req.getJson(patchBlogSchema)));
});

router.delete("/" + BLOGS_PATH + "/:uid", (req, res) => {
  const uid = req.getUid();

  if (uid === null || !blogs.exists(uid)) {
    throw new ResourceNotFound();
  }

  blogs.delete(uid);

  // Respond with a success message
  res.jSuccess("Resource deleted successfully");
});

// Define routes for handling event data
router.get("/" + EVENTS_PATH, (req, res) => {
  const totalItems = events.countRows();
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const currentPage = getCurrentPage(req.query.page, totalPages);

  if (currentPage === null) {
    throw new ResourceNotFound();
  }

  const items = [];
  const startItem = ITEMS_PER_PAGE * (currentPage - 1);
  for (const event of events.gets(startItem, ITEMS_PER_PAGE)) {
    items.push(jEventItem(event));
  }

  res.jPage(EVENTS_PATH, items, totalItems, currentPage, totalPages);
});

router.get("/" + EVENTS_PATH + "/:id", (req, res) => {
  let uid = req.getUid();
  if (uid === null || !events.exists(uid)) {
    uid = events.getIdBySlug(req.getSlug());
  }

  if (uid === null) {
    throw new ResourceNotFound();
  }

  res.jEvent(events.get(uid));
});

router.post("/" + EVENTS_PATH, (req, res) => {
  // Respond with the created event
  res.jEvent(201, events.add(req.getJson(postEventSchema)));
});

router.patch("/" + EVENTS_PATH + "/:uid", (req, res) => {
  const uid = req.getUid();

  if (uid === null || !events.exists(uid)) {
    throw new ResourceNotFound();
  }

  // Respond with the updated event
  res.jEvent(events.update(uid, req.getJson(patchEventSchema)));
});

router.delete("/" + EVENTS_PATH + "/:uid", (req, res) => {
  const uid = req.getUid();

  if (uid === null || !events.exists(uid)) {
    throw new ResourceNotFound();
  }

  events.delete(uid);

  // Respond with a success message
  res.jSuccess("Resource deleted successfully");
});

// Define routes for handling image data
router.get("/" + IMAGE_PATH, (req, res) => {
  const totalItems = images.countRows();
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const currentPage = getCurrentPage(req.query.page, totalPages);

  if (currentPage === null) {
    throw new ResourceNotFound();
  }

  const items = [];
  const startItem = ITEMS_PER_PAGE * (currentPage - 1);
  for (const images of images.gets(startItem, ITEMS_PER_PAGE)) {
    items.push(jImage(images));
  }

  res.jPage(IMAGE_PATH, items, totalItems, currentPage, totalPages);
});

router.get("/" + IMAGE_PATH + "/:uid", (req, res) => {
  const uid = req.getUid();

  if (uid === null || !images.exists(uid)) {
    throw new ResourceNotFound();
  }

  res.jImage(images.get(uid));
});

router.post("/" + IMAGE_PATH, (req, res) => {
  // Respond with the created image
  res.jImage(201, images.add(req.getJson(postImageSchema)));
});

router.patch("/" + IMAGE_PATH + "/:uid", (req, res) => {
  const uid = req.getUid();

  if (uid === null || !images.exists(uid)) {
    throw new ResourceNotFound();
  }

  // Respond with the updated image
  res.jImage(images.update(uid, req.getJson(patchImageSchema)));
});

router.delete("/" + IMAGE_PATH + "/:uid", (req, res) => {
  const uid = req.getUid();

  if (uid === null || !images.exists(uid)) {
    throw new ResourceNotFound();
  }

  images.delete(uid);

  // Respond with a success message
  res.jSuccess("Resource deleted successfully");
});

module.exports = router;
