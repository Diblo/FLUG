const config = require("./config")

/**
 * @param {boolean} success
 * @param {object} content
 * @param {string} [message]
 * @returns {object}
 */
function jMain(success, content, message) {
  if (success) {
    if (content && Object.keys(content).length > 0) {
      return {
        success: success,
        data: content,
        message: message,
      }
    }

    return {
      success: success,
      message: message,
    }
  }

  return {
    success: success,
    error: content,
  }
}

/**
 * Create a list
 *
 * @param {string} curResource - Resource path (e.g., "/users", "/blogs")
 * @param {array} items - List of items
 * @param {number} totalResults - Total number of items
 * @param {number} curPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @returns {object} - List layout
 */
function jPage(curResource, items, totalResults, curPage, totalPages) {
  return {
    items: items,
    results: items.length,
    totalResults: totalResults,
    pagination:
      curPage < totalPages
        ? LinkObject("next", curResource + "?page=" + (curPage + 1), "Næste")
        : { next: null },
    page: curPage,
    totalPages: totalPages,
  }
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
        "/" + config.getUsersEndpoint() + "/" + entity.uid,
        entity.firstName + (entity.lastName ? " " + entity.lastName : "")
      ),
    },
  }
}

/**
 * @param {entity} entity
 * @returns {object}
 */
function jBlogItem(entity) {
  return {
    uid: entity.uid,
    title: entity.title,
    shortDesc: entity.shortDesc,
    image: entity.image,

    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,

    _links: {
      ...LinkObject(
        "self",
        "/" + config.getBlogsEndpoint() + "/" + entity.uid,
        entity.title
      ),
      ...LinkObject(
        "slug",
        "/" + config.getBlogsEndpoint() + "/" + entity.slug,
        entity.title
      ),
    },
  }
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
      ...LinkObject(
        "self",
        "/" + config.getEventsEndpoint() + "/" + entity.uid,
        entity.title
      ),
      ...LinkObject(
        "slug",
        "/" + config.getEventsEndpoint() + "/" + entity.slug,
        entity.title
      ),
    },
  }
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
      ...LinkObject(
        "self",
        "/" + config.getImagesEndpoint() + "/" + entity.uid,
        entity.alt
      ),
    },
  }
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
        "/" + config.getUsersEndpoint() + "/" + entity.uid,
        entity.firstName + (entity.lastName ? " " + entity.lastName : "")
      ),
      ...LinkObject(
        "update",
        "/" + config.getUsersEndpoint() + "/" + entity.uid,
        "Gem",
        "PATCH"
      ),
      ...LinkObject(
        "delete",
        "/" + config.getUsersEndpoint() + "/" + entity.uid,
        "Slet",
        "DELETE"
      ),
    },
  }
}

/**
 * @param {entity} entity
 * @returns {object}
 */
function jBlog(entity) {
  return {
    ...entity.asObject(),
    _links: {
      ...LinkObject(
        "self",
        "/" + config.getBlogsEndpoint() + "/" + entity.uid,
        entity.title
      ),
      ...LinkObject(
        "slug",
        "/" + config.getBlogsEndpoint() + "/" + entity.slug,
        entity.title
      ),
      ...LinkObject(
        "update",
        "/" + config.getBlogsEndpoint() + "/" + entity.uid,
        "Gem",
        "PATCH"
      ),
      ...LinkObject(
        "delete",
        "/" + config.getBlogsEndpoint() + "/" + entity.uid,
        "Slet",
        "DELETE"
      ),
    },
  }
}

/**
 * @param {entity} entity
 * @returns {object}
 */
function jEvent(entity) {
  return {
    ...entity.asObject(),
    _links: {
      ...LinkObject(
        "self",
        "/" + config.getEventsEndpoint() + "/" + entity.uid,
        entity.title
      ),
      ...LinkObject(
        "slug",
        "/" + config.getEventsEndpoint() + "/" + entity.slug,
        entity.title
      ),
      ...LinkObject(
        "update",
        "/" + config.getEventsEndpoint() + "/" + entity.uid,
        "Gem",
        "PATCH"
      ),
      ...LinkObject(
        "delete",
        "/" + config.getEventsEndpoint() + "/" + entity.uid,
        "Slet",
        "DELETE"
      ),
    },
  }
}

/**
 * @param {entity} entity
 * @returns {object}
 */
function jImage(entity) {
  return {
    ...entity.asObject(),
    _links: {
      ...LinkObject(
        "self",
        "/" + config.getImagesEndpoint() + "/" + entity.uid,
        entity.alt
      ),
      ...LinkObject(
        "update",
        "/" + config.getImagesEndpoint() + "/" + entity.uid,
        "Gem",
        "PATCH"
      ),
      ...LinkObject(
        "delete",
        "/" + config.getImagesEndpoint() + "/" + entity.uid,
        "Slet",
        "DELETE"
      ),
    },
  }
}

/**
 *
 * @param {number} code
 * @param {string} message - Error message
 * @param {string} description
 */
function jError(code, message, description) {
  return {
    code: code,
    message: message,
    description: description,
  }
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
  const link = { href: href, title: title }

  if (method) {
    link.method = method
  }

  return { [identify]: link }
}

/**
 * @param {string} src
 * @param {string} alt
 * @returns {object} - Link object
 */
function ImageObject(src, alt) {
  return { src: src, alt: alt }
}

module.exports = {
  jMain,
  jPage,
  jUserItem,
  jBlogItem,
  jEventItem,
  jImageItem,
  jUser,
  jBlog,
  jEvent,
  jImage,
  jError,
}
