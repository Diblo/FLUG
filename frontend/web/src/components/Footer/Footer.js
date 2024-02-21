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
 * File: Footer.js
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
  (props, ref) => {
    return (
      <footer id="footer" ref={ref}>
        {(props.children && (
          <ContentAlignment>{props.children}</ContentAlignment>
        )) ||
          "\u00a0"}
      </footer>
    )
  }
)

export default Footer