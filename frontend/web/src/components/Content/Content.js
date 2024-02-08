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
 * File: Content.js
 */
import React from "react"

import "./Content.css"

const Content = React.forwardRef(
  /**
   * Content Component
   *
   * This component represents a content section with default styles and behavior.
   *
   * @param {Object} props - Props for the Content component.
   * @param {React.ReactNode} props.children - The content or components to be displayed within the content section.
   * @returns {JSX.Element} A React component representing a content section with default styles and behavior.
   */
  (props, ref) => {
    return (
      <main id="content" ref={ref}>
        {props.children}
      </main>
    )
  }
)

export default Content

/**
 * Content Alignment Component
 *
 * This component represents a page content title for the content.
 *
 * @param {Object} props - Props for the component.
 * @param {React.ReactNode} props.children - The content or components to be displayed within the content section.
 * @param {string} [props.className] - Additional CSS class or classes for the content section.
 * @returns {JSX.Element} A React component representing a content title for the page.
 */
export const ContentAlignment = ({ children, className }) => {
  return (
    <div className={`content-alignment ${className || ""}`}>{children}</div>
  )
}

/**
 * Content Title Component
 *
 * This component represents a page content title for the content.
 *
 * @param {Object} props - Props for the component.
 * @param {string} props.children - The text to be displayed as the content title.
 * @param {React.ReactNode} [props.button] - Optional button element to be displayed alongside the content title.
 * @param {boolean} [props.sticky]
 * @returns {JSX.Element} A React component representing a content title for the page.
 */
export const ContentTitle = ({ children, button, sticky }) => {
  return (
    <div id="content-title" className={sticky ? "sticky" : null}>
      <h1>{children}</h1>
      {button}
    </div>
  )
}
