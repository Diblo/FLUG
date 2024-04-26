/**
 * Form.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */
import React from "react"
import { Form as FinalForm } from "react-final-form"

import { text } from "../../utils/i18n"

import { ButtonBar, Button, GreenButton } from "../Button/Button"

import "./Form.css"

/**
 * Compares two objects and generates a new object containing the differing values from the second object.
 *
 * @param {Record<string, (string|number)>} compareWith - The reference object to compare against.
 * @param {Record<string, (string|number)>} compareTo - The object to compare with the reference.
 * @returns {Record<string, any>} - A new object containing key-value pairs from the second object where values were different.
 */
const difference = (compareWith, compareTo) => {
  const diffObject = {}

  for (const key in compareWith) {
    if (compareWith[key] !== compareTo[key]) {
      if (typeof compareWith[key] === "string") {
        diffObject[key] = compareTo[key] ? compareTo[key] : ""
      } else {
        diffObject[key] = compareTo[key]
      }
    }
  }

  return diffObject
}

/**
 *
 * @param {import('react-final-form').FormProps} props
 * @returns {JSX.Element}
 */
const FormHandler = (props) => {
  const onSubmit = (values, form, callback) =>
    props.onSubmit &&
    props.onSubmit(difference(props.initialValues, values), form, callback)

  return <FinalForm {...props} onSubmit={onSubmit} validateOnBlur />
}

export default FormHandler

/**
 * Create a form component.
 * @param {Object} probs
 * @param {React.ReactNode} probs.children
 * @param {(event?: Partial<Pick<React.SyntheticEvent, "preventDefault" | "stopPropagation">>) => Promise<Record<string, any> | undefined> | undefined} probs.submitHandler
 * @returns {JSX.Element}
 */
export const Form = ({ children, submitHandler }) => (
  <form className="form" onSubmit={submitHandler}>
    {children}
  </form>
)

/**
 * @param {Object} probs
 * @param {React.ReactNode} probs.children
 * @returns {JSX.Element}
 */
export const FieldContainer = ({ children }) => (
  <div className="form-field-container">{children}</div>
)

/**
 * @param {Object} probs
 * @param {React.ReactNode} probs.children
 * @param {boolean} [probs.center]
 * @returns {JSX.Element}
 */
export const ButtonContainer = ({ children, center = false }) =>
  (center && (
    <ButtonBar className="form-button-container-center">{children}</ButtonBar>
  )) || (
    <ButtonBar className="form-button-container-right">{children}</ButtonBar>
  )

/**
 *
 * @param {Object} props
 * @param {Object} props.children
 * @param {Object} props.disabled
 */
export const SubmitButton = ({ children, disabled }) => (
  <GreenButton type="submit" disabled={disabled}>
    {children}
  </GreenButton>
)

/**
 *
 * @param {Object} props
 * @param {Object} props.onPress
 * @param {Object} props.disabled
 */
export const ResetButton = ({ onPress, disabled }) => (
  <Button onPress={onPress} disabled={disabled}>
    {text("action.reset")}
  </Button>
)

/**
 *
 * @param {Object} props
 * @param {Object} props.onPress
 */
export const CancelButton = ({ onPress }) => (
  <Button onPress={onPress}>{text("action.cancel")}</Button>
)
