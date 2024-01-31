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
 * File: Table.js
 */
import React from "react"

import "./Table.css"

/**
 * @typedef {object} Title
 * @property {string} title
 * @property {() => void} [onClick]
 * @property {string} [className]
 * @property {string} [size]
 */

/**
 * @typedef {object} Row
 * @property {Array.<Cell>} cells
 * @property {() => void} [onClick]
 */

/**
 * @typedef {object} Cell
 * @property {string} value
 * @property {string} [className]
 */

/**
 * Represents the Table props.
 *
 * @param {object} props
 * @param {Array.<Title>} props.titles
 * @param {Array.<Row>} props.rows
 * @param {string} [props.noRowsMessage]
 * @returns {JSX.Element} The rendered table component.
 */
export default function Table({ titles, rows, noRowsMessage }) {
  const gridTemplateColumns = titles.map((item) => item.size ?? "min-content").join(" ")

  return (
    <div className="table" style={{ gridTemplateColumns }}>
      {titles.map((cell, cellIndex) => (
        <Title
          key={`title-${cellIndex}`}
          cellIndex={cellIndex}
          onClick={cell.onClick}
          className={cell.className}>
          {cell.title}
        </Title>
      ))}

      {noRowsMessage && rows.length === 0 && (
        <div
          className="table-message"
          style={{ gridColumn: `span ${titles.length}` }}>
          {noRowsMessage}
        </div>
      )}

      {rows.map((row, rowIndex) => (
        <Row key={`row-${rowIndex}`} rowIndex={rowIndex} onClick={row.onClick}>
          {row.cells.map((cell, cellIndex) => (
            <RowCell
              key={`rowcell-${rowIndex}-${cellIndex}`}
              cellIndex={cellIndex}
              className={cell.className}>
              {cell.value}
            </RowCell>
          ))}
        </Row>
      ))}
    </div>
  )
}

/**
 *
 * @param {object} props
 * @param {React.ReactNode} [props.children]
 * @param {number} props.cellIndex
 * @param {() => void} [props.onClick]
 * @param {string} [props.className]
 * @returns
 */
const Title = ({ children, cellIndex, onClick, className }) => {
  const classNames = `table-title table-title-${oddOrEven(cellIndex)} ${
    className ?? ""
  }`

  return (
    <div className={classNames} onClick={onClick ?? null}>
      {children ?? "\u00a0"}
    </div>
  )
}

/**
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number} props.rowIndex
 * @param {() => void} [props.onClick]
 * @returns
 */
const Row = ({ children, rowIndex, onClick }) => {
  const className = `table-row table-row-${oddOrEven(rowIndex)}`

  return (
    <div className={className} onClick={onClick ?? null}>
      {children}
    </div>
  )
}

/**
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.children]
 * @param {number} props.cellIndex
 * @param {string} [props.className]
 * @returns
 */
const RowCell = ({ children, cellIndex, className }) => {
  const cellClassName = `table-row-cell table-row-cell-${oddOrEven(
    cellIndex
  )} ${className ?? ""}`

  return <div className={cellClassName}>{children ?? "\u00a0"}</div>
}

/**
 * @param {number} number
 */
const oddOrEven = (number) => {
  return number % 2 === 0 ? "odd" : "even"
}
