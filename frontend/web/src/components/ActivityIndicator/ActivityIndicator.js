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
 * File: ActivityIndicator.js
 */

import React from "react"

import "./ActivityIndicator.css"

/**
 * @typedef {Object} Props
 * @property {boolean} [small = false]
 */

/**
 * Higher-order component.
 *
 * @param {Object} partialProps
 * @param {boolean} partialProps.showMessage
 * @returns {React.ComponentType<Props>} A wrapped element component.
 */
const ActivityIndicatorHOC = (partialProps) => {
  /**
   * @param {Props} props - The remaining props to be applied.
   * @returns {JSX.Element} The rendered React component.
   */
  return ({ small = false }) => {
    return (
      <div className="activity-indicator">
        <div
          className={`activity-indicator-spinner activity-indicator-${
            (small && "small") || "big"
          }`}></div>
        {partialProps.showMessage && <div>Loading...</div>}
      </div>
    )
  }
}

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
export const ActivityIndicator = ActivityIndicatorHOC({ showMessage: false })

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
export const ActivityIndicatorWithMessage = ActivityIndicatorHOC({
  showMessage: true,
})
