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
 * File: hooks.js
 */
import { useEffect, useState } from "react"
import { useToast } from "react-native-toast-notifications"
import { useParams as useRRDParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

/**
 * Get the 'uid' parameter from the URL and parse it as an integer.
 * @returns {number | undefined}
 */
export const useUIDParam = () => {
  const uid = parseInt(useRRDParams().uid, 10)
  if (!Number.isInteger(Number(uid)) || uid < 0) {
    return undefined
  }

  return uid
}

/**
 * Enum representing different...
 *
 * @readonly
 * @enum {string}
 */
export const NotificationType = {
  info: "normal",
  success: "success",
  warning: "warning",
  error: "danger",
}

/**
 * @typedef {string} id - Unique identifier type.
 */

/**
 * @typedef {Object} NotificationFunctions - Notification functions.
 * @property {(message: string) => id} info - Display an informational notification.
 * @property {(message: string) => id} success - Display a success notification.
 * @property {(message: string) => id} warning - Display a warning notification.
 * @property {(message: string) => id} error - Display an error notification.
 * @property {(message: string, type: NotificationType) => id} show - Display a notification with a specified type.
 * @property {(id: id, message: string, type?: NotificationType) => void} update - Update an existing notification.
 * @property {(id: id) => void} hide - Hide a specific notification.
 * @property {() => void} hideAll - Hide all notifications.
 */

/**
 * @returns {NotificationFunctions}
 */
export const useNotification = () => {
  const toast = useToast()
  const [queueCallbacks, setQueueCallbacks] = useState([])

  useEffect(() => {
    // Trigger all the callbacks once the toast is ready
    if (isToastReady() && queueCallbacks.length > 0) {
      queueCallbacks.forEach((callback) => {
        callback(toast)
      })
      setQueueCallbacks([])
    }
  }, [toast, queueCallbacks])

  /**
   * Display an informational notification.
   * @param {string} message - The notification message.
   * @returns {id} The generated ID for the message.
   */
  const info = (message) => {
    const id = uuidv4()
    onToastReady((toast) =>
      toast.show(message, { id, type: NotificationType.info })
    )
    return id
  }

  /**
   * Display a success notification.
   * @param {string} message - The notification message.
   * @returns {id} The generated ID for the message.
   */
  const success = (message) => {
    const id = uuidv4()
    onToastReady((toast) =>
      toast.show(message, { id, type: NotificationType.success })
    )
    return id
  }

  /**
   * Display a warning notification.
   * @param {string} message - The notification message.
   * @returns {id} The generated ID for the message.
   */
  const warning = (message) => {
    const id = uuidv4()
    onToastReady((toast) =>
      toast.show(message, { id, type: NotificationType.warning })
    )
    return id
  }

  /**
   * Display an error notification.
   * @param {string} message - The notification message.
   * @returns {id} The generated ID for the message.
   */
  const error = (message) => {
    const id = uuidv4()
    onToastReady((toast) =>
      toast.show(message, { id, type: NotificationType.error })
    )
    return id
  }

  /**
   * Display a notification with a specified type.
   * @param {string} message - The notification message.
   * @param {NotificationType} type - The type of notification.
   * @returns {id} The generated ID for the message.
   */
  const show = (message, type) => {
    const id = uuidv4()
    onToastReady((toast) => toast.show(message, { id, type }))
    return id
  }

  /**
   * Update an existing notification.
   * @param {id} id - The ID of the notification to update.
   * @param {string} message - The updated notification message.
   * @param {NotificationType} [type] - The updated type of notification.
   */
  const update = (id, message, type) => {
    onToastReady((toast) => toast.update(id, message, (type && { type }) || {}))
  }

  /**
   * Hide a specific notification.
   * @param {id} id - The ID of the notification to hide.
   */
  const hide = (id) => {
    onToastReady((toast) => toast.hide(id))
  }

  /**
   * Hide all notifications.
   */
  const hideAll = () => {
    onToastReady((toast) => toast.hideAll())
  }

  /**
   * Register a callback to be executed once the toast is ready.
   * @param {(toast: Object) => void} callback - The callback function to be executed.
   */
  const onToastReady = (callback) => {
    if (isToastReady()) {
      // If toast is already ready, trigger the callback immediately
      callback(toast)
    } else {
      // If toast is not ready, add the callback to the queue
      setQueueCallbacks((prevCallbacks) => [...prevCallbacks, callback])
    }
  }

  const isToastReady = () => {
    return typeof toast.show === "function"
  }

  return { info, success, warning, error, show, update, hide, hideAll }
}
