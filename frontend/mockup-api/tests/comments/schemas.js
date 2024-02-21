const { ValueTypes } = require("./tools");

/* Link Objects */
const linkNextSchema = { href: ValueTypes.URI, title: ValueTypes.STR };

const linkSelfSchema = { href: ValueTypes.URI, title: ValueTypes.STR };

const linkSlugSchema = { href: ValueTypes.URI, title: ValueTypes.STR };

const linkUpdateSchema = {
  href: ValueTypes.URI,
  title: ValueTypes.STR,
  method: ValueTypes.METHOD,
};

const linkDeleteSchema = {
  href: ValueTypes.URI,
  title: ValueTypes.STR,
  method: ValueTypes.METHOD,
};

/* Image Object  */
const imageObjectSchema = {
  src: ValueTypes.FILE,
  alt: ValueTypes.STR,
};

/* Page */
const pageSchema = {
  items: ValueTypes.ARRAY,
  results: ValueTypes.INT,
  totalResults: ValueTypes.INT,
  pagination: { next: [linkNextSchema, ValueTypes.NULL] },
  page: ValueTypes.INT,
  totalPages: ValueTypes.INT,
};

/* User */
const userSchema = {
  uid: ValueTypes.INT,
  firstName: ValueTypes.STR,
  lastName: [ValueTypes.STR, ValueTypes.NULL],
  email: ValueTypes.EMAIL,
  createdAt: ValueTypes.DATE,
  updatedAt: [ValueTypes.DATE, ValueTypes.NULL],
  loggedInAt: [ValueTypes.DATE, ValueTypes.NULL],
  _links: {
    self: linkSelfSchema,
    update: linkUpdateSchema,
    delete: linkDeleteSchema,
  },
};

const userItemSchema = {
  uid: ValueTypes.INT,
  firstName: ValueTypes.STR,
  lastName: [ValueTypes.STR, ValueTypes.NULL],
  email: ValueTypes.EMAIL,
  createdAt: ValueTypes.DATE,
  updatedAt: [ValueTypes.DATE, ValueTypes.NULL],
  loggedInAt: [ValueTypes.DATE, ValueTypes.NULL],
  _links: {
    self: linkSelfSchema,
  },
};

/* Blog */
const blogSchema = {
  uid: ValueTypes.INT,
  title: ValueTypes.STR,
  slug: ValueTypes.SLUG,
  shortDesc: ValueTypes.STR,
  image: [imageObjectSchema, ValueTypes.NULL],
  content: ValueTypes.STR,
  createdAt: ValueTypes.DATE,
  updatedAt: [ValueTypes.DATE, ValueTypes.NULL],
  _links: {
    self: linkSelfSchema,
    slug: linkSlugSchema,
    update: linkUpdateSchema,
    delete: linkDeleteSchema,
  },
};

const blogItemSchema = {
  uid: ValueTypes.INT,
  title: ValueTypes.STR,
  shortDesc: ValueTypes.STR,
  image: [imageObjectSchema, ValueTypes.NULL],
  createdAt: ValueTypes.DATE,
  updatedAt: [ValueTypes.DATE, ValueTypes.NULL],
  _links: {
    self: linkSelfSchema,
    slug: linkSlugSchema,
  },
};

/* Event */
const eventSchema = {
  uid: ValueTypes.INT,
  title: ValueTypes.STR,
  slug: ValueTypes.SLUG,
  shortDesc: ValueTypes.STR,
  startDateTime: ValueTypes.DATE,
  endDateTime: ValueTypes.DATE,
  location: ValueTypes.STR,
  content: ValueTypes.STR,
  createdAt: ValueTypes.DATE,
  updatedAt: [ValueTypes.DATE, ValueTypes.NULL],
  _links: {
    self: linkSelfSchema,
    slug: linkSlugSchema,
    update: linkUpdateSchema,
    delete: linkDeleteSchema,
  },
};

const eventItemSchema = {
  uid: ValueTypes.INT,
  title: ValueTypes.STR,
  shortDesc: ValueTypes.STR,
  startDateTime: ValueTypes.DATE,
  location: ValueTypes.STR,
  createdAt: ValueTypes.DATE,
  updatedAt: [ValueTypes.DATE, ValueTypes.NULL],
  _links: {
    self: linkSelfSchema,
    slug: linkSlugSchema,
  },
};

/* Image */
const imageSchema = {
  uid: ValueTypes.INT,
  src: ValueTypes.FILE,
  alt: ValueTypes.STR,
  createdAt: ValueTypes.DATE,
  updatedAt: [ValueTypes.DATE, ValueTypes.NULL],
  _links: {
    self: linkSelfSchema,
    update: linkUpdateSchema,
    delete: linkDeleteSchema,
  },
};

const imageItemSchema = {
  uid: ValueTypes.INT,
  src: ValueTypes.FILE,
  alt: ValueTypes.STR,
  createdAt: ValueTypes.DATE,
  updatedAt: [ValueTypes.DATE, ValueTypes.NULL],
  _links: {
    self: linkSelfSchema,
  },
};

/* Error */
const errorSchema = {
  code: ValueTypes.INTEGER,
  message: ValueTypes.STR,
  description: ValueTypes.STR,
};

/* Msg */
const successResponseSchema = {
  success: ValueTypes.BOOLEAN,
  data: ValueTypes.OBJECT,
  message: ValueTypes.STRING,
};

const successNoContentResponseSchema = {
  success: ValueTypes.BOOLEAN,
  message: ValueTypes.STRING,
};

const errorResponseSchema = {
  success: ValueTypes.BOOLEAN,
  error: errorSchema,
};

module.exports = {
  successResponseSchema,
  successNoContentResponseSchema,
  errorResponseSchema,
  errorSchema,
  pageSchema,
  userSchema,
  userItemSchema,
  blogSchema,
  blogItemSchema,
  eventSchema,
  eventItemSchema,
  imageSchema,
  imageItemSchema,
};
