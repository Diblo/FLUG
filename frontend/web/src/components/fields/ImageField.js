import React from "react";

import getText from "../../utils/text";

import { inputTypes } from "./AbstractField";
import FileField from "./FileField";
import Button from "../Button";

import "../../styles/components/fields/ImageField.css";

/**
 * @typedef {Object} ImageInputAttributes
 * @property {import("react").CSSProperties} [style]
 *
 * @typedef {import("./AbstractField").InputAttributes & ImageInputAttributes} InputAttributes
 */

/**
 * Represents a image field.
 * @extends FileField
 */
export default class ImageField extends FileField {
  /**
   * Represents the type of the field.
   * @type {import("./AbstractField").InputType}
   */
  inputType = inputTypes.file;

  fileInputRef = React.createRef();

  /**
   * Constructor for initializing the ImageField component.
   * @param {import("./FileField").Props} props - Props for the ImageField component.
   * @override
   */
  constructor(props) {
    super(props);
    this.accept = props.fieldProps.accept || "image/*";

    this.openFileDialog = this.openFileDialog.bind(this);
  }

  openFileDialog() {
    this.fileInputRef.current.click();
  }

  /**
   * This method return the input attributes for the field.
   * @returns {InputAttributes}
   */
  getInputAttributes() {
    const att = super.getInputAttributes();
    delete att.id;
    delete att.name;
    return { ...att, style: { display: "none" } };
  }

  /**
   * Renders the input section.
   * @returns {JSX.Element} The JSX Element representing the section.
   * @override
   */
  renderInputSection() {
    const image = this.getValue();

    return (
      <div id={this.fieldIdentifier} className="input-field-image">
        {image ? (
          <>
            <img src={image} className="input-field-image-preview" />
            <div className="input-field-image-buttons">
              <Button
                onPress={() => this.setValue(undefined)}
                buttonStyle="delete"
              >
                {getText("delete")}
              </Button>
              <Button onPress={this.openFileDialog}>{getText("change")}</Button>
            </div>
          </>
        ) : (
          <Button onPress={this.openFileDialog} buttonStyle="add">
            {getText("add")}
          </Button>
        )}
        <input {...this.getInputAttributes()} ref={this.fileInputRef} />
      </div>
    );
  }
}
