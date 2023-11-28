const {
  BLOGS_PATH,
  USERS_PATH,
  EVENTS_PATH,
  IMAGE_PATH,
} = require("../config");
const images = require("./db/images");

/**
 * @param {boolean} success
 * @param {object} content
 * @param {string} message
 * @returns {object}
 */
function jMain(success, content, message) {
  if (success) {
    if (content && Object.keys(content).length > 0) {
      return {
        success: success,
        data: content,
        message: message,
      };
    }

    return {
      success: success,
      message: message,
    };
  }

  return {
    success: success,
    error: content,
  };
}

/**
 * Create a list
 *
 * @param {string} resPath - Resource path (e.g., "users", "blogs")
 * @param {array} items - List of items
 * @param {number} totalResults - Total number of items
 * @param {number} curPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @returns {object} - List layout
 */
function jPage(resPath, items, totalResults, curPage, totalPages) {
  const resURI = "/" + resPath;

  return {
    items: items,
    results: items.length,
    totalResults: totalResults,
    pagination:
      curPage < totalPages
        ? LinkObject("next", resURI + "?page=" + (curPage + 1), "Næste")
        : { next: null },
    page: curPage,
    totalPages: totalPages,
  };
}

/**
 * @param {entity} entity
 * @returns {object}
 */
function jUserItem(entity) {
  return {
    uid: entity.uid,
    firstName: entity.firstName,
    lastName: entity.lastName,
    email: entity.email,

    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    loggedInAt: entity.loggedInAt,

    _links: {
      ...LinkObject(
        "self",
        "/" + USERS_PATH + "/" + entity.uid,
        entity.firstName + (entity.lastName ? " " + entity.lastName : "")
      ),
    },
  };
}

/**
 * @param {entity} entity
 * @returns {object}
 */
function jBlogItem(entity) {
  const image = entity.image ? images.get(entity.image) : null;

  return {
    uid: entity.uid,
    title: entity.title,
    shortDesc: entity.shortDesc,
    image: image ? ImageObject(image.src, image.alt) : null,

    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,

    _links: {
      ...LinkObject("self", "/" + BLOGS_PATH + "/" + entity.uid, entity.title),
      ...LinkObject("slug", "/" + BLOGS_PATH + "/" + entity.slug, entity.title),
    },
  };
}

/**
 * @param {entity} entity
 * @returns {object}
 */
function jEventItem(entity) {
  return {
    uid: entity.uid,
    title: entity.title,
    shortDesc: entity.shortDesc,
    startDateTime: entity.startDateTime,
    location: entity.location,

    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,

    _links: {
      ...LinkObject("self", "/" + EVENTS_PATH + "/" + entity.uid, entity.title),
      ...LinkObject(
        "slug",
        "/" + EVENTS_PATH + "/" + entity.slug,
        entity.title
      ),
    },
  };
}

/**
 * @param {entity} entity
 * @returns {object}
 */
function jImageItem(entity) {
  return {
    uid: entity.uid,
    src: entity.src,
    alt: entity.alt,

    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,

    _links: {
      ...LinkObject("self", "/" + IMAGE_PATH + "/" + entity.uid, entity.title),
    },
  };
}

/**
 * @param {entity} entity
 * @returns {object}
 */
function jUser(entity) {
  return {
    ...entity.asObject(),
    _links: {
      ...LinkObject(
        "self",
        "/" + USERS_PATH + "/" + entity.uid,
        entity.firstName + (entity.lastName ? " " + entity.lastName : "")
      ),
      ...LinkObject(
        "update",
        "/" + USERS_PATH + "/" + entity.uid,
        "Gem",
        "PATCH"
      ),
      ...LinkObject(
        "delete",
        "/" + USERS_PATH + "/" + entity.uid,
        "Slet",
        "DELETE"
      ),
    },
  };
}

/**
 * @param {entity} entity
 * @returns {object}
 */
function jBlog(entity) {
  const image = entity.image ? images.get(entity.image) : null;
  return {
    ...entity.asObject(),
    image: image ? ImageObject(image.src, image.alt) : null,
    _links: {
      ...LinkObject("self", "/" + BLOGS_PATH + "/" + entity.uid, entity.title),
      ...LinkObject("slug", "/" + BLOGS_PATH + "/" + entity.slug, entity.title),
      ...LinkObject(
        "update",
        "/" + BLOGS_PATH + "/" + entity.uid,
        "Gem",
        "PATCH"
      ),
      ...LinkObject(
        "delete",
        "/" + BLOGS_PATH + "/" + entity.uid,
        "Slet",
        "DELETE"
      ),
    },
  };
}

/**
 * @param {entity} entity
 * @returns {object}
 */
function jEvent(entity) {
  return {
    ...entity.asObject(),
    _links: {
      ...LinkObject("self", "/" + EVENTS_PATH + "/" + entity.uid, entity.title),
      ...LinkObject(
        "slug",
        "/" + EVENTS_PATH + "/" + entity.slug,
        entity.title
      ),
      ...LinkObject(
        "update",
        "/" + EVENTS_PATH + "/" + entity.uid,
        "Gem",
        "PATCH"
      ),
      ...LinkObject(
        "delete",
        "/" + EVENTS_PATH + "/" + entity.uid,
        "Slet",
        "DELETE"
      ),
    },
  };
}

/**
 * @param {entity} entity
 * @returns {object}
 */
function jImage(entity) {
  return {
    ...entity.asObject(),
    _links: {
      ...LinkObject("self", "/" + IMAGE_PATH + "/" + entity.uid, entity.title),
      ...LinkObject(
        "update",
        "/" + IMAGE_PATH + "/" + entity.uid,
        "Gem",
        "PATCH"
      ),
      ...LinkObject(
        "delete",
        "/" + IMAGE_PATH + "/" + entity.uid,
        "Slet",
        "DELETE"
      ),
    },
  };
}

/**
 *
 * @param {string} message - Message
 */
function jSuccess(message) {
  return {
    success: message,
  };
}

/**
 *
 * @param {string} uri
 * @param {string} message - Error message
 */
function jError(code, message, description) {
  return {
    error: {
      code: code,
      message: message,
      description: description,
    },
  };
}

/**
 * Create a link object
 *
 * @param {string} identify - Identifier for the link object.
 * @param {string} href - Link URL
 * @param {string} title - Link title
 * @param {string} [method] - HTTP method (optional)
 * @returns {object} - Link object
 */
function LinkObject(identify, href, title, method) {
  const link = { href: href, title: title };

  if (method) {
    link.method = method;
  }

  return { [identify]: link };
}

/**
 * @param {string} src
 * @param {string} alt
 * @returns {object} - Link object
 */
function ImageObject(src, alt) {
  return { src: src, alt: alt };
}

module.exports = {
  jPage,
  jUserItem,
  jBlogItem,
  jEventItem,
  jImageItem,
  jUser,
  jBlog,
  jEvent,
  jImage,
  jSuccess,
  jError,
};
