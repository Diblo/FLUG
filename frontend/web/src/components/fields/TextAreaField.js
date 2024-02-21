import AbstractField, { inputTypes } from "./AbstractField";

import getText from "../../utils/text";

/**
 * @typedef {Object} TextAreaFieldProps
 * @property {number} [rows]
 * @property {boolean} [resize]
 *
 * @typedef {import("./AbstractField").FieldProps & TextAreaFieldProps} FieldProps
 *
 * @typedef {Object} TextAreaProps
 * @property {FieldProps} [fieldProps={}] - Additional props for the field.
 *
 * @typedef {import("./AbstractField").Props & TextAreaProps} Props
 */

/**
 * @typedef {Object} TextAreaInputAttributes
 * @property {number} [rows]
 * @property {import("react").CSSProperties} [style]
 *
 * @typedef {import("./AbstractField").InputAttributes & TextAreaInputAttributes} InputAttributes
 */

/**
 * Represents a text area field.
 * @extends AbstractField
 */
export default class TextAreaField extends AbstractField {
  /**
   * Represents the type of the field.
   * @type {import("./AbstractField").InputType}
   */
  inputType = inputTypes.textArea;

  /**
   * Constructor for initializing the TextAreaField component.
   * @param {Props} props - Props for the TextAreaField component.
   * @override
   */
  constructor(props) {
    super(props);
    this.rows = props.fieldProps.rows || undefined;
    /** @type {("none"|"vertical")} */
    this.resize = props.fieldProps.resize === false ? "none" : "vertical";
  }

  /**
   * This method return the input attributes for the field.
   * @returns {InputAttributes}
   * @override
   */
  getInputAttributes() {
    const att = super.getInputAttributes();
    return {
      ...att,
      rows: this.rows,
      style: { resize: this.resize },
    };
  }

  /**
   * This method contain the validation logic for the field.
   * @returns {boolean}
   * @override
   */
  validate() {
    this.setError(undefined);

    if (!this.hasRealValue()) {
      if (this.required) {
        this.setError(getText("errorFieldRequired"));
      }
    }

    return !this.hasError();
  }
}
