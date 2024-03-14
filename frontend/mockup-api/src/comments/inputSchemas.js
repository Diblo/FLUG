const Joi = require("joi");
const ImageDataUriHandler = require("./images/ImageDataUriHandler");
const config = require("./config");

/**
 * Regular expression for validating email format.
 * @type {RegExp}
 */
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

/**
 * Maximum allowed length for an email address.
 * @type {number}
 */
const emailMaxLength = 100;

/**
 * Validates an image based on its size, dimensions (width and height) and type.
 *
 * @param {string} value - Image data URI
 * @param {object} helpers - Joi helpers object for custom validation
 * @returns {string} - Image data URI (if valid)
 */
const validateImage = (value, helpers) => {
  try {
    const imageHandler = new ImageDataUriHandler(value);

    // size
    if (imageHandler.getBytes() > config.getMaxImageSizeBytes()) {
      return helpers.error("any.invalid", {
        message: "The image size exceeds the allowed limit of 8 MB",
      });
    }

    // dimensions
    if (
      imageHandler.getWidth() < config.getMinImageWidth() ||
      imageHandler.getHeight() < config.getMinImageHeight()
    ) {
      return helpers.error("any.invalid", {
        message: `Image dimensions must be at least ${config.getMinImageWidth()}x${config.getMinImageHeight()} pixels`,
      });
    }

    // type
    if (
      imageHandler.getMime() !== "image/jpeg" &&
      imageHandler.getMime() !== "image/png"
    ) {
      return helpers.error("any.invalid", {
        message: "Only JPG and PNG image formats are supported",
      });
    }
  } catch (error) {
    return helpers.error("any.invalid", {
      message: "Error retrieving image details",
    });
  }

  return value;
};

/**
 * Validates an email based on its length.
 *
 * @param {string} value - Image data URI
 * @param {object} helpers - Joi helpers object for custom validation
 * @returns {string} - Image data URI (if valid)
 */
const validateEmail = (value, helpers) => {
  if (value.length > emailMaxLength) {
    return helpers.error("any.invalid", {
      message:
        "The email exceeds the maximum length of ${maxLength} characters",
    });
  }

  if (!emailRegex.test(value)) {
    return helpers.error("any.invalid", {
      message: "The email format is invalid",
    });
  }

  return value;
};

const firstName = Joi.string().min(2).max(50);
const lastName = firstName;
const email = Joi.string().custom(validateEmail);
const title = Joi.string().min(5).max(100);
const slug = Joi.string().min(5).max(150);
const shortDesc = Joi.string().min(140).max(155);
const content = Joi.string().min(20);
const startDateTime = Joi.date().iso();
const endDateTime = startDateTime;
const location = Joi.string().min(15).max(255);
const src = Joi.string().custom(validateImage);
const alt = Joi.string().min(15).max(50);

const postUserSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName,
  email: email.required(),
});

const patchUserSchema = Joi.object({
  firstName: firstName,
  lastName: lastName.allow(""),
  email: email,
}).or("firstName", "lastName", "email");

const postBlogSchema = Joi.object({
  title: title.required(),
  slug: slug.required(),
  shortDesc: shortDesc.required(),
  image: Joi.object({
    src: src.required(),
    alt: alt.required(),
  }).allow(null),
  content: content.required(),
});

const patchBlogSchema = Joi.object({
  title: title,
  slug: slug,
  shortDesc: shortDesc,
  image: Joi.object({
    src: src.required(),
    alt: alt.required(),
  }).allow(null),
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
  location: location.allow(""),
  content: content,
}).or(
  "title",
  "slug",
  "shortDesc",
  "startDateTime",
  "endDateTime",
  "location",
  "content",
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
