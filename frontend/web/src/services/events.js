/**
 * events.js
 *
 * @file Contains functions for interacting with event resources via API requests.
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
 * Function to fetch a page with events.
 *
 * @param {Object} [params={}] - Parameters for the request.
 * @param {number} [params.page=1] - The page number.
 * @param {string} [params.initial_letter='all'] - The initial letter.
 * @param {string} [params.order='title'] - The order of the results.
 * @param {number} [params.max=100] - The maximum number of results.
 * @returns {Promise<Object>} A promise that resolves to the list of events.
 */
export const listEvents = async (params = {}) => {
  const response = await getResources("events", {
    page: 1,
    initial_letter: "all",
    order: "title",
    max: 100,
    ...(params || {}),
  })

  return response
}

/**
 * Function to fetch a single event by ID.
 *
 * @param {number} eventId - The ID of the event.
 * @returns {Promise<Object>} A promise that resolves to the event data.
 */
export const getEvent = (eventId) => getResource("events", `/${eventId}`)

/**
 * Function to create a new event.
 *
 * @param {Record<string, any>} data - The event data.
 * @returns {Promise<Object>} A promise that resolves to the created event data.
 */
export const createEvent = (data) => createResource("events", data)

/**
 * Function to update an existing event.
 *
 * @param {number} eventId - The ID of the event.
 * @param {Record<string, any>} data - The updated event data.
 * @returns {Promise<Object>} A promise that resolves to the updated event data.
 */
export const updateEvent = (eventId, data) =>
  updateResource("events", `/${eventId}`, data)

/**
 * Function to delete an event by ID.
 *
 * @param {number} eventId - The ID of the event to delete.
 * @returns {Promise<void>} A promise that resolves when the event is deleted.
 */
export const deleteEvent = (eventId) => deleteResource("events", `/${eventId}`)
