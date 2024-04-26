/**
 * Form.Fields.js
 *
 * @file This file contains React components related to form fields.
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */
import React from "react"
import { Field as FinalField } from "react-final-form"

import { text } from "../../utils/i18n"

import "./Form.Fields.css"

/**
 * Regular expression pattern for validating a string without whitespace.
 *
 * @type {RegExp}
 * @constant
 */
const noWhitespaceRegex = /^[^\s]+$/u

/**
 * Validates that the given value does not contain whitespace.
 *
 * @param {string} value - The string to be validated.
 * @throws {Error} Throws an error with a specific message if whitespace is found.
 */
const hasNoWhitespace = (value) => {
  if (!noWhitespaceRegex.test(value)) {
    throw new Error(text("error.whitespace_not_permitted"))
  }
}

/**
 * Regular expression pattern for validating numbers.
 *
 * @type {RegExp}
 * @constant
 */
const numberRegex = /^[0-9]+$/u

/**
 * Validates that the given value contains only numeric characters.
 *
 * @param {string} value - The string to be validated.
 * @throws {Error} Throws an error with a specific message if non-numeric characters are found.
 */
const isNumbers = (value) => {
  if (!numberRegex.test(value)) {
    throw new Error(text("error.only_numbers"))
  }
}

/**
 * Regular expression pattern for validating email addresses.
 *
 * @type {RegExp}
 * @constant
 */
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

/**
 * Validates that the given value is a valid email address.
 *
 * @param {string} value - The email address to be validated.
 * @throws {Error} Throws an error with a specific message if the email address is invalid.
 */
const isValidEmail = (value) => {
  if (!emailRegex.test(value)) {
    throw new Error(text("user.error.invalid_email"))
  }
}

/**
 * Regular expression pattern for validating SLUGs (URL-friendly strings).
 *
 * @type {RegExp}
 * @constant
 */
const slugRegex = /^(?!-)[a-z0-9-]+(?<!-)$/

/**
 * Validates that the given value is a valid SLUG.
 *
 * @param {string} value - The SLUG to be validated.
 * @throws {Error} Throws an error with a specific message if the SLUG is invalid.
 */
const isValidSlug = (value) => {
  if (!slugRegex.test(value)) {
    throw new Error(text("error.invalid_slug"))
  }
}

/**
 * Regular expression pattern for validating date strings in the format "YYYY-MM-DDTHH:mm:ss.SSSZ".
 *
 * @type {RegExp}
 * @constant
 */
const dateFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

/**
 * Validates that the given value is a date string in the specified format.
 *
 * @param {string} value - The date string to be validated.
 * @throws {Error} Throws an error with a specific message if the date string is invalid.
 */
const isValidDateFormat = (value) => {
  if (!dateFormatRegex.test(value)) {
    throw new Error(text("error.invalid_date_format"))
  }
}

/**
 * Returns an error message based on the provided minimum and maximum values.
 *
 * @param {number} min - The minimum allowed length (inclusive).
 * @param {number} max - The maximum allowed length (inclusive).
 * @returns {string} The error message.
 * @private
 */
const getErrorLengthMsg = (min, max) => {
  if (min !== Number.MIN_SAFE_INTEGER) {
    if (max !== Number.MAX_SAFE_INTEGER) {
      return text("error.length_between", { min, max })
    }

    return text("error.length_minimum", { min })
  }

  return text("error.length_maximum", { max })
}

/**
 * Validates the length of a string within a specified range.
 *
 * @param {string} value - The string to be validated.
 * @param {number} [min] - The minimum allowed length (inclusive).
 * @param {number} [max] - The maximum allowed length (inclusive).
 * @throws {Error} Throws an error with a specific message if length validation fails.
 */
const isValidLength = (value, min, max) => {
  const length = value.length
  const minLength = min > 0 ? min : Number.MIN_SAFE_INTEGER
  const maxLength = max > 0 ? max : Number.MAX_SAFE_INTEGER

  if (length < minLength || length > maxLength) {
    throw new Error(getErrorLengthMsg(min, max))
  }
}

/**
 * Wrapper function for field validation.
 *
 * @param {function} validate - The validation function.
 * @param {boolean} [required] - Indicates whether the field is required.
 * @returns {(value: any, allValues: Record<string, any>, meta: Record<string, any>) => string|undefined} - A validation function.
 */
const validateHandler = (validate, required) => (value, allValues, meta) => {
  const hasValue =
    value !== undefined && value !== null && value.toString().trim() !== ""

  if (!hasValue && required) {
    return text("error.field_required")
  }

  if (hasValue) {
    try {
      validate(value, allValues, meta)
    } catch (error) {
      return error.message
    }
  }

  return undefined
}

/**
 * React component for the layout of a form field.
 *
 * @typedef {Object} FieldHandlerExtProps
 * @property {string} label - The label for the form field.
 * @property {Record<string, any>} [attributes]
 * @property {boolean} [required] - Indicates whether the field is required.
 * @property {boolean} [wideLayout] - Indicates whether to use wide layout.
 */

/**
 * A component that registers a field with the containing form.
 *
 * @param {import('react-final-form').FieldProps & FieldHandlerExtProps} props - Component props.
 * @returns {JSX.Element} - The rendered React component.
 */
const FieldHandler = (props) => (
  <FinalField
    {...props}
    parse={(value) => value} // avoid removing field name, when its value become empty
  />
)

/**
 * React component for the layout of a form field.
 *
 * @typedef {Object} LayoutProps
 * @property {string} label - The label for the form field.
 * @property {Record<string, any>} meta - Meta information about the field.
 * @property {Record<string, any>} input
 * @property {Record<string, any>} [attributes]
 * @property {boolean} [required] - Indicates whether the field is required.
 * @property {boolean} [wideLayout] - Indicates whether to use wide layout.
 */

/**
 * Props for field component.
 *
 * @typedef {Object} ValueComponentProps
 * @property {Record<string, any>} input - Props for the input element.
 * @property {Record<string, any>} meta - Meta information about the field.
 * @property {Record<string, any>} [attributes] - Additional attributes for the input element.
 * @property {boolean} [wideLayout] - Indicates whether to use wide layout.
 */

/**
 *
 * @param {React.ComponentType<ValueComponentProps>} ValueComponent
 * @returns {React.ComponentType<LayoutProps>}
 */
const FieldHoc =
  (ValueComponent) =>
  ({
    label,
    meta,
    input,
    attributes = {},
    required = false,
    wideLayout = false,
  }) => {
    const showError =
      ((meta.touched && meta.dirty) || meta.submitFailed) && meta.error

    return (
      <>
        <label className="input-label" htmlFor={meta.name}>
          {label}
          {required && <span className="input-required">*</span>}
        </label>
        {wideLayout && showError && (
          <div className="input-error">{meta.error}</div>
        )}
        <ValueComponent
          input={input}
          meta={meta}
          attributes={attributes}
          wideLayout={wideLayout}
        />
        {!wideLayout && showError && (
          <>
            <div />
            <div className="input-error">{meta.error}</div>
          </>
        )}
        <div className="input-row-space" />
      </>
    )
  }

/**
 * React component for an input field.
 *
 * @param {LayoutProps} props - Component props.
 */
const InputField = FieldHoc(({ input, meta, attributes = {} }) => (
  <input
    {...attributes}
    {...input}
    id={meta.name}
    className={`input ${meta.active ? "active" : ""}`}
  />
))

/**
 * React component for a textarea field.
 *
 * @param {LayoutProps} props - Component props.
 */
const TextAreaField = FieldHoc(
  ({ input, meta, attributes = {}, wideLayout = false }) => (
    <textarea
      {...attributes}
      {...input}
      id={meta.name}
      className={`input textarea ${wideLayout ? "wide-layout" : ""} ${
        meta.active ? "active" : ""
      }`}
    />
  )
)

/**
 * Props for a form field component.
 *
 * @typedef {Object} FieldProps
 * @property {string} fieldName - The id of the field.
 * @property {boolean} [required]
 * @property {Record<string, any>} [attributes] - Additional attributes for the field.
 */

/**
 * React component for a required first name field.
 *
 * @type {React.ComponentType<FieldProps>}
 */
export const FirstName = ({ fieldName, required = false, attributes = {} }) => (
  <FieldHandler
    name={fieldName}
    label={text("user.first_name")}
    type="text"
    required={required}
    attributes={{
      ...attributes,
      placeholder: text("user.placeholder.first_name"),
      maxLength: 50,
    }}
    validate={validateHandler((value) => {
      hasNoWhitespace(value)
      isValidLength(value, 2, 50)
    }, required)}
    component={InputField}
  />
)

/**
 * React component for a last name field.
 *
 * @type {React.ComponentType<FieldProps>}
 */
export const LastName = ({ fieldName, required = false, attributes = {} }) => (
  <FieldHandler
    name={fieldName}
    label={text("user.last_name")}
    type="text"
    required={required}
    attributes={{
      ...attributes,
      placeholder: text("user.placeholder.last_name"),
      maxLength: 50,
    }}
    validate={validateHandler((value) => {
      hasNoWhitespace(value)
      isValidLength(value, 2, 50)
    }, required)}
    component={InputField}
  />
)

/**
 * React component for a required email field.
 *
 * @type {React.ComponentType<FieldProps>}
 */
export const Email = ({ fieldName, required = false, attributes = {} }) => (
  <FieldHandler
    name={fieldName}
    label={text("user.email")}
    type="text"
    required={required}
    attributes={{
      ...attributes,
      placeholder: text("user.placeholder.email"),
      maxLength: 50,
    }}
    validate={validateHandler((value) => isValidEmail(value), required)}
    component={InputField}
  />
)
