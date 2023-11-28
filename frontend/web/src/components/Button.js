import React from "react";

import "../styles/components/Button.css";

/**
 * Button Component
 *
 * This component represents a button element with default styles and behavior.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content or components rendered within the button.
 * @param {() => void} [props.onPress] - The function to be called when the button is clicked.
 * @param {('default'|'add'|'delete')} [props.buttonStyle="default"] - The style of the button, e.g., "add", "delete", or "default".
 * @param {boolean} [props.disabled] - Indicates if the button is disabled.
 * @param {string} [props.className]
 * @returns {JSX.Element}
 */
export default function Button({
  children,
  onPress,
  buttonStyle="default",
  disabled,
  className,
}) {
  let buttonClassNames = "button " + buttonStyle;
  if (className) {
    buttonClassNames = buttonClassNames + " " + className;
  }

  return (
    <button
      type="button"
      className={buttonClassNames}
      onClick={onPress || null}
      disabled={disabled || false}
    >
      {children}
    </button>
  );
}
