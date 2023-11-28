class ResourceNotFound extends Error {
  constructor(additional_info) {
    super("Resource not found");
    this.code = 404;
    this.description = "The requested resource does not exist";
    this.additional_info = additional_info;
  }
}

class InputError extends Error {
  constructor(validation_errors) {
    super("Resource not found");
    this.code = 400;
    this.description = "Input validation failed";
    this.validation_errors = validation_errors;
  }
}

module.exports = { ResourceNotFound, InputError };
