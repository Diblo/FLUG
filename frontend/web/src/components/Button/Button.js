/**
 * Button.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */
import React from "react"

import "./Button.css"

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children - The content or components rendered within the button.
 * @property {() => void} [onPress] - The function to be called when the button is clicked.
 * @property {("button" | "submit" | "reset")} [type]
 * @property {boolean} [disabled]
 * @property {string} [className]
 */

/**
 * Higher-order component.
 *
 * @param {object} [partialProps] - Partially applied props for the button element.
 * @param {('default'|'green'|'red')} [partialProps.buttonStyle] - The style of the button, e.g., "add", "delete", or "default".
 * @returns {React.ComponentType<Props>} A wrapped element component.
 */
const ButtonHoc = (partialProps) => {
  const { buttonStyle = "default" } = partialProps || {}

  /**
   * Renders the partially applied component with combined props.
   *
   * @param {Props} props - The remaining props to be applied.
   * @returns {JSX.Element} The rendered React component.
   */
  return ({ children, onPress, type, disabled, className }) => {
    return (
      <button
        type={type || "button"}
        className={`button ${buttonStyle} ${className || ""}`}
        onClick={onPress}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }
}

/**
 * @type {React.ComponentType<Props>}
 */
export const Button = ButtonHoc()

/**
 * @type {React.ComponentType<Props>}
 */
export const GreenButton = ButtonHoc({ buttonStyle: "green" })

/**
 * @type {React.ComponentType<Props>}
 */
export const RedButton = ButtonHoc({
  buttonStyle: "red",
})

/**
 * @param {Object} probs
 * @param {React.ReactNode} probs.children
 * @param {string} [probs.className]
 * @returns {JSX.Element}
 */
export const ButtonBar = ({ children, className }) => (
  <div className={`button-bar ${className || ""}`}>{children}</div>
)
