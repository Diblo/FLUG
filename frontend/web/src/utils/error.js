/**
 * error.js
 *
 * @file Provides custom error classes for handling different types of errors.
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */

/**
 * Custom error class representing a connection error.
 *
 * @extends {Error}
 */
export class ConnectionError extends Error {
  /**
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message)
    this.name = "Connection Error"
  }
}

/**
 * Custom error class representing a generic response error.
 *
 * @extends {Error}
 */
export class ResponseError extends Error {
  /**
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message)
    this.name = "Response Error"
  }
}

/**
 * Custom error class representing an error in a JSON response.
 *
 * @extends {Error}
 */
export class JsonResponseError extends Error {
  /**
   * @param {number} code - The error code.
   * @param {string} message - The error message.
   * @param {string} description - The error description.
   */
  constructor(code, message, description) {
    super(`${code} - ${message}. Description: ${description}`)
    this.name = "Json Response Error"
  }
}

/**
 * @extends {Error}
 */
export class JsonResponseNotFound extends Error {
  /**
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message)
    this.name = "Not Found"
  }
}
