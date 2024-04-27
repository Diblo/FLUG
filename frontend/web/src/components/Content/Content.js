/**
 * Content.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
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
  ({ children }, ref) => (
    <main id="content" ref={ref}>
      {children}
    </main>
  ),
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
export const ContentAlignment = ({ children, className }) => (
  <div className={`content-alignment ${className || ""}`}>{children}</div>
)

/**
 * Content Title Component
 *
 * This component represents a page content title for the content.
 *
 * @param {Object} props - Props for the component.
 * @param {React.ReactNode} [props.children]
 * @param {string} props.title - The text to be displayed as the content title.
 * @param {React.ReactNode} [props.titleElement] - Optional button element to be displayed alongside the content title.
 * @param {boolean} [props.sticky]
 * @returns {JSX.Element} A React component representing a content title for the page.
 */
export const ContentHeader = ({ children, title, titleElement, sticky }) => (
  <div id="content-header" className={sticky ? "sticky" : null}>
    <h1 id="content-title">{title}</h1>
    {titleElement || <div />}
    {children}
  </div>
)
