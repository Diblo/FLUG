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
 * File: datetime.js
 */
import { format } from "date-fns"
import * as Locales from "date-fns/locale"

/**
 * Represents a utility class for working with date and time.
 */
export class DateTime {
  local =
    Locales[window.navigator.language] ??
    Locales[window.navigator.language.substring(0, 2)] ??
    Locales.enUS

  minuteInMilliseconds = 60000
  hourInMilliseconds = 3600000
  dayInMilliseconds = 86400000

  /**
   * Creates a new DateTime instance.
   *
   * @param {string|number} [datetime] - An optional string representation of a date and time supported by JS Date.
   *                                     If the parameter is not defined, the current time will be used.
   */
  constructor(datetime) {
    /**
     * @type {Date}
     * @private
     */
    this.parsedDateTime = datetime ? new Date(datetime) : new Date()
  }

  /**
   * Gets the local date in local format.
   *
   * @returns {string} - The locally formatted date.
   */
  localDate() {
    return format(this.parsedDateTime, "PP", { locale: this.local })
  }

  /**
   * Gets the local time in local format.
   *
   * @param {boolean} [includeSec=false] - Whether to include seconds in the formatted time.
   * @returns {string} - The locally formatted time.
   */
  localTime(includeSec = false) {
    if (includeSec) {
      return format(this.parsedDateTime, "pp", { locale: this.local })
    }
    return format(this.parsedDateTime, "p", { locale: this.local })
  }

  /**
   * Gets the local date and time in local format.
   *
   * @param {boolean} [includeSec] - Whether to include seconds in the formatted time.
   * @returns {string} - The locally formatted date and time.
   */
  localDateTime(includeSec = false) {
    if (includeSec) {
      return format(this.parsedDateTime, "PPpp", { locale: this.local })
    }
    return format(this.parsedDateTime, "PPp", { locale: this.local })
  }

  /**
   * @param {number} minutes
   * @returns {DateTime}
   */
  addMinutes(minutes) {
    return new DateTime(
      this.parsedDateTime.getTime() + minutes * this.minuteInMilliseconds
    )
  }

  /**
   * @param {number} hours
   * @returns {DateTime}
   */
  addHours(hours) {
    return new DateTime(
      this.parsedDateTime.getTime() + hours * this.hourInMilliseconds
    )
  }

  /**
   * @param {number} days
   * @returns {DateTime}
   */
  addDays(days) {
    return new DateTime(
      this.parsedDateTime.getTime() + days * this.dayInMilliseconds
    )
  }

  /**
   * @param {DateTime} dateTime
   * @returns {boolean}
   */
  lessThan(dateTime) {
    return this.parsedDateTime < dateTime.parsedDateTime
  }

  /**
   * @param {DateTime} dateTime
   * @returns {boolean}
   */
  equalTo(dateTime) {
    return this.parsedDateTime === dateTime.parsedDateTime
  }

  /**
   * @param {DateTime} dateTime
   * @returns {boolean}
   */
  greaterThan(dateTime) {
    return this.parsedDateTime > dateTime.parsedDateTime
  }

  /**
   * Gets the date and time formatted for an input field in the format "yyyy-MM-ddTHH:mm".
   *
   * @returns {string} - The formatted date and time.
   */
  dateTimeForInputField() {
    return format(this.parsedDateTime, "yyyy-MM-dd'T'HH:mm")
  }

  /**
   * Gets the ISO 8601 representation of the date and time.
   *
   * @returns {string} - The ISO 8601 representation.
   */
  iso8601() {
    return this.parsedDateTime.toISOString()
  }
}
