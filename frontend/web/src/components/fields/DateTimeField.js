import AbstractField, { inputTypes } from "./AbstractField";

import getText from "../../utils/text";
import { DateTime } from "../../utils/datetime";

/**
 * Represents a date time field.
 * @extends AbstractField
 */
export default class DateTimeField extends AbstractField {
  /**
   * Represents the type of the field.
   * @type {import("./AbstractField").InputType}
   */
  inputType = inputTypes.dateTime;

  /**
   * Updates the component state based on field changes.
   * @param {AbstractField|undefined} field - The field to update from.
   * @param {boolean} ifEmpty - Flag indicating if the field should be empty.
   * @param {Array|undefined} [args=undefined] - Additional arguments.
   * @override
   */
  onUpdateFromField(field, ifEmpty = false, args = undefined) {
    if (field || (ifEmpty && this.valueSpecified)) {
      return;
    }

    const newValue = field.getValue();
    if (newValue) {
      const minutes = (args && args[1]) || 0;
      const dateTime = new DateTime(newValue).addMinutes(minutes);

      this.setValue(dateTime.iso8601());
    } else {
      this.setValue(newValue);
    }

    this.valueSpecified = false;
  }

  /**
   * This method return the input attributes for the field.
   * @returns {import("./AbstractField").InputAttributes}
   * @override
   */
  getInputAttributes() {
    const attribute = super.getInputAttributes();

    attribute.value = attribute.value
      ? new DateTime(attribute.value).dateTimeForInputField()
      : "";
    attribute.onChange = (e) =>
      e.target.value && this.setValue(new DateTime(e.target.value).iso8601());

    return attribute;
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
      return !this.hasError();
    }

    if (this.greaterThanRef) {
      const value = this.greaterThanRef.getValue();
      if (
        value &&
        new DateTime(this.getValue()).greaterThan(new DateTime(value))
      ) {
        this.setError(
          getText(
            "errorGreaterThanDateTime",
            false,
            this.greaterThanRef.getLabel()
          )
        );
      }
    }

    return !this.hasError();
  }
}
