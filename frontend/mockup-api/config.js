const EXPRESS_PORT = process.env.EXPRESS_PORT || 2000;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@flug.dk";
const ITEMS_PER_PAGE = process.env.ITEMS_PER_PAGE || 100;
const USERS_PATH = process.env.USERS_PATH || "users";
const BLOGS_PATH = process.env.BLOGS_PATH || "blogs";
const EVENTS_PATH = process.env.EVENTS_PATH || "events";
const IMAGE_PATH = process.env.IMAGE_PATH || "images";

module.exports = {
  EXPRESS_PORT,
  ADMIN_EMAIL,
  ITEMS_PER_PAGE,
  USERS_PATH,
  BLOGS_PATH,
  EVENTS_PATH,
  IMAGE_PATH,
};
