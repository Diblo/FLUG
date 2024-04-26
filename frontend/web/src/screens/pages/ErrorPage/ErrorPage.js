/**
 * ErrorPage.js
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

import "./ErrorPage.css"

/**
 *
 * @param {Object} props
 * @param {string} [props.header]
 * @param {React.ReactNode} [props.message]
 * @returns
 */
const ErrorPage = ({ header, message }) => (
  <BackgroundImage url={bgImage}>
    <ContentAlignment className="error">
      <ContentHeader title={header ? header : text("pages.error.header")} />
      <p>{message ? message : text("pages.error.message")}</p>
    </ContentAlignment>
  </BackgroundImage>
)

export default ErrorPage
