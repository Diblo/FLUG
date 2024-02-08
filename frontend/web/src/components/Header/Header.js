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
 * File: Header.js
 */
import React from "react"
import { ContentAlignment } from "../Content/Content"
import { Link } from "../Link/Link"

import "./Header.css"

const Header = React.forwardRef(
  /**
   * Header Component
   *
   * This component represents the layout of the header.
   *
   * @param {Object} props - The properties passed to the header component.
   * @param {React.ReactNode} props.children - MenuLink component(s).
   * @param {string} props.siteTitle - Site title.
   * @param {string} props.siteUrl - Site URL.
   * @returns {JSX.Element} The rendered React component.
   */
  (props, ref) => {
    const { children, siteTitle, siteUrl } = props

    return (
      <header id="header" ref={ref}>
        <ContentAlignment className="header-container">
          <Link url={siteUrl} className="header-title">
            {siteTitle}
          </Link>
          <nav className="header-nav">{children}</nav>
        </ContentAlignment>
      </header>
    )
  }
)

export default Header
