/**
 * BackgroundImage.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
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
const BackgroundImage = ({ children, url }) => (
  <div
    className="bg-image"
    style={{
      backgroundImage: `url(${url})`,
    }}
  >
    {children}
  </div>
)

export default BackgroundImage
