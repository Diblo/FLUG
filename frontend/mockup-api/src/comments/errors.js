class BadRequest extends Error {
  constructor(description) {
    super("The request cannot be fulfilled due to bad syntax.");
    this.code = 400;
    this.description = description;
  }
}

class Unauthorized extends Error {
  constructor(description) {
    super("Access is denied.");
    this.code = 401;
    this.description = description;
  }
}

class Forbidden extends Error {
  constructor(description) {
    super("The server refuses to approve the request.");
    this.code = 403;
    this.description = description;
  }
}

class NotFound extends Error {
  constructor(description) {
    super("The requested resource was not found.");
    this.code = 404;
    this.description = description;
  }
}

class ServerError extends Error {
  constructor(description) {
    super("The server encountered an unexpected condition.");
    this.code = 500;
    this.description = description;
  }
}

class ServiceUnavailable extends Error {
  constructor(description) {
    super("The server is currently unable to handle the request.");
    this.code = 503;
    this.description = description;
  }
}

module.exports = {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  ServerError,
};
