import React, { useCallback, useRef } from "react";
import PropTypes, { func } from "prop-types";
import Button from "./Button";

import ContentField from "./fields/ContentField";
import DateTimeField from "./fields/DateTimeField";
import EmailField from "./fields/EmailField";
import FileField from "./fields/FileField";
import ImageField from "./fields/ImageField";
import PasswordField from "./fields/PasswordField";
import ShortDescField from "./fields/ShortDescField";
import SlugField from "./fields/SlugField";
import TextAreaField from "./fields/TextAreaField";
import TextField from "./fields/TextField";

import "../styles/components/Form.css";

/**
 * @typedef {string} FieldType - Represents the type of a field.
 */

/**
 * Enumerates available field types.
 *
 * @typedef {Object} FieldTypes
 * @property {FieldType} content
 * @property {FieldType} dateTime
 * @property {FieldType} email - Email field.
 * @property {FieldType} file
 * @property {FieldType} image
 * @property {FieldType} password
 * @property {FieldType} shortDescription
 * @property {FieldType} slug
 * @property {FieldType} text - Text field.
 * @property {FieldType} textArea
 */

/**
 * @description Predefined field types.
 * @const {FieldTypes}
 */
export const fieldTypes = {
  content: "content",
  dateTime: "dateTime",
  email: "email",
  file: "file",
  image: "image",
  password: "password",
  shortDescription: "shortDesc",
  slug: "slug",
  text: "text",
  textArea: "textArea",
};

/**
 * @typedef {string} Identifier - Represents a unique identifier that points at a data value.
 */

/**
 * @typedef {Object} FieldData
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
 * @typedef {Object} Field
 * @property {FieldType} fieldType - Type of the field.
 * @property {string} label - The label associated with the field.
 * @property {boolean} [required] - Indicates if the field is required (optional).
 * @property {FieldData} [data] - Additional data related to the field (optional).
 */

/**
 * @typedef {string} ButtonIdentifier - Represents a unique button identifier.
 */

/**
 * @typedef {Object} Link
 * @property {string} href - The URI link.
 * @property {string} title - The title associated with the link.
 * @property {('GET'|'POST'|'PATCH'|'DELETE')} [method] - HTTP method for the link.
 */

/**
 * @typedef {Object} Button - Represents a button with properties.
 * @property {Link} link
 * @property {((link: Link) => void) | ((link: Link, changes: object) => void)} onPress - The callback function when the button is pressed.
 * @property {('default'|'add'|'delete')} [style] - The style of the button (optional).
 */

/**
 * Create a form component.
 *
 * @component
 * @param {Object} props - Props for the form component.
 * @param {Object.<Identifier, Field>} props.fields - Fields with their identifiers and related data.
 * @param {Object.<Identifier, object>} props.data - Data associated with form fields.
 * @param {Object.<ButtonIdentifier, Button>} props.buttons - Buttons in the form.
 * @returns {JSX.Element} - Returns JSX for the form component.
 */
export default function Form({ fields, data, buttons }) {
  const fieldRefs = useRef({});

  const handleRef = useCallback(
    /**
     * Store field reference.
     *
     * @param {Identifier} identifier - Identifier of the field.
     * @param {Object} ref - Reference to the field.
     * @returns {void}
     */
    (identifier, ref) => {
      const refs = fieldRefs.current;

      refs[identifier] = ref;

      // Set reference for specific fields
      if (Object.keys(fields).length === Object.keys(refs).length) {
        for (const [identifier, field] of Object.entries(refs)) {
          if (field && typeof field.setUpdateRef === "function") {
            field.setUpdateRef(refs[field.getUpdateId()]);
            field.setUpdateIfEmptyRef(refs[field.getUpdateIfEmptyId()]);
            field.setEqualToRef(refs[field.getEqualToId()]);
            field.setGreaterThanRef(refs[field.getGreaterThanId()]);
          }
        }
      }
    },
    []
  );

  const onButtonPressed = useCallback(
    /**
     * Handle form submission.
     *
     * @param {Link} link - The link associated with the button.
     * @param {(link: Link, changes: Object.<Identifier, string|number|undefined>) => void} onPress - The form submission callback.
     * @param {ButtonIdentifier} pressedButton
     */
    (link, onPress, pressedButton) => {
      if (pressedButton !== "submit") {
        onPress(link);
        return;
      }

      let noErrors = true;
      const changes = {};
      for (const [identifier, field] of Object.entries(fieldRefs.current)) {
        if (!field.validate()) {
          noErrors = false;
          continue;
        }

        if (field.getInitValue() !== field.getValue()) {
          changes[field.getIdentifier()] = field.getValue();
        }
      }

      if (!noErrors) {
        return;
      }

      if (Object.keys(changes).length !== 0) {
        onPress(link, changes);
      }
    },
    []
  );

  return (
    <form className="input-form">
      <div className="input-content">
        {Object.entries(fields).map(([identifier, field]) => {
          const FieldComponent = getFieldComponent(field.fieldType);

          return (
            <FieldComponent
              {...field}
              key={identifier}
              ref={(ref) => handleRef(identifier, ref)}
              identifier={identifier}
            >
              {data[identifier]}
            </FieldComponent>
          );
        })}
      </div>
      <div className="input-hspace" />
      <div className="input-button">
        {Object.entries(buttons).map(
          ([buttonIdentifier, { link, onPress, style }]) => (
            <Button
              key={buttonIdentifier}
              onPress={() => onButtonPressed(link, onPress, buttonIdentifier)}
              buttonStyle={style}
            >
              {link.title}
            </Button>
          )
        )}
      </div>
    </form>
  );
}

Form.propTypes = {
  fields: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  buttons: PropTypes.object.isRequired,
};

/**
 * @param {FieldType} fieldType
 * @returns {React.ComponentType<any>}
 */
function getFieldComponent(fieldType) {
  switch (fieldType) {
    case fieldTypes.content:
      return ContentField;
    case fieldTypes.dateTime:
      return DateTimeField;
    case fieldTypes.email:
      return EmailField;
    case fieldTypes.file:
      return FileField;
    case fieldTypes.image:
      return ImageField;
    case fieldTypes.password:
      return PasswordField;
    case fieldTypes.shortDescription:
      return ShortDescField;
    case fieldTypes.slug:
      return SlugField;
    case fieldTypes.text:
      return TextField;
    default:
      return TextAreaField;
  }
}
