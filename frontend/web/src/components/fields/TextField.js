import AbstractField, { inputTypes } from "./AbstractField";

import getText from "../../utils/text";

/**
 * Represents a text field.
 * @extends AbstractField
 */
export default class TextField extends AbstractField {
  /**
   * Represents the type of the field.
   * @type {import("./AbstractField").InputType}
   */
  inputType = inputTypes.text;

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

    if (this.getLength() < this.min || this.getLength() > this.max) {
      if (this.min == this.max) {
        this.setError(getText("errorLengthMustBe", false, this.min));
      } else if (this.min < this.max) {
        this.setError(
          getText("errorLengthBetween", false, [this.min, this.max]),
        );
      } else if (this.min > 0) {
        this.setError(getText("errorLengthMinimum", false, this.min));
      } else {
        this.setError(getText("errorLengthMaximum", false, this.max));
      }
    }

    return !this.hasError();
  }
}
