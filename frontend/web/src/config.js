/**
 * config.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/} More information about the GNU Affero General Public License v3.0
 * @author Fyns Linux User Group
 */

/**
 * @typedef {import("./modules/router").ParamValidators} ParamValidators
 */

/**
 * Regular expression pattern for validating SLUGs (URL-friendly strings).
 *
 * @type {RegExp}
 * @constant
 */
const slugRegex = /^(?!-)[a-z0-9-]+(?<!-)$/

/**
 * @type {string}
 */
export const API_ORIGIN = "http://localhost:2000"

/**
 * @type {string}
 */
export const API_PATH = ""

/**
 * @type {ParamValidators}
 */
export const PATH_PARAMS = {
  uid: (str) => {
    const uid = parseInt(str, 10)
    if (Number.isInteger(uid) && uid >= 0) {
      return uid
    }
    return undefined
  },
  slug: (str) => {
    if (slugRegex.test(str)) {
      return str
    }
    return undefined
  },
}
