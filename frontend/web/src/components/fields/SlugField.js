import AbstractField, { inputTypes } from "./AbstractField";

import getText from "../../utils/text";

/**
 * Represents a SLUG field.
 * @extends AbstractField
 */
export default class SlugField extends AbstractField {
  /**
   * Represents the type of the field.
   * @type {import("./AbstractField").InputType}
   */
  inputType = inputTypes.text;

  slugPattern = /^[a-z0-9][\w\-]+[a-z0-9]$/;

  /**
   * Sets the value for the field.
   * @param {string | undefined} value - The value to set.
   * @override
   */
  setValue(value) {
    if (value) {
      super.setValue(
        value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "")
      );
    } else {
      super.setValue(value);
    }
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

    if (this.getLength() < this.min || this.getLength() > this.max) {
      this.setError(getText("errorLengthBetween", false, [this.min, this.max]));
    }

    if (!this.slugPattern.test(this.getValue().toString())) {
      this.setError(getText("errorInvalidSLUG", false, [this.min, this.max]));
    }

    return !this.hasError();
  }
}
