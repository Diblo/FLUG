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
 * File: api.js
 */
import { API_ORIGIN, API_PATH } from "../data/api"
import { ConnectionError, JsonResponseError, ResponseError } from "./error"

/**
 * @typedef {Object<string, any>} ParamObject
 */

/**
 * Convert an object into a query string.
 *
 * @param {ParamObject} params - The object to convert into a query string.
 * @returns {string} The generated query string.
 * @example
 * toQueryString({
 *   page: 1,
 *   limit: 10,
 *   search: 'keyword',
 * })
 * // Output: 'page=1&limit=10&search=keyword'
 */
const toQueryString = (params) => {
  const encodePairs = []
  for (const paramName of Object.keys(params)) {
    encodePairs.push(
      `${encodeURIComponent(paramName)}=${encodeURIComponent(
        params[paramName]
      )}`
    )
  }
  return encodePairs.join("&")
}

/**
 * Build a URL based on the specified components.
 *
 * @param {Object} config - Configuration object for building the URL.
 * @param {string} [config.origin] - The origin consists of:
 * [scheme "://"] or ["//"] followed by [userinfo "@"] host [":" port]
 * @param {string} [config.path] - The path part of the URL.
 * @param {ParamObject} [config.query={}] - The query parameters as an object.
 * @param {string} [config.fragment] - The fragment identifier.
 * @returns {string} The constructed URL.
 * @example
 * buildURL({
 *   origin: 'https://example.com:8080',
 *   path: '/path/to/resource',
 *   query: { param1: 'value1', param2: 'value2' },
 *   fragment: 'section1',
 * })
 * // Output: 'https://example.com:8080/path/to/resource?param1=value1&param2=value2#section1'
 */
const buildURL = (config) => {
  const { origin, path, query = {}, fragment } = config

  let url = origin ?? ""

  if (path) {
    url += path
  }

  if (Object.keys(query).length > 0) {
    url += `?${toQueryString(query)}`
  }

  if (fragment) {
    url += `#${fragment}`
  }

  return url
}

/**
 * Build a JSON-formatted request body.
 *
 * @param {Object<string, any>} data - The data to be included in the request body.
 * @returns {string} A JSON-formatted string.
 */
const buildJsonBody = (data) => {
  return JSON.stringify(data)
}

/**
 * Handles the HTTP response and throws errors if necessary.
 *
 * @param {Response} response - The Fetch API response object.
 * @returns {Promise<Object>} A promise that resolves to the parsed JSON data.
 * @throws {ResponseError} Thrown when the HTTP response status is not successful.
 * @throws {ResponseError} Thrown when there is an issue parsing the JSON response.
 */
const handleHTTTPResponse = async (response) => {
  /**
   * Check if the response status is within the expected range.
   */
  if (![200, 201, 204, 400, 401, 403, 404].includes(response.status)) {
    if (response.status === 0) {
      throw new ConnectionError(response.statusText)
    }
    throw new ResponseError(response.statusText)
  }

  try {
    return await response.json()
  } catch (error) {
    throw new ResponseError(`Error parsing JSON: ${error.message}`)
  }
}

/**
 * @typedef {Object} ErrorObject - Object representing an error.
 * @property {number} code - The error code.
 * @property {string} message - The error message.
 * @property {string} description - Additional details about the error.
 */

/**
 * Handles the parsed JSON data and throws an error if the JSON data indicates a failure.
 *
 * @param {Object} json - The parsed JSON data.
 * @param {boolean} json.success - Indicates whether the request was successful.
 * @param {Object} [json.data] - The data object from a successful response.
 * @param {ErrorObject} [json.error] - Information about the error if the response indicates failure.
 * @param {string} [json.message] - An optional additional message from a successful response.
 * @returns {Object} The parsed JSON data.
 * @throws {JsonResponseError} Thrown when the JSON data indicates an error.
 */
const handleJsonData = (json) => {
  /**
   * Check if the data indicates an error.
   */
  if (!json.success) {
    throw new JsonResponseError(
      json.error.code,
      json.error.message,
      json.error.description
    )
  }

  return json || {}
}

/**
 * Fetches data from an API service.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {Object} [init={}] - Additional options for the `fetch` function.
 * @param {string} [init.method="GET"] - The HTTP request method.
 * @param {string} [init.body] - The request body to include in the fetch.
 * @returns {Promise<Response>} A Promise that resolves to the fetched data.
 * @throws {ConnectionError} Thrown when there is a connection error.
 * @example
 * const url = 'https://api.example.com/data'
 * fetchJson(url)
 *   .then((data) => console.log(data))
 *   .catch((error) => console.error(error))
 */
const fetchAPI = async (url, init = {}) => {
  const newInit = {
    method: init.method ?? "GET",
    headers: {
      Accept: "application/json",
    },
  }

  if (init.body) {
    newInit.headers["Content-Type"] = "application/json"
    newInit.body = init.body
  }

  let response = null
  try {
    response = await fetch(url, newInit)
  } catch (error) {
    throw new ConnectionError(error.message)
  }

  const json = await handleHTTTPResponse(response)
  return handleJsonData(json)
}

/**
 * Get a list of resources.
 *
 * @param {string} endPoint - The API endpoint for reading an item.
 * @param {ParamObject} [query={}] - Additional parameters for the API request.
 * @returns {Promise<Object>} A Promise that resolves with the data fetched from the API.
 * @example
 * getResources("users")
 *   .then((data) => console.log(data))
 *   .catch((error) => console.error(error))
 */
export const getResources = async (endPoint, query) => {
  const url = buildURL({
    origin: API_ORIGIN,
    path: `${API_PATH}/${endPoint}`,
    query: query || {},
  })

  const json = await fetchAPI(url)
  return json
}

/**
 * Read resource.
 *
 * @param {string} endPoint - The API endpoint for reading an item.
 * @param {string} path - The absolute path from the endpoint.
 * @returns {Promise<Object>} A Promise that resolves with the data fetched from the API.
 * @example
 * getResource("users", "/123")
 *   .then((data) => console.log(data))
 *   .catch((error) => console.error(error))
 */
export const getResource = async (endPoint, path) => {
  const url = buildURL({
    origin: API_ORIGIN,
    path: `${API_PATH}/${endPoint}${path}`,
  })

  const json = await fetchAPI(url)
  return json
}

/**
 * Create a new resource.
 *
 * @param {string} endPoint - The API endpoint for creating an item.
 * @param {Object} userData - The data for the new item.
 * @returns {Promise<Object>} A Promise that resolves with the data fetched from the API.
 * @example
 * const userData = { name: "bar", email: "bar@foo.tld" }
 * createResource("users", userData)
 *   .then((data) => console.log(data))
 *   .catch((error) => console.error(error))
 */
export const createResource = async (endPoint, userData) => {
  const url = buildURL({
    origin: API_ORIGIN,
    path: `${API_PATH}/${endPoint}`,
  })

  const init = {
    method: "POST",
    body: buildJsonBody(userData),
  }

  const json = await fetchAPI(url, init)
  return json
}

/**
 * Update an existing resource.
 *
 * @param {string} endPoint - The API endpoint for updating an item.
 * @param {string} path - The absolute path from the endpoint.
 * @param {Object} userData - The updated data for the item.
 * @returns {Promise<Object>} A Promise that resolves with the data fetched from the API.
 * @example
 * const userData = { name: "bar", email: "bar@foo.tld" }
 * updateResource("users", "/123", userData)
 *   .then((data) => console.log(data))
 *   .catch((error) => console.error(error))
 */
export const updateResource = async (endPoint, path, userData) => {
  const url = buildURL({
    origin: API_ORIGIN,
    path: `${API_PATH}/${endPoint}${path}`,
  })

  const init = {
    method: "PATCH",
    body: buildJsonBody(userData),
  }

  const json = await fetchAPI(url, init)
  return json
}

/**
 * Delete a resource.
 *
 * @param {string} endPoint - The API endpoint for deleting an item.
 * @param {string} path - The absolute path from the endpoint.
 * @returns {Promise<Object>} A Promise that resolves with the data fetched from the API.
 * @example
 * deleteResource("users", "/123")
 *   .catch((error) => console.error(error))
 */
export const deleteResource = async (endPoint, path) => {
  const url = buildURL({
    origin: API_ORIGIN,
    path: `${API_PATH}/${endPoint}${path}`,
  })

  const init = {
    method: "DELETE",
  }

  const json = await fetchAPI(url, init)
  return json
}
