/**
 * blogs.js
 *
 * @file Contains functions for interacting with blog resources via API requests.
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
 * Function to fetch a page with blogs.
 *
 * @param {Object} [params={}] - Parameters for the request.
 * @param {number} [params.page=1] - The page number.
 * @param {string} [params.initial_letter='all'] - The initial letter.
 * @param {string} [params.order='title'] - The order of the results.
 * @param {number} [params.max=100] - The maximum number of results.
 * @returns {Promise<Object>} A promise that resolves to the list of blogs.
 */
export const listBlogs = async (params = {}) => {
  const response = await getResources("blogs", {
    page: 1,
    initial_letter: "all",
    order: "title",
    max: 100,
    ...(params || {}),
  })

  return response
}

/**
 * Function to fetch a single blog by ID.
 *
 * @param {number} blogId - The ID of the blog.
 * @returns {Promise<Object>} A promise that resolves to the blog data.
 */
export const getBlog = (blogId) => getResource("blogs", `/${blogId}`)

/**
 * Function to create a new blog.
 *
 * @param {Record<string, any>} data - The blog data.
 * @returns {Promise<Object>} A promise that resolves to the created blog data.
 */
export const createBlog = (data) => createResource("blogs", data)

/**
 * Function to update an existing blog.
 *
 * @param {number} blogId - The ID of the blog.
 * @param {Record<string, any>} data - The updated blog data.
 * @returns {Promise<Object>} A promise that resolves to the updated blog data.
 */
export const updateBlog = (blogId, data) =>
  updateResource("blogs", `/${blogId}`, data)

/**
 * Function to delete a blog by ID.
 *
 * @param {number} blogId - The ID of the blog to delete.
 * @returns {Promise<void>} A promise that resolves when the blog is deleted.
 */
export const deleteBlog = (blogId) => deleteResource("blogs", `/${blogId}`)
