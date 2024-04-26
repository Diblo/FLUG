/**
 * users.js
 *
 * @file Contains functions for interacting with user resources via API requests.
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */

const {
  getResources,
  getResource,
  createResource,
  updateResource,
  deleteResource,
} = require("../utils/flugService")

/**
 * Function to fetch a page with users.
 *
 * @param {Object} [params={}] - Parameters for the request.
 * @param {number} [params.page=1] - The page number.
 * @param {string} [params.initial_letter='all'] - The initial letter.
 * @param {string} [params.order='firstname'] - The order of the results.
 * @param {number} [params.max=100] - The maximum number of results.
 * @returns {Promise<Object>} A promise that resolves to the list of users.
 */
export const listUsers = async (params = {}) => {
  const response = await getResources("users", {
    page: 1,
    initial_letter: "all",
    order: "firstname",
    max: 100,
    ...(params || {}),
  })

  return response
}

/**
 * Function to fetch a single user by ID.
 *
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Object>} A promise that resolves to the user data.
 */
export const getUser = (userId) => getResource("users", `/${userId}`)

/**
 * Function to create a new user.
 *
 * @param {Record<string, any>} data - The user data.
 * @returns {Promise<Object>} A promise that resolves to the created user data.
 */
export const createUser = (data) => createResource("users", data)

/**
 * Function to update an existing user.
 *
 * @param {number} userId - The ID of the user.
 * @param {Record<string, any>} data - The updated user data.
 * @returns {Promise<Object>} A promise that resolves to the updated user data.
 */
export const updateUser = (userId, data) =>
  updateResource("users", `/${userId}`, data)

/**
 * Function to delete a user by ID.
 *
 * @param {number} userId - The ID of the user to delete.
 * @returns {Promise<void>} A promise that resolves when the user is deleted.
 */
export const deleteUser = (userId) => deleteResource("users", `/${userId}`)
