const Joi = require("joi");

const firstName = Joi.string().min(2).max(50);
const lastName = firstName;
const email = Joi.string().max(100).email();
const title = Joi.string().min(5).max(100);
const slug = Joi.string().min(5).max(150);
const shortDesc = Joi.string().min(140).max(155);
const image = Joi.number();
const content = Joi.string().min(20);
const startDateTime = Joi.date().iso();
const endDateTime = startDateTime;
const location = Joi.string().min(15).max(255);
const src = Joi.string().min(1024).max(8000000);
const alt = Joi.string().min(15).max(50);

const postUserSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName,
  email: email.required(),
});

const patchUserSchema = Joi.object({
  firstName: firstName,
  lastName: lastName.allow(''),
  email: email,
}).or("firstName", "lastName", "email");

const postBlogSchema = Joi.object({
  title: title.required(),
  slug: slug.required(),
  shortDesc: shortDesc.required(),
  image: image,
  content: content.required(),
});

const patchBlogSchema = Joi.object({
  title: title,
  slug: slug,
  shortDesc: shortDesc,
  image: image.empty(),
  content: content,
}).or("title", "slug", "shortDesc", "image", "content");

const postEventSchema = Joi.object({
  title: title.required(),
  slug: slug.required(),
  shortDesc: shortDesc.required(),
  startDateTime: startDateTime.required(),
  endDateTime: endDateTime.required(),
  location: location,
  content: content.required(),
});

const patchEventSchema = Joi.object({
  title: title,
  slug: slug,
  shortDesc: shortDesc,
  startDateTime: startDateTime,
  endDateTime: endDateTime,
  location: location.allow(''),
  content: content,
}).or(
  "title",
  "slug",
  "shortDesc",
  "startDateTime",
  "endDateTime",
  "location",
  "content"
);

const postImageSchema = Joi.object({
  src: src.required(),
  alt: alt.required(),
});

const patchImageSchema = Joi.object({
  alt: alt.required(),
});

module.exports = {
  postUserSchema,
  patchUserSchema,
  postBlogSchema,
  patchBlogSchema,
  postEventSchema,
  patchEventSchema,
  postImageSchema,
  patchImageSchema,
};
