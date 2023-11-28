import { inputTypes } from "./AbstractField";
import TextAreaField from "./TextAreaField";

/**
 * Represents a text area field.
 * @extends TextAreaField
 */
export default class ContentField extends TextAreaField {
  /**
   * Represents the type of the field.
   * @type {import("./AbstractField").InputType}
   */
  inputType = inputTypes.textArea;

  /**
   * Constructor for initializing the ContentField component.
   * @param {import("./TextAreaField").Props} props - Props for the ContentField component.
   * @override
   */
  constructor(props) {
    super(props);
    this.rows = props.fieldProps.rows || 30;
    this.wideLayout =
      typeof props.wideLayout === "boolean" ? props.wideLayout : true;
  }
}
