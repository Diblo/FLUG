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
 * File: BackgroundImage.js
 */
import React from "react"

import "./BackgroundImage.css"

/**
 * Background Image Component
 *
 * It displays a background image specified by the provided URL.
 *
 * @param {Object} props - The properties for the BackgroundImage component.
 * @param {React.ReactNode} props.children - The content to be displayed within the BackgroundImage component.
 * @param {string} props.url - The URL of the background image.
 * @returns {JSX.Element} Returns a JSX element representing the BackgroundImage component.
 */
export default function BackgroundImage({ children, url }) {
  return (
    <div
      className="bg-image"
      style={{
        backgroundImage: `url(${url})`,
      }}
    >
      {children}
    </div>
  )
}
