import AbstractField, { inputTypes } from "./AbstractField";

import getText from "../../utils/text";

/**
 * Represents a email field.
 * @extends AbstractField
 */
export default class EmailField extends AbstractField {
  /**
   * Represents the type of the field.
   * @type {import("./AbstractField").InputType}
   */
  inputType = inputTypes.text;

  emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

    if (this.getLength() > this.max) {
      this.setError(getText("errorLengthMaximum", false, this.max));
    }

    const value = this.getValue();
    if (
      value &&
      typeof value === "string" &&
      !value.toLowerCase().match(this.emailPattern)
    ) {
      this.setError(getText("errorInvalidEmail"));
    }

    return !this.hasError();
  }
}
