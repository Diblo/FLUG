const { ValueTypes } = require("./tools")

/* Image Object  */
const imageObjectSchema = {
  src: ValueTypes.FILE,
  alt: ValueTypes.STR,
}

/* Page */
const pageSchema = {
  items: ValueTypes.ARRAY,
  results: ValueTypes.INT,
  totalResults: ValueTypes.INT,
  pagination: {
    first: ValueTypes.INT,
    prev: ValueTypes.INT,
    current: ValueTypes.INT,
    next: ValueTypes.INT,
    last: ValueTypes.INT,
  },
  page: ValueTypes.INT,
  totalPages: ValueTypes.INT,
}

/* User */
const userSchema = {
  uid: ValueTypes.INT,
  firstName: ValueTypes.STR,
  lastName: [ValueTypes.STR, ValueTypes.NULL],
  email: ValueTypes.EMAIL,
  createdAt: ValueTypes.DATE,
  updatedAt: [ValueTypes.DATE, ValueTypes.NULL],
  loggedInAt: [ValueTypes.DATE, ValueTypes.NULL],
}

const userItemSchema = {
  uid: ValueTypes.INT,
  firstName: ValueTypes.STR,
  lastName: [ValueTypes.STR, ValueTypes.NULL],
  email: ValueTypes.EMAIL,
  createdAt: ValueTypes.DATE,
  updatedAt: [ValueTypes.DATE, ValueTypes.NULL],
  loggedInAt: [ValueTypes.DATE, ValueTypes.NULL],
}

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
}

const blogItemSchema = {
  uid: ValueTypes.INT,
  title: ValueTypes.STR,
  shortDesc: ValueTypes.STR,
  image: [imageObjectSchema, ValueTypes.NULL],
  createdAt: ValueTypes.DATE,
  updatedAt: [ValueTypes.DATE, ValueTypes.NULL],
}

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
}

const eventItemSchema = {
  uid: ValueTypes.INT,
  title: ValueTypes.STR,
  shortDesc: ValueTypes.STR,
  startDateTime: ValueTypes.DATE,
  location: ValueTypes.STR,
  createdAt: ValueTypes.DATE,
  updatedAt: [ValueTypes.DATE, ValueTypes.NULL],
}

/* Image */
const imageSchema = {
  uid: ValueTypes.INT,
  src: ValueTypes.FILE,
  alt: ValueTypes.STR,
  createdAt: ValueTypes.DATE,
  updatedAt: [ValueTypes.DATE, ValueTypes.NULL],
}

const imageItemSchema = {
  uid: ValueTypes.INT,
  src: ValueTypes.FILE,
  alt: ValueTypes.STR,
  createdAt: ValueTypes.DATE,
  updatedAt: [ValueTypes.DATE, ValueTypes.NULL],
}

/* Error */
const errorSchema = {
  code: ValueTypes.INTEGER,
  message: ValueTypes.STR,
  description: ValueTypes.STR,
}

/* Msg */
const successResponseSchema = {
  success: ValueTypes.BOOLEAN,
  data: ValueTypes.OBJECT,
  message: ValueTypes.STRING,
}

const successNoContentResponseSchema = {
  success: ValueTypes.BOOLEAN,
  message: ValueTypes.STRING,
}

const errorResponseSchema = {
  success: ValueTypes.BOOLEAN,
  error: errorSchema,
}

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
}
