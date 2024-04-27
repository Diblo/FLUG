/**
 * datetime.js
 *
 * @file Utility functions for working with date and time.
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */
import { format } from "date-fns"
import * as Locales from "date-fns/locale"

/**
 * Represents a utility class for working with date and time.
 *
 * @class
 */
export class DateTime {
  local =
    Locales[window.navigator.language] ||
    Locales[window.navigator.language.substring(0, 2)] ||
    Locales.enUS

  minuteInMilliseconds = 60000
  hourInMilliseconds = 3600000
  dayInMilliseconds = 86400000

  /**
   * Creates a new DateTime instance.
   *
   * @param {string|number} [datetime] - An optional string representation of a date and time supported by JS Date.
   *                                     If the parameter is not defined, the current time will be used.
   * @constructor
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
   * Adds minutes to the current date and time.
   *
   * @param {number} minutes - The number of minutes to add.
   * @returns {DateTime} - A new DateTime instance representing the updated date and time.
   */
  addMinutes(minutes) {
    return new DateTime(
      this.parsedDateTime.getTime() + minutes * this.minuteInMilliseconds,
    )
  }

  /**
   * Adds hours to the current date and time.
   *
   * @param {number} hours - The number of hours to add.
   * @returns {DateTime} - A new DateTime instance representing the updated date and time.
   */
  addHours(hours) {
    return new DateTime(
      this.parsedDateTime.getTime() + hours * this.hourInMilliseconds,
    )
  }

  /**
   * Adds days to the current date and time.
   *
   * @param {number} days - The number of days to add.
   * @returns {DateTime} - A new DateTime instance representing the updated date and time.
   */
  addDays(days) {
    return new DateTime(
      this.parsedDateTime.getTime() + days * this.dayInMilliseconds,
    )
  }

  /**
   * Compares if the current date and time is less than the provided DateTime.
   *
   * @param {DateTime} dateTime - The DateTime to compare.
   * @returns {boolean} - `true` if the current date and time is less than the provided DateTime; otherwise, `false`.
   */
  lessThan(dateTime) {
    return this.parsedDateTime < dateTime.parsedDateTime
  }

  /**
   * Compares if the current date and time is equal to the provided DateTime.
   *
   * @param {DateTime} dateTime - The DateTime to compare.
   * @returns {boolean} - `true` if the current date and time is equal to the provided DateTime; otherwise, `false`.
   */
  equalTo(dateTime) {
    return this.parsedDateTime === dateTime.parsedDateTime
  }

  /**
   * Compares if the current date and time is greater than the provided DateTime.
   *
   * @param {DateTime} dateTime - The DateTime to compare.
   * @returns {boolean} - `true` if the current date and time is greater than the provided DateTime; otherwise, `false`.
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
