/**
 * Copyright (c) 2024 Fyns Linux User Group
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * File: error.js
 */
/**
 * Custom error class representing a connection error.
 *
 * @class ConnectionError
 * @extends {Error}
 * @throws {ConnectionError}
 * @example
 * throw new ConnectionError('Unable to establish a connection to the server.');
 */
export class ConnectionError extends Error {
  /**
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message)
    this.name = "Connection Error"

    // Ensure proper stack trace in Error instances
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConnectionError)
    }
  }
}

/**
 * Custom error class representing a generic response error.
 *
 * @class ResponseError
 * @extends {Error}
 * @throws {ResponseError}
 * @example
 * throw new ResponseError('Unexpected response from the server.');
 */
export class ResponseError extends Error {
  /**
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message)
    this.name = "Response Error"

    // Ensure proper stack trace in Error instances
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ResponseError)
    }
  }
}

/**
 * Custom error class representing an error in a JSON response.
 *
 * @class JsonResponseError
 * @extends {Error}
 * @throws {JsonResponseError}
 * @example
 * throw new JsonResponseError('404', 'Not Found', 'The requested resource could not be found.');
 */
export class JsonResponseError extends Error {
  /**
   * @param {number} code - The error code.
   * @param {string} message - The error message.
   * @param {string} description - The error description.
   */
  constructor(code, message, description) {
    super(`${code} - ${message} Description: ${description}`)
    this.name = "JSON Response Error"

    // Ensure proper stack trace in Error instances
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, JsonResponseError)
    }
  }
}
