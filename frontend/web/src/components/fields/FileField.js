import AbstractField, { inputTypes } from "./AbstractField";

import getText from "../../utils/text";

/**
 * @typedef {Object} FileFieldProps
 * @property {string} [accept]
 *
 * @typedef {import("./AbstractField").FieldProps & FileFieldProps} FieldProps
 *
 * @typedef {Object} FileProps
 * @property {FieldProps} [fieldProps={}] - Additional props for the field.
 *
 * @typedef {import("./AbstractField").Props & FileProps} Props
 */

/**
 * @typedef {Object} FileInputAttributes
 * @property {string} [accept]
 *
 * @typedef {import("./AbstractField").InputAttributes & FileInputAttributes} InputAttributes
 */

/**
 * Represents a file field.
 * @extends AbstractField
 */
export default class FileField extends AbstractField {
  /**
   * Represents the type of the field.
   * @type {import("./AbstractField").InputType}
   */
  inputType = inputTypes.file;

  /**
   * Constructor for initializing the FileField component.
   * @param {Props} props - Props for the FileField component.
   */
  constructor(props) {
    super(props);
    this.accept = props.fieldProps.accept || "*";
  }

  /**
   * @param {import("react").ChangeEvent<HTMLInputElement>} event
   */
  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const acceptedRegexFormats = this.accept
        .split(",")
        .map((format) => {
          return format
            .replace(/\./g, "\\.")
            .replace(/\*/g, ".*")
            .replace(/\//g, "\\/")
            .replace(/\s+/g, "");
        })
        .join("|");
      const regex = new RegExp(`^(${acceptedRegexFormats})$`, "i");
      const mime = file.type;
      const ext = file.name.split(".").pop().toLowerCase();

      if (!regex.test(mime) && !regex.test(`.${ext}`)) {
        //this.setMessage(getText("errorInvalidFile"));
        // NOTE: Implement popup message
        console.error("The popup message is not implemented")
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.setValue(e.target.result.toString());
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * This method return the input attributes for the field.
   * @returns {InputAttributes}
   * @override
   */
  getInputAttributes() {
    const att = super.getInputAttributes();
    delete att.value;
    return { ...att, accept: this.accept, onChange: this.handleFileChange };
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

    // NOTE: not done

    return !this.hasError();
  }
}
