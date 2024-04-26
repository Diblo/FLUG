/**
 * Defines the structure of a function used to validate parameters.
 *
 * @callback ParamValidator
 * @param {string} str
 * @returns {string | number | boolean | undefined}
 */

/**
 * Defines the structure of a record containing parameter validators.
 *
 * @typedef {Record<string, ParamValidator>} ParamValidators
 */

class RouterConfig {
  /**
   * @type {ParamValidators}
   * @static
   */
  static pathParam = {}

  /**
   * @type {ParamValidators}
   * @static
   */
  static searchParam = {}

  /**
   * Sets the path parameter configuration.
   *
   * @param {string} param - The parameter key.
   * @param {ParamValidator} validator - The validator function.
   * @static
   */
  static addPathParam(param, validator) {
    this.pathParam[param] = validator
  }

  /**
   * Sets the search parameter configuration.
   *
   * @param {string} param - The parameter key.
   * @param {ParamValidator} validator - The validator function.
   * @static
   */
  static addSearchParam(param, validator) {
    this.searchParam[param] = validator
  }

  /**
   * Retrieves the validator function for the specified path parameter.
   *
   * @param {string} param - The parameter key.
   * @returns {ParamValidator} The validator function for the specified path parameter.
   * @static
   */
  static getPathValidator(param) {
    return this.pathParam[param]
  }

  /**
   * Retrieves the validator function for the specified search parameter.
   *
   * @param {string} param - The parameter key.
   * @returns {ParamValidator} The validator function for the specified search parameter.
   * @static
   */
  static getSearchValidator(param) {
    return this.searchParam[param]
  }
}

export default RouterConfig
