/**
 * Table.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */
import React from "react"

import "./Table.css"

/**
 * @param {number} number
 */
const oddOrEven = (number) => (number % 2 === 0 ? "odd" : "even")

/**
 * @param {number} numberOfColumns
 * @param {Array.<string>} columnSizes
 * @returns {Array.<string>}
 */
const createColumnSizesArray = (numberOfColumns, columnSizes) => {
  const columnSizesArray = []

  for (let i = 0; i < numberOfColumns; i++) {
    columnSizesArray[i] = columnSizes[i] || "min-content"
  }

  if (columnSizes.length < columnSizesArray.length - 1) {
    columnSizesArray[numberOfColumns - 1] = "1fr"
  }

  return columnSizesArray
}

/**
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number} props.numberOfColumns - Number of columns
 * @param {Array.<string>} [props.columnSizes] - An array with column sizes
 * @param {boolean} [props.highlightRow]
 */
const Table = ({
  children,
  numberOfColumns,
  columnSizes = [],
  highlightRow = false,
}) => {
  /**
   * Array containing the sizes of individual columns.
   * If a size is not provided for a column, it defaults to "min-content".
   * @type {Array.<string>}
   */
  const columnSizesArray = createColumnSizesArray(numberOfColumns, columnSizes)

  let classNames = "table"
  if (highlightRow) {
    classNames += " table-highlight-rows"
  }

  return (
    <div
      className={classNames}
      style={{ gridTemplateColumns: columnSizesArray.join(" ") }}
    >
      {children}
    </div>
  )
}

export default Table

/**
 * Renders a table header with children.
 *
 * @param {Object} props - The props for the Header component.
 * @param {React.ReactNode} props.children - The content of the table header.
 */
export const Header = ({ children }) => (
  <div className="table-header">
    {React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        const classNames = `table-header-data table-col-${oddOrEven(
          index
        )} table-cell ${child.props.className || ""}`

        return (
          <div
            key={index}
            className={classNames}
            onClick={child.props.onClick || null}
          >
            {child.props.children || "\u00a0"}
          </div>
        )
      }

      return null
    })}
  </div>
)

/**
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.children]
 * @param {() => void} [props.onClick]
 * @param {string} [props.className]
 */
export const HeaderCell = ({ children, onClick, className }) => null

/**
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number} props.rowIndex
 * @param {() => void} [props.onClick]
 */
export const Row = ({ children, rowIndex, onClick }) => (
  <div
    className={`table-row table-row-${oddOrEven(rowIndex)}`}
    onClick={onClick || null}
  >
    {React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        const classNames = `table-row-${
          // @ts-ignore
          child.type.name === "RowTitle" ? "title" : "data"
        } table-col-${oddOrEven(index)} table-cell ${
          child.props.className || ""
        }`

        return (
          <div key={index} className={classNames}>
            {child.props.children || "\u00a0"}
          </div>
        )
      }

      return null
    })}
  </div>
)

/**
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.className]
 */
export const RowTitle = ({ children, className }) => null

/**
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.className]
 */
export const RowCell = ({ children, className }) => null

/**
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const NoData = ({ children }) => (
  <div className="table-no-data">{children}</div>
)
