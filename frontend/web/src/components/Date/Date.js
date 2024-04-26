/**
 * Date.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */

import React from "react"

import { DateTime } from "../../utils/datetime"

/**
 * Local Date Component
 *
 * This component displays a date in a localized format, extracted from an ISO 8601 timestamp.
 *
 * @param {Object} props
 * @param {string} props.children
 */
export const LocalDate = ({ children }) => {
  const dateTime = new DateTime(children)
  return <span title={dateTime.localDateTime()}>{dateTime.localDate()}</span>
}

/**
 * Local Date Time Component
 *
 * This component displays a date and time in a localized format, extracted from an ISO 8601 timestamp.
 *
 * @param {Object} props
 * @param {string} props.children
 */
export const LocalDateTime = ({ children }) => {
  const dateTime = new DateTime(children)
  return dateTime.localDateTime()
}
