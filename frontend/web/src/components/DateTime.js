import React from "react";
import PropTypes from "prop-types";

import { DateTime } from "../utils/datetime";

/**
 * Local Date Component
 *
 * This component displays a date in a localized format, extracted from an ISO 8601 timestamp.
 *
 * @component
 * @param {Object} props
 * @param {string} props.children
 */
export function LocalDate({ children }) {
  const dateTime = new DateTime(children);
  return <div title={dateTime.localDateTime()}>{dateTime.localDate()}</div>;
}

LocalDate.propTypes = {
  children: PropTypes.string.isRequired,
};
