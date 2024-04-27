/**
 * Header.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */
import React from "react"
import { ContentAlignment } from "../Content/Content"
import { InternalLink } from "../Links/Links"

import "./Header.css"

const Header = React.forwardRef(
  /**
   * Header Component
   *
   * This component represents the layout of the header.
   *
   * @param {Object} props - The properties passed to the header component.
   * @param {React.ReactNode} props.children
   * @param {string} props.title - Site title.
   * @param {string} props.target - Site URL.
   * @returns {JSX.Element} The rendered React component.
   */
  ({ children, title, target }, ref) => (
    <header id="header" ref={ref}>
      <ContentAlignment className="header-container">
        <InternalLink target={target} title={title} className="header-title">
          {title}
        </InternalLink>
        <nav className="header-nav">{children}</nav>
      </ContentAlignment>
    </header>
  ),
)

export default Header
