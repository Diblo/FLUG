import React from "react";
import PropTypes from "prop-types";

/**
 * @param {string} text
 */
function openMsg(text) {
  window.open("mailto:" + atob(text), "_blank");
}

/**
 * Mail To Component
 *
 * This component renders an email address with an `mailto` link that opens the user's email client.
 *
 * @component
 * @param {Object} props
 * @param {string} props.children - The email address to be displayed and linked.
 * @returns {JSX.Element}
 */
export default function MailTo({ children }) {
  return (
    <a onClick={() => openMsg(btoa(children))} style={{ cursor: "pointer" }}>
      {children.replace(/@/g, "(at)")}
    </a>
  );
}

MailTo.propTypes = {
  children: PropTypes.string.isRequired,
};
