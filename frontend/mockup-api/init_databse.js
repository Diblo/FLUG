const { createTable } = require("./libs/memory_database");
const { faker } = require("@faker-js/faker");
const { USERS_PATH, BLOGS_PATH, EVENTS_PATH, IMAGE_PATH } = require("./config");
const users = require("./src/db/users");
const blogs = require("./src/db/blogs");
const events = require("./src/db/events");
const images = require("./src/db/images");

/**
 * Converts a text string to a URL-friendly slug.
 *
 * @param {string} textString - The input text string to convert.
 * @returns {string} - The converted slug string.
 */
function convertToSlug(textString) {
  return textString
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

function getDateTime(addMinutes=0) {
  return new Date(new Date() + addMinutes * 60000).toISOString();
}

/**
 * Generate user data
 *
 * @returns {object} - User data
 */
function createUser() {
  // Generate user data with random values
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = (firstName + "_" + lastName + "@gmail.com").toLowerCase();

  return {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };
}

/**
 * Generate blog data
 *
 * @param {number} billedeID
 * @returns {object} - Blog data
 */
function createBlog(billedeID) {
  // Generate blog data with random values
  const title = faker.lorem.words({ min: 3, max: 7 });

  return {
    title: title,
    slug: convertToSlug(title),
    shortDesc: faker.lorem.words({ min: 15, max: 25 }),
    image: Math.floor(Math.random() * 8) === 3 ? billedeID : null,
    content: faker.lorem.paragraphs({ min: 2, max: 8 }),
  };
}

/**
 * Generate event data
 *
 * @returns {object} - Event data
 */
function createEvent() {
  // Generate event data with random values
  const title = faker.lorem.words({ min: 3, max: 7 });
  const startDateTime = faker.date.future().toISOString();
  const endDateTime = faker.date.future({ refDate: startDateTime }).toISOString();

  return {
    title: title,
    slug: convertToSlug(title),
    shortDesc: faker.lorem.words({ min: 15, max: 25 }),
    startDateTime: startDateTime,
    endDateTime: endDateTime,
    location: faker.location.streetAddress(false),
    content: faker.lorem.paragraphs({ min: 2, max: 8 }),
  };
}

function init_database_and_data() {
  // Initialize the database with super user and random data
  createTable(USERS_PATH);
  createTable(BLOGS_PATH);
  createTable(EVENTS_PATH);
  createTable(IMAGE_PATH);

  for (let i = 0; i < 300; i++) {
    const user = users.add(createUser());
    if (Math.floor(Math.random() * 8) < 6) {
      users.update(user.uid, {loggedInAt: getDateTime(5)});
    }
  }

  const image = images.add({ src: "example1.jpg", alt: "Alt string" });

  for (let i = 0; i < 300; i++) {
    const blog = blogs.add(createBlog(image.uid));
    if (Math.floor(Math.random() * 8) < 3) {
      users.update(blog.uid, {});
    }
    const event = events.add(createEvent());
    if (Math.floor(Math.random() * 8) < 3) {
      users.update(event.uid, {});
    }
  }

  const blog = blogs.get(30).asObject();
  blog.title = "Custom Blog Title";
  blog.slug = convertToSlug(blog.title);
  blogs.update(blog.uid, blog);

  const event = events.get(30).asObject();
  event.title = "Custom Event Title";
  event.slug = convertToSlug(event.title);
  events.update(blog.uid, event);
}

module.exports = init_database_and_data;
