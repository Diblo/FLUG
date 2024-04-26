/**
 * useService.js
 *
 * @file Contains a custom hook for handle service query and managing the state.
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */

import { useState, useCallback, useEffect } from "react"

import { JsonResponseNotFound } from "../utils/error"

/**
 * @typedef {Object} ServiceState - Represents the state of the service query.
 * @property {boolean} init
 * @property {boolean} loading - Indicates if the request is in progress.
 * @property {Object} data - The data returned by the service.
 * @property {boolean} isServiceError
 * @property {string | null} error - The error message, if any.
 */

/**
 * Function to make service requests and manage the state.
 * @typedef {(promise: Promise<Object<string, any>> | Promise<void>) => void} Dispatch
 */

/**
 * Custom hook for making service requests and managing the state.
 * @returns {[ServiceState, Dispatch]} Tuple containing the state and the function for handle service query.
 */
const useService = () => {
  const [serviceState, setServiceState] = useState({
    init: true,
    loading: false,
    data: {},
    isServiceError: false,
    error: null,
  })

  useEffect(() => {
    if (!serviceState.isServiceError || !serviceState.error) {
      return
    }

    throw Error(serviceState.error)
  }, [serviceState])

  /** @type {Dispatch} */
  const dispatch = useCallback(async (promise) => {
    setServiceState((prev) => ({
      ...prev,
      loading: true,
      isServiceError: false,
      error: null,
    }))

    try {
      const response = await promise
      const responseData =
        typeof response === "object" ? response.data || {} : {}

      setServiceState((prev) => ({ ...prev, data: responseData }))
    } catch (error) {
      setServiceState((prev) => ({
        ...prev,
        success: false,
        isServiceError: !(error instanceof JsonResponseNotFound),
        error: error.message,
      }))
    } finally {
      setServiceState((prev) => ({ ...prev, init: false, loading: false }))
    }
  }, [])

  return [serviceState, dispatch]
}

export default useService
