/**
 * Copyright (c) 2024 Fyns Linux User Group
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * File: Date.js
 */
import React from "react";

import { DateTime } from "../../utils/datetime";

/**
 * Local Date Component
 *
 * This component displays a date in a localized format, extracted from an ISO 8601 timestamp.
 *
 * @param {Object} props
 * @param {string} props.children
 */
export function LocalDate({ children }) {
  const dateTime = new DateTime(children);
  return <span title={dateTime.localDateTime()}>{dateTime.localDate()}</span>;
}

/**
 * Local Date Time Component
 *
 * This component displays a date and time in a localized format, extracted from an ISO 8601 timestamp.
 *
 * @param {Object} props
 * @param {string} props.children
 */
export function LocalDateTime({ children }) {
  const dateTime = new DateTime(children);
  return dateTime.localDateTime();
}
