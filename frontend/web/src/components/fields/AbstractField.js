import React, { Component } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

/**
 * Represents the type of an input.
 * @typedef {string} InputType
 */

/**
 * Enumerates available input types.
 * @typedef {Object} InputTypes
 * @property {InputType} dateTime - Date and time input field.
 * @property {InputType} file - File input field.
 * @property {InputType} number - Number input field.
 * @property {InputType} password - Password input field.
 * @property {InputType} text - Text input field.
 * @property {InputType} textArea - Text area input field.
 */

/**
 * Predefined field types.
 * @const {InputTypes}
 */
export const inputTypes = {
  dateTime: "datetime-local",
  file: "file",
  number: "number",
  password: "password",
  text: "text",
  textArea: "textarea",
};

/**
 * Represents a unique identifier for a field.
 * @typedef {string} FieldIdentifier
 */

/**
 * Represents a unique identifier.
 * @typedef {string} Identifier
 */

/**
 * @typedef {Object} FieldProps
 * @property {number} [min] - The minimum value (optional).
 * @property {number} [max] - The maximum value (optional).
 * @property {boolean} [autoComplete] - The autocomplete attribute for the input element (optional).
 * @property {boolean} [focus] - Whether the field should receive focus (optional).
 * @property {Identifier} [updateField] - Identifier for the field that will be updated when 'update' is triggered (optional).
 * @property {Identifier} [updateFieldIfEmpty] - Identifier for the field that will be updated when 'update if empty' is triggered (optional).
 * @property {Identifier} [equalToField] - Identifier for a field that this field should be equal to (optional).
 * @property {Identifier} [greaterThanField] - Identifier for a field that this field should be greater than (optional).
 */

/**
 * @typedef {Object} Props
 * @property {string} [children = undefined] - Value associated with the field.
 * @property {Identifier} identifier - Unique identifier.
 * @property {string} label - The label for the field.
 * @property {boolean} [required=false] - Indicates whether the field is required (default: false).
 * @property {boolean} [wideLayout=false]
 * @property {FieldProps} [fieldProps={}] - Additional props for the field.
 */

/**
 * @typedef {Object} State
 * @property {string|undefined} value
 * @property {string|undefined} error
 */

/**
 * @typedef {Object} InputAttributes
 * @property {string} id
 * @property {string} name
 * @property {string} type
 * @property {string} value
 * @property {number} maxLength
 * @property {(e: { target: { id: string, value: string } }) => void} onChange
 * @property {boolean} autoFocus
 * @property {string} autoComplete
 */

/**
 * Represents the basic for a field.
 * @extends Component<Props,State>
 * @template ValueType
 */
export default class AbstractField extends Component {
  /**
   * Represents the type of the field.
   * @type {InputType}
   */
  inputType = undefined;

  // Define default props and their types using PropTypes
  static defaultProps = {
    children: undefined,
    required: false,
    fieldProps: {},
  };

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    identifier: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    fieldProps: PropTypes.object,
  };

  state = {
    value: undefined,
    error: undefined,
  };

  /**
   * Constructor for initializing the AbstractField component.
   * @param {Props} props - Props for the AbstractField component.
   */
  constructor(props) {
    super(props);

    const {
      children = undefined,
      identifier,
      label,
      required = false,
      fieldProps = {},
      wideLayout = false,
    } = props;

    this.identifier = identifier;
    this.fieldIdentifier = `${uuidv4()}-${identifier}`;

    this.label = label;

    this.initValue = normalizeValue(children);
    this.value = normalizeValue(children);
    this.valueSpecified = this.hasValue();

    this.required = required || false;

    this.wideLayout = wideLayout;

    this._initializeFieldProps(fieldProps);

    /** @type {string} */
    this.message = undefined;

    /** @type {string} */
    this.error = undefined;

    this.state = {
      value: this.value,
      error: this.error,
    };

    if (this.constructor === AbstractField) {
      throw new TypeError("Cannot instantiate AbstractField directly");
    }
  }

  /**
   * @param {FieldProps} fieldProps
   * @private
   */
  _initializeFieldProps(fieldProps) {
    const {
      min,
      max,
      autoComplete = true,
      focus = false,
      updateField,
      updateFieldIfEmpty,
      equalToField,
      greaterThanField,
    } = fieldProps;

    this.min = min > 0 ? min : undefined;
    this.max =
      max >= this.min || (this.min === undefined && max > 0) ? max : undefined;
    this.autoComplete = autoComplete;
    this.focus = focus === true || false;

    /** @type {Identifier} */
    this.onChangeUpdateFieldId = handleFieldId(updateField);
    /** @type {AbstractField} */
    this.updateRef = undefined;
    /** @type {Array} */
    this.updateArgs = handleFieldArgs(updateField);

    /** @type {Identifier} */
    this.updateIfEmptyId = handleFieldId(updateFieldIfEmpty);
    /** @type {AbstractField} */
    this.updateIfEmptyRef = undefined;
    /** @type {Array} */
    this.updateIfEmptyArgs = handleFieldArgs(updateFieldIfEmpty);

    /** @type {Identifier} */
    this.equalToId = handleFieldId(equalToField);
    /** @type {AbstractField} */
    this.equalToRef = undefined;
    /** @type {Identifier} */
    this.greaterThanId = handleFieldId(greaterThanField);
    /** @type {AbstractField} */
    this.greaterThanRef = undefined;
  }

  /**
   * Updates the component state when props change.
   * @param {Props} prevProps - The previous props.
   */
  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children) {
      this._updateValue(normalizeValue(this.props.children));
    }
  }

  /**
   * @param {string | undefined} value - The value to update.
   * @private
   */
  _updateValue(value) {
    this.value = value;
    this.setState({
      value: value,
      error: this.error,
    });
  }

  /**
   * @param {string | undefined} error - The error message to update.
   * @private
   */
  _updateError(error) {
    this.error = error;
    this.setState({
      value: this.value,
      error: error || undefined,
    });
  }

  /**
   * Retrieves the identifier of the field.
   * @returns {Identifier} The identifier.
   */
  getIdentifier() {
    return this.identifier;
  }

  /**
   * Retrieves the label of the field.
   * @returns {string} The label of the field.
   */
  getLabel() {
    return this.label;
  }

  /**
   * Retrieves the initial value of the field.
   * @returns {string|undefined} The initial value of the field.
   */
  getInitValue() {
    return this.initValue;
  }

  /**
   * Sets the value for the field.
   * @param {string | undefined} value - The value to set.
   */
  setValue(value) {
    const _value = normalizeValue(value);
    if (this.value === _value) {
      return;
    }

    this._updateValue(_value);
    this.valueSpecified = this.hasValue();

    if (this.updateRef) {
      this.updateRef.onUpdateFromField(this, false, this.updateArgs);
    } else if (this.updateIfEmptyRef) {
      this.updateIfEmptyRef.onUpdateFromField(
        this,
        true,
        this.updateIfEmptyArgs,
      );
    }
  }

  /**
   * Retrieves the value of the field.
   * @returns {string|undefined} The value of the field.
   */
  getValue() {
    return this.value;
  }

  /**
   * Retrieves whether the field has a value (including white space).
   * @returns {boolean} Indicates if the field has a value.
   */
  hasValue() {
    if (
      this.value === undefined ||
      (typeof this.value === "string" && this.value.length == 0)
    ) {
      return false;
    }

    return true;
  }

  /**
   * Retrieves whether the field has a value (exclusive white space).
   * @returns {boolean} Indicates if the field has a real value.
   */
  hasRealValue() {
    if (
      this.value === undefined ||
      (typeof this.value === "string" && this.value.trim().length == 0)
    ) {
      return false;
    }

    return true;
  }

  /**
   * Retrieves the length when the field value is a string.
   * @returns {number|undefined} The length of the field value.
   */
  getLength() {
    return (typeof this.value === "string" && this.value.length) || undefined;
  }

  /**
   * Retrieves whether the field is required.
   * @returns {boolean} Indicates if the field is required.
   */
  getRequired() {
    return this.required;
  }

  /**
   * Sets the error message for the field.
   * @param {string|undefined} error - The error message to set.
   */
  setError(error) {
    this._updateError(error);
  }

  /**
   * Retrieves the error message for the field.
   * @returns {string|undefined} The error message for the field.
   */
  getError() {
    return this.error;
  }

  /**
   * Retrieves whether the field has an error.
   * @returns {boolean} Indicates if the field has an error.
   */
  hasError() {
    return this.error !== undefined;
  }

  /**
   * Retrieves the identifier for a field that need to be updated.
   * @returns {Identifier | undefined} The identifier for the field.
   */
  getUpdateId() {
    return this.onChangeUpdateFieldId;
  }

  /**
   * Sets the reference for the field that need to be updated.
   * @param {AbstractField | undefined} field - The field reference.
   */
  setUpdateRef(field) {
    this.updateRef = field;
  }

  /**
   * Retrieves the identifier for a field that need to be updated if it's value is empty.
   * @returns {Identifier | undefined} The identifier for the field.
   */
  getUpdateIfEmptyId() {
    return this.updateIfEmptyId;
  }

  /**
   * Sets the reference for the field that need to be updated if it's value is empty.
   * @param {AbstractField | undefined} field - The field reference.
   */
  setUpdateIfEmptyRef(field) {
    this.updateIfEmptyRef = field;
  }

  /**
   * Retrieves the identifier for a field that need to have samme value.
   * @returns {Identifier | undefined} The identifier for the field.
   */
  getEqualToId() {
    return this.equalToId;
  }

  /**
   * Sets the reference for the field that need to have samme value.
   * @param {AbstractField | undefined} field - The field reference.
   */
  setEqualToRef(field) {
    this.equalToRef = field;
  }

  /**
   * Retrieves the identifier for a field that need to have less value.
   * @returns {Identifier | undefined} The identifier for the field.
   */
  getGreaterThanId() {
    return this.greaterThanId;
  }

  /**
   * Sets the reference for the field that need to have less value.
   * @param {AbstractField | undefined} field - The field reference.
   */
  setGreaterThanRef(field) {
    this.greaterThanRef = field;
  }

  /**
   * Updates the component state based on field changes.
   * @param {AbstractField|undefined} field - The field to update from.
   * @param {boolean} ifEmpty - Flag indicating if the field should be empty.
   * @param {Array|undefined} [args=undefined] - Additional arguments.
   */
  onUpdateFromField(field, ifEmpty = false, args = undefined) {
    if (field || (ifEmpty && this.valueSpecified)) {
      return;
    }

    this.setValue(field.getValue());
    this.valueSpecified = false;
  }

  /**
   * This method return the input attributes for the field.
   * @returns {InputAttributes}
   */
  getInputAttributes() {
    return {
      id: this.fieldIdentifier,
      name: this.fieldIdentifier,
      type: this.inputType,
      value:
        this.inputType === inputTypes.text && !this.value ? "" : this.value,
      maxLength: this.max,
      onChange: (e) => this.setValue(e.target.value),
      autoFocus: this.focus ? true : undefined,
      autoComplete: this.autoComplete ? undefined : "off",
    };
  }

  /**
   * Renders the label section.
   * @returns {JSX.Element} The JSX Element representing the section.
   */
  renderLabelSection() {
    return (
      <label htmlFor={this.fieldIdentifier}>
        {this.getLabel()}:
        {this.getRequired() === true && (
          <span className="input-required">*</span>
        )}
      </label>
    );
  }

  /**
   * Renders the input section.
   * @returns {JSX.Element} The JSX Element representing the section.
   */
  renderInputSection() {
    return this.inputType === inputTypes.textArea ? (
      <textarea {...this.getInputAttributes()} />
    ) : (
      <input {...this.getInputAttributes()} />
    );
  }

  /**
   * Renders the notice section.
   * @returns {JSX.Element} The JSX Element representing the section.
   */
  renderNoticeSection() {
    return <div className="input-error">{this.getError() || ""}</div>;
  }

  /**
   * This method contain the validation logic for the field.
   * @returns {boolean}
   */
  validate() {
    throw new Error("validate must be implemented");
  }

  /**
   * Renders the AbstractField component.
   * @returns {JSX.Element} JSX for the AbstractField component.
   */
  render() {
    return this.wideLayout ? (
      <>
        {this.renderLabelSection()}
        {this.renderNoticeSection()}
        <div style={{ display: "grid", gridColumn: "span 2" }}>
          {this.renderInputSection()}
        </div>
      </>
    ) : (
      <>
        {this.renderLabelSection()}
        {this.renderInputSection()}
        <div />
        {this.renderNoticeSection()}
      </>
    );
  }
}

/**
 * Normalizes the value to handle null or empty strings.
 * @param {string | undefined} value - The value to normalize.
 * @returns {string | undefined} Normalized value.
 */
function normalizeValue(value) {
  if (value === null || (typeof value === "string" && value.length == 0)) {
    return undefined;
  }
  return value;
}

/**
 * Handles the field identifier.
 * @param {string|Array} value - The value to handle.
 * @returns {Identifier|undefined} Field identifier.
 */
function handleFieldId(value) {
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value)) {
    return value[0];
  }
  return undefined;
}

/**
 * Handles field arguments.
 * @param {string|Array} value - The value to handle.
 * @returns {Array|undefined} Field arguments.
 */
function handleFieldArgs(value) {
  if (Array.isArray(value)) {
    return value.slice(1);
  }
  return undefined;
}
