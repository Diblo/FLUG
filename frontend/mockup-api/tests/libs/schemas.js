const { ValueTypes } = require("./tools");

/* Link */
const linkNextSchema = {
  next: [{ href: ValueTypes.URI, title: ValueTypes.STR }, ValueTypes.NULL],
};

const linkSlugSchema = {
  slug: { href: ValueTypes.URI, title: ValueTypes.STR },
};

const linkSelfSchema = {
  self: { href: ValueTypes.URI, title: ValueTypes.STR },
};

const linkUpdateSchema = {
  update: {
    href: ValueTypes.URI,
    title: ValueTypes.STR,
    method: ValueTypes.METHOD,
  },
};

const linkDeleteSchema = {
  delete: {
    href: ValueTypes.URI,
    title: ValueTypes.STR,
    method: ValueTypes.METHOD,
  },
};

const imageSchema = [
  {
    src: ValueTypes.FILE,
    alt: ValueTypes.STR,
  },
  ValueTypes.NULL,
];

/* Page */
const pageSchema = {
  items: ValueTypes.ARRAY,
  results: ValueTypes.INT,
  totalResults: ValueTypes.INT,
  pagination: linkNextSchema,
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
    ...linkSelfSchema,
    ...linkUpdateSchema,
    ...linkDeleteSchema,
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
  _links: linkSelfSchema,
};

/* Blog */
const blogSchema = {
  uid: ValueTypes.INT,
  title: ValueTypes.STR,
  slug: ValueTypes.SLUG,
  shortDesc: ValueTypes.STR,
  image: imageSchema,
  content: ValueTypes.STR,
  createdAt: ValueTypes.DATE,
  updatedAt: [ValueTypes.DATE, ValueTypes.NULL],
  _links: {
    ...linkSelfSchema,
    ...linkSlugSchema,
    ...linkUpdateSchema,
    ...linkDeleteSchema,
  },
};

const blogItemSchema = {
  uid: ValueTypes.INT,
  title: ValueTypes.STR,
  shortDesc: ValueTypes.STR,
  image: imageSchema,
  createdAt: ValueTypes.DATE,
  updatedAt: [ValueTypes.DATE, ValueTypes.NULL],
  _links: {
    ...linkSelfSchema,
    ...linkSlugSchema,
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
    ...linkSelfSchema,
    ...linkSlugSchema,
    ...linkUpdateSchema,
    ...linkDeleteSchema,
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
    ...linkSelfSchema,
    ...linkSlugSchema,
  },
};

/* Msg */
const successSchema = {
  success: ValueTypes.STR,
};
const errorSchema = {
  error: ValueTypes.STR,
  uri: ValueTypes.STR,
};

module.exports = {
  pageSchema,
  userItemSchema,
  userSchema,
  blogItemSchema,
  blogSchema,
  eventItemSchema,
  eventSchema,
  successSchema,
  errorSchema,
};
