/**
 * Link.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */
import React from "react"

import { text } from "../../utils/i18n"

import { ReactComponent as AtSign } from "../../assets/images/at.svg"

/**
 * Menu link component
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.target
 * @param {string} props.title
 * @param {string} [props.className]
 */
export const MenuLink = ({ children, target, title, className }) => (
  <a href={target} title={title} className={`menu-link ${className || ""}`}>
    {children}
  </a>
)

/**
 * Internal link component
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.target
 * @param {string} props.title
 * @param {string} [props.className]
 */
export const InternalLink = ({ children, target, title, className }) => (
  <a href={target} title={title} className={`internal-link ${className || ""}`}>
    {children}
  </a>
)

/**
 * External link component
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.url
 * @param {string} props.title
 * @param {string} [props.className]
 */
export const ExternalLink = ({ children, url, title, className }) => (
  <a
    href={url}
    title={title}
    className={`external-link ${className || ""}`}
    target="_blank"
    rel="noreferrer"
  >
    {children}
  </a>
)

/**
 * Mail to link component
 *
 * This component renders an email address with a `mailto` link that opens the user's email client.
 *
 * @param {Object} props
 * @param {string} props.children
 * @param {boolean} [props.disableBotSecure]
 * @param {string} [props.className]
 */
export const MailTo = ({ children, disableBotSecure, className }) => {
  const emailParts = children.split("@")
  const encodedEmail = btoa(children)

  const handleClick = () => {
    window.open(`mailto:${atob(encodedEmail)}`, "_blank")
  }

  return (
    <a
      href={disableBotSecure ? `mailto:${children}` : "#"}
      onClick={handleClick}
      title={text("links.email")}
      className={`mail-link ${className || ""}`}
      target="_blank"
      rel="noreferrer"
    >
      {disableBotSecure ? (
        children
      ) : (
        <>
          {emailParts[0]}
          <AtSign />
          {emailParts[1]}
        </>
      )}
    </a>
  )
}

// TODO: https://www.npmjs.com/package/add-to-calendar-button
