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
function jPage(items, totalResults, curPage, totalPages) {
  const firstPage = 1

  return {
    items: items,
    results: items.length,
    totalResults: totalResults,
    pagination: {
      first: firstPage,
      prev: Math.max(curPage - 1, firstPage),
      current: curPage,
      next: Math.min(curPage + 1, totalPages),
      last: totalPages,
    },
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
  }
}

/**
 * @param {entity} entity
 * @returns {object}
 */
function jUser(entity) {
  return {
    ...entity.asObject(),
  }
}

/**
 * @param {entity} entity
 * @returns {object}
 */
function jBlog(entity) {
  return {
    ...entity.asObject(),
  }
}

/**
 * @param {entity} entity
 * @returns {object}
 */
function jEvent(entity) {
  return {
    ...entity.asObject(),
  }
}

/**
 * @param {entity} entity
 * @returns {object}
 */
function jImage(entity) {
  return {
    ...entity.asObject(),
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
