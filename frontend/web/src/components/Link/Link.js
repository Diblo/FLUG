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
 * File: Link.js
 */
import React from "react"

import "./Link.css"

/**
 * @typedef {Object} Props
 * @property {string} children - URL or Link text.
 * @property {string} [url] - URL.
 * @property {string} [className] - CSS class or classes for the link.
 */

/**
 * Higher-order component.
 *
 * @param {Object} [partialProps]
 * @param {string} [partialProps.className] - CSS class or classes for the link.
 * @param {Object} [partialProps.attributes] - Additional HTML attributes for the link.
 * @returns {React.ComponentType<Props>} A wrapped element component.
 */
const LinkHOC = (partialProps) => {
  const { className: partialClassName, attributes = {} } = partialProps || {}

  /**
   * Renders the partially applied component with combined props.
   *
   * @param {Props} props - The remaining props to be applied.
   * @returns {JSX.Element} The rendered React component.
   */
  return ({ children, url, className: additionalClassName }) => {
    const classNames =
      [partialClassName, additionalClassName]
        .filter((value) => !!value)
        .join(" ") || null

    return (
      <a
        {...attributes}
        href={url || children}
        className={classNames}
        title={children}>
        {children}
      </a>
    )
  }
}

/**
 * Menu link component
 *
 * @type {React.ComponentType<Props>}
 */
export const Link = LinkHOC()

/**
 * Menu link component
 *
 * @type {React.ComponentType<Props>}
 */
export const MenuLink = LinkHOC({ className: "menu-link" })

/**
 * Internal link component
 *
 * @type {React.ComponentType<Props>}
 */
export const InternalLink = LinkHOC({ className: "internal-link" })

/**
 * External link component
 *
 * @type {React.ComponentType<Props>}
 */
export const ExternalLink = LinkHOC({
  className: "external-link",
  attributes: { target: "_blank" },
})

/**
 * Opens a mailto link.
 *
 * @param {string} text - The encoded email address.
 * @returns {void}
 */
const openMailToLink = (text) => {
  window.open("mailto:" + atob(text), "_blank")
}

/**
 * Mail to link component
 *
 * This component renders an email address with a `mailto` link that opens the user's email client.
 *
 * @param {Object} props - Props for the MailToLink component.
 * @param {string} props.children - The email address to be displayed and linked.
 * @returns {JSX.Element} A React component representing a mailto link.
 */
export function MailToLink({ children }) {
  return (
    <a onClick={() => openMailToLink(btoa(children))} className="mail-to-link">
      {children.replace(/@/g, "(at)")}
    </a>
  )
}

// TODO: https://www.npmjs.com/package/add-to-calendar-button
