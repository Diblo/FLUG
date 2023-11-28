import React, { useEffect, useState } from "react";
import Button from "./Button";

import "../styles/components/EditorWindow.css";

/**
 * Represents data type.
 *
 * @typedef {string} DataType
 */

/**
 * Represents the available data types.
 *
 * @typedef {Object} DataTypes
 * @property {DataType} string - A string data type.
 * @property {DataType} text - A text data type.
 * @property {DataType} rich_text - A rich text data type.
 * @property {DataType} email - An email data type.
 */

/**
 * An object that defines data types.
 *
 * @const {DataTypes}
 */
export const dataType = {
  string: "text",
  text: "textarea",
  rich_text: "textarea_rich",
  email: "email",
};

/**
 * Represents a data.
 *
 * @typedef {object} Data
 * @property {string} label
 * @property {string} content - The content of the data unit.
 * @property {DataType} type - The data type of the unit.
 * @property {number} [min] - The minimum value for the data unit (optional).
 * @property {number} [max] - The maximum value for the data unit (optional).
 * @property {boolean} [required]
 */

/**
 * Represents a field identifier.
 *
 * @typedef {string} Identifier
 */

/**
 * Represents a map of data units with unique identifiers.
 *
 * @typedef {Object.<Identifier, Data>} DataMap
 */

/**
 *
 * @param {object} props
 * @param {string} props.title
 * @param {DataMap} props.dataMap
 * @param {() => void} props.onDone
 * @param {() => void} props.onClose
 * @param {boolean} props.show
 * @returns {JSX.Element}
 */
export default function EditorWindow({
  title,
  dataMap,
  onDone,
  onClose,
  show,
}) {
  const [elementsWithScrollbar, setElementsWithScrollbar] = useState([]);

  function removeVerticalScrollbars() {
    const elements = document.querySelectorAll("*");

    const elementsWithScrollbar = [];
    elements.forEach((/** @type {HTMLElement} */ element) => {
      if (element.scrollHeight > element.clientHeight) {
        elementsWithScrollbar.push({
          element,
          overflowX: element.style.overflowX || null,
          overflowY: element.style.overflowY || null,
        });
        // Set overflow to hidden
        element.style.overflow = "hidden";
      }
    });

    setElementsWithScrollbar(elementsWithScrollbar);
  }

  function restoreVerticalScrollbars() {
    elementsWithScrollbar.forEach(({ element, overflowX, overflowY }) => {
      if (overflowX || overflowY) {
        element.style.overflowX = overflowX;
        element.style.overflowY = overflowY;
      } else {
        element.style.removeProperty("overflow");
      }
    });
  }

  /**
   * @param {Data} data
   * @param {HTMLElement} element
   */
  function handleInputChange(data, element) {}

  /**
   * @param {string} identifier
   * @param {Data} data
   */
  function createElement(identifier, data) {
    let htmlInput;

    if (data.type == "textarea") {
      htmlInput = (
        <textarea
          id={identifier}
          onChange={(e) => handleInputChange(data, e.target)}
        >
          {data.content}
        </textarea>
      );
    } else if (data.type == "textarea_rich") {
      htmlInput = (
        <textarea
          id={identifier}
          onChange={(e) => handleInputChange(data, e.target)}
        >
          {data.content}
        </textarea>
      );
    } else {
      htmlInput = (
        <input
          id={identifier}
          type={data.type}
          onChange={(e) => handleInputChange(data, e.target)}
          value={data.content}
        />
      );
    }

    return (
      <>
        <label htmlFor={identifier}>{data.label}:</label>
        {htmlInput}
        <input id={`hidden_${identifier}`} type="hidden" value={data.content} />
        <div />
        <div id={`error_${identifier}`} className="editor_window_error" />
      </>
    );
  }

  useEffect(() => {
    if (show) {
      removeVerticalScrollbars();
    } else {
      restoreVerticalScrollbars();
    }
  }, [show]);

  return (
    show && (
      <div id="editor_window_wrapper">
        <div id="editor_window">
          <h1>{title}</h1>
          <div id="editor_window_content">
            {Object.keys(dataMap).map((identifier) => {
              const data = dataMap[identifier];
              return createElement(identifier, data);
            })}
          </div>
          <div id="editor_window_buttons">
            <Button onPress={onClose}>Close</Button>
            <Button onPress={onDone}>Save</Button>
          </div>
        </div>
      </div>
    )
  );
}
