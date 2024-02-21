const API_PORT = 2000;
const ITEMS_PER_PAGE = 100;
const USERS_ENDPOINT = "users";
const BLOGS_ENDPOINT = "blogs";
const EVENTS_ENDPOINT = "events";
const IMAGES_ENDPOINT = "images";

const IMAGES_PATH = "../web/public/images";
const MAX_IMAGE_SIZE_BYTES = 8000000;
const MIN_IMAGE_WIDTH = 380;
const MIN_IMAGE_HEIGHT = 200;
const IMAGE_SETS = [
  "./src/imageSets/WebImage",
  "./src/imageSets/OpenGrapImage",
  "./src/imageSets/XImage",
  "./src/imageSets/OriginalImage",
];

module.exports = {
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
};
