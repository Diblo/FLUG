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
 * File: NotFoundPage.js
 */
import React from "react"
import BackgroundImage from "../../../components/BackgroundImage/BackgroundImage"
import {
  ContentAlignment,
  ContentTitle,
} from "../../../components/Content/Content"

import "./NotFoundPage.css"

import bgImageURL from "../../../assets/images/bg_error2.jpg"

export default function NotFoundPage() {
  return (
    <BackgroundImage url={bgImageURL}>
      <ContentAlignment className="not-found">
        <ContentTitle>Siden blev ikke fundet</ContentTitle>
        <p>Beklager, siden eksisterer ikke.</p>
      </ContentAlignment>
    </BackgroundImage>
  )
}
