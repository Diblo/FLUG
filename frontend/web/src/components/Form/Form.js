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
 * File: Form.js
 */
import React from "react"
import ButtonBar from "../ButtonBar/ButtonBar"

import "./Form.css"

/**
 * Create a form component.
 * @param {Object} probs
 * @param {React.ReactNode} probs.children
 * @returns {JSX.Element}
 */
export default function Form({ children }) {
  return <form className="input-form">{children}</form>
}

/**
 * @param {Object} probs
 * @param {React.ReactNode} probs.children
 * @returns {JSX.Element}
 */
export const FormContent = ({ children }) => {
  return <div className="input-content">{children}</div>
}

/**
 * @param {Object} probs
 * @param {React.ReactNode} probs.children
 * @returns {JSX.Element}
 */
export const FormButtonBar = ({ children }) => {
  return <ButtonBar>{children}</ButtonBar>
}
