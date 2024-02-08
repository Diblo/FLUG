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
 * File: ErrorPage.js
 */
import React from "react"
import BackgroundImage from "../../../components/BackgroundImage/BackgroundImage"
import {
  ContentAlignment,
  ContentTitle,
} from "../../../components/Content/Content"

import "./ErrorPage.css"

import bgImageURL from "../../../assets/images/bg_error2.jpg"

export default function ErrorPage() {
  return (
    <BackgroundImage url={bgImageURL}>
      <ContentAlignment className="error">
        <ContentTitle>Beklager Ulejligheden</ContentTitle>
        <p>
          Vi beklager, men der opstod en fejl. FLUG er blevet underrettet om
          problemet. Vi takker for din tålmodighed, og vi bestræber os på at få
          dette løst så hurtigt som muligt.
        </p>
      </ContentAlignment>
    </BackgroundImage>
  )
}
