import AbstractField, { inputTypes } from "./AbstractField";

import getText from "../../utils/text";

/**
 * Represents a password field.
 * @extends AbstractField
 */
export default class PasswordField extends AbstractField {
  /**
   * Represents the type of the field.
   * @type {import("./AbstractField").InputType}
   */
  inputType = inputTypes.password;

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

    if (
      this.getLength() < this.min ||
      (this.min > 0 && this.getLength() > this.max)
    ) {
      if (this.min < this.max) {
        this.setError(
          getText("errorLengthBetween", false, [this.min, this.max]),
        );
      } else {
        this.setError(getText("errorLengthMinimum", false, this.min));
      }
    }

    if (this.equalToRef && this.getValue() !== this.equalToRef.getValue()) {
      this.setError(getText("errorEqualTo", false, this.equalToRef.getLabel()));
    }

    return !this.hasError();
  }
}
