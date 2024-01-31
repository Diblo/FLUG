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
 * File: Button.js
 */
import React from "react"

import "./Button.css"

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children - The content or components rendered within the button.
 * @property {() => void} [onPress] - The function to be called when the button is clicked.
 */

/**
 * Higher-order component.
 *
 * @param {object} [partialProps] - Partially applied props for the button element.
 * @param {('default'|'green'|'red')} [partialProps.buttonStyle] - The style of the button, e.g., "add", "delete", or "default".
 * @returns {React.ComponentType<Props>} A wrapped element component.
 */
const ButtonHOC = (partialProps) => {
  const { buttonStyle = "default" } = partialProps || {}

  /**
   * Renders the partially applied component with combined props.
   *
   * @param {Props} props - The remaining props to be applied.
   * @returns {JSX.Element} The rendered React component.
   */
  return ({ children, onPress }) => {
    return (
      <button
        type="button"
        className={`button ${buttonStyle}`}
        onClick={onPress}
      >
        {children}
      </button>
    )
  }
}

/**
 * @type {React.ComponentType<Props>}
 */
export const Button = ButtonHOC()

/**
 * @type {React.ComponentType<Props>}
 */
export const GreenButton = ButtonHOC({ buttonStyle: "green" })

/**
 * @type {React.ComponentType<Props>}
 */
export const RedButton = ButtonHOC({
  buttonStyle: "red",
})
