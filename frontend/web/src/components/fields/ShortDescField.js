import { inputTypes } from "./AbstractField";
import TextAreaField from "./TextAreaField";

/**
 * Represents a short  description field.
 * @extends TextAreaField
 */
export default class ShortDescField extends TextAreaField {
  /**
   * Represents the type of the field.
   * @type {import("./AbstractField").InputType}
   */
  inputType = inputTypes.textArea;

  /**
   * Constructor for initializing the ShortDescField component.
   * @param {import("./TextAreaField").Props} props - Props for the ShortDescField component.
   * @override
   */
  constructor(props) {
    super(props);
    this.rows = props.fieldProps.rows || 5;
    /** @type {("none"|"vertical")} */
    this.resize = props.fieldProps.resize === true ? "vertical" : "none";
  }
}
