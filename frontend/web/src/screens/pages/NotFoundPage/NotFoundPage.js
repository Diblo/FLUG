/**
 * NotFoundPage.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */
import React from "react"

import { text } from "../../../utils/i18n"

import BackgroundImage from "../../../components/BackgroundImage/BackgroundImage"
import {
  ContentAlignment,
  ContentHeader,
} from "../../../components/Content/Content"

import bgImage from "../../../assets/images/bg_error2.jpg"

import "./NotFoundPage.css"

/**
 *
 * @param {Object} props
 * @param {string} [props.header]
 * @param {React.ReactNode} [props.message]
 * @returns
 */
const NotFoundPage = ({ header, message }) => (
  <BackgroundImage url={bgImage}>
    <ContentAlignment className="not-found">
      <ContentHeader title={header ? header : text("pages.not_found.header")} />
      <p>{message ? message : text("pages.not_found.message")}</p>
    </ContentAlignment>
  </BackgroundImage>
)

export default NotFoundPage
