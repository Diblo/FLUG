/**
 * Footer.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */
import React from "react"
import { ContentAlignment } from "../Content/Content"

import "./Footer.css"

const Footer = React.forwardRef(
  /**
   * Small Footer Component
   *
   * This component represents a content section with default styles and behavior.
   *
   * @param {Object} props - Props for the Content component.
   * @param {React.ReactNode} [props.children] - The content or components to be displayed within the content section.
   * @returns {JSX.Element} A React component representing a content section with default styles and behavior.
   */
  ({ children }, ref) => (
    <footer id="footer" ref={ref}>
      {children ? <ContentAlignment>{children}</ContentAlignment> : "\u00a0"}
    </footer>
  )
)

export default Footer
