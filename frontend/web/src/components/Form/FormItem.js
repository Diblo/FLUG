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
 * File: FormItem.js
 */
import React from "react"
import { v4 as uuidv4 } from "uuid"

import { DateTime } from "../../utils/datetime"
import getText from "../../utils/text"
import { Button, GreenButton, RedButton } from "../Button/Button"

import "./FormItem.css"

/**
 * Higher-order component that wraps an input element.
 * @param {React.ComponentType<any>} Element - The input element component.
 * @param {object} [partialProps] - Partially applied props for the input element.
 * @param {string} [partialProps.type] - The type of input (e.g., "text", "number").
 * @param {boolean} [partialProps.required=false] - Indicates whether the field is required (default: false).
 * @param {boolean} [partialProps.wideLayout=false] - Use wide layout.
 * @returns {React.ComponentType<any>} A wrapped input element component.
 */
const ItemHOC = (Element, partialProps) => {
  const {
    type = undefined,
    required = false,
    wideLayout = false,
  } = partialProps || {}

  /**
   * Renders the partially applied component with combined props.
   *
   * @param {object} props - The remaining props to be applied.
   * @param {string} props.label - The label for the item.
   * @param {string} [props.children] - Value associated with the item.
   * @param {(value: string) => void} props.onChange - Function triggered on value change.
   * @param {object} [props.attributes={}] - Additional attributes for the element.
   * @param {string} [props.errorMsg] - Error message associated with the item.
   * @returns {JSX.Element} The rendered React component.
   */
  return ({
    children = undefined,
    label,
    onChange,
    attributes = {},
    errorMsg = "",
  }) => {
    const id = uuidv4()

    return (
      <>
        <label className="input-label" htmlFor={id}>
          {label}:{required && <span className="input-required">*</span>}
        </label>
        {wideLayout && <ErrorMessage>{errorMsg}</ErrorMessage>}
        <Element
          id={id}
          type={type}
          value={children}
          onChange={onChange}
          attributes={attributes}
          wideLayout={wideLayout ? "wide-layout" : null}
        />
        {!wideLayout && (
          <>
            <div />
            <ErrorMessage>{errorMsg}</ErrorMessage>
          </>
        )}
      </>
    )
  }
}

/**
 * @param {object} props - The remaining props to be applied.
 * @param {string} [props.children] - Error message associated with the item.
 * @returns {JSX.Element} The rendered React component.
 */
const ErrorMessage = ({ children }) => {
  return <div className="input-error">{children}</div>
}

/**
 * @typedef {Object} ElementProps
 * @property {string} id - The ID for the element.
 * @property {string} type - The type of input (e.g., "text", "number").
 * @property {string} props.value - The value of the element.
 * @property {(value: string) => void} props.onChange - Function triggered on element change.
 * @property {Object} props.attributes - Additional attributes for the element.
 * @property {string} [props.wideLayout] - Class name for wide layout.
 */

/**
 * Component for rendering an input element.
 *
 * @param {ElementProps} props - Props for the component.
 */
const InputElement = ({
  id,
  type,
  value,
  onChange,
  attributes,
  wideLayout,
}) => {
  return (
    <input
      {...attributes}
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input"
    />
  )
}

/**
 * Component for rendering a textarea element.
 *
 * @param {ElementProps} props - Props for the component.
 */
const TextAreaElement = ({
  id,
  type,
  value,
  onChange,
  attributes,
  wideLayout,
}) => {
  return (
    <textarea
      {...attributes}
      id={id}
      name={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`textarea ${wideLayout}`}
    />
  )
}

/**
 * Component for rendering a image input element.
 *
 * @param {ElementProps} props - Props for the component.
 */
const ImageElement = ({
  id,
  type,
  value,
  onChange,
  attributes,
  wideLayout,
}) => {
  const fileInputRef = React.createRef()

  return (
    <div className="input-image">
      {value ? (
        <>
          <img src={value} className="input-image-preview" />
          <div className="input-image-buttons">
            <RedButton onPress={() => onChange(undefined)}>
              {getText("delete")}
            </RedButton>
            <Button onPress={fileInputRef.current.click()}>
              {getText("change")}
            </Button>
          </div>
        </>
      ) : (
        <GreenButton onPress={fileInputRef.current.click()}>
          {getText("add")}
        </GreenButton>
      )}
      <input
        {...attributes}
        accept={attributes.accept || "image/*"}
        id={id}
        name={id}
        type="file"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input"
        ref={fileInputRef}
      />
    </div>
  )
}

/**
 * Component for rendering a date time input element.
 *
 * @param {ElementProps} props - Props for the component.
 */
const DateTimeElement = ({
  id,
  type,
  value,
  onChange,
  attributes,
  wideLayout,
}) => {
  return (
    <input
      {...attributes}
      id={id}
      name={id}
      type="datetime-local"
      value={new DateTime(value).dateTimeForInputField()}
      onChange={(e) => onChange(new DateTime(e.target.value).iso8601())}
      className="input"
    />
  )
}

/**
 * @typedef {Object} InputAttributes
 * @property {string} [placeholder] - Placeholder text for the input (optional).
 * @property {number} [maxLength] - The maximum length of input value (optional).
 * @property {'off'} [autoComplete] - The autocomplete attribute for the input element (optional).
 * @property {boolean} [autoFocus] - Determines if the field should receive focus (optional).
 * @property {boolean} [disabled] - Indicates if the input field is disabled (optional).
 */

/**
 * @typedef {Object} InputItem
 * @property {string} [props.children] - Value associated with the field.
 * @property {string} props.label - The label for the field.
 * @property {(value: string) => void} props.onChange - Function triggered on value change.
 * @property {InputAttributes} [props.attributes={}] - Additional attributes for the input element.
 * @property {string} [props.errorMsg] - Error message associated with the field.
 */

/**
 * @type {React.ComponentType<InputItem>}
 */
export const TextItem = ItemHOC(InputElement, { type: "text" })

/**
 * @type {React.ComponentType<InputItem>}
 */
export const TextRequiredItem = ItemHOC(InputElement, {
  type: "text",
  required: true,
})

/**
 * @type {React.ComponentType<InputItem>}
 */
export const PasswordItem = ItemHOC(InputElement, { type: "password" })

/**
 * @type {React.ComponentType<InputItem>}
 */
export const PasswordRequiredItem = ItemHOC(InputElement, {
  type: "password",
  required: true,
})

/**
 * @typedef {Object} DateTimeAttributes
 * @property {boolean} [autoFocus] - Whether the field should receive focus (optional).
 * @property {boolean} [disabled] - Indicates if the input field is disabled (optional).
 */

/**
 * @type {React.ComponentType<InputItem & { attributes: DateTimeAttributes }>}
 */
export const DateTimeItem = ItemHOC(DateTimeElement)

/**
 * @type {React.ComponentType<InputItem & { attributes: DateTimeAttributes }>}
 */
export const DateTimeRequiredItem = ItemHOC(DateTimeElement, { required: true })

/**
 * @typedef {Object} ImageAttributes
 * @property {boolean} [autoFocus] - Whether the field should receive focus (optional).
 * @property {string} [accept="image/*"] - Accepted file types for file input (optional).
 * @property {boolean} [disabled] - Indicates if the input field is disabled (optional).
 */

/**
 * @type {React.ComponentType<InputItem & { attributes: ImageAttributes }>}
 */
export const ImageItem = ItemHOC(ImageElement)

/**
 * @typedef {Object} TextAreaAttributes
 * @property {string} [placeholder] - Placeholder text for the input (optional).
 * @property {number} [rows] - The number of visible text lines in a text area (optional).
 * @property {boolean} [autoFocus] - Whether the field should receive focus (optional).
 * @property {boolean} [disabled] - Indicates if the input field is disabled (optional).
 */

/**
 * @type {React.ComponentType<InputItem & { attributes: TextAreaAttributes }>}
 */
export const TextAreaItem = ItemHOC(TextAreaElement)

/**
 * @type {React.ComponentType<InputItem & { attributes: TextAreaAttributes }>}
 */
export const TextAreaRequiredItem = ItemHOC(TextAreaElement, { required: true })

/**
 * @type {React.ComponentType<InputItem & { attributes: TextAreaAttributes }>}
 */
export const WideTextAreaItem = ItemHOC(TextAreaElement, {
  wideLayout: true,
})

/**
 * @type {React.ComponentType<InputItem & { attributes: TextAreaAttributes }>}
 */
export const WideTextAreaRequiredItem = ItemHOC(TextAreaElement, {
  required: true,
  wideLayout: true,
})
