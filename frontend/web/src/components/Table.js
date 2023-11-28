import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

import "../styles/components/Table.css";

/**
 * Represents a cell in a row.
 *
 * @typedef {React.ReactNode} Cell
 * @property {React.ReactNode} [children] - The content of the cell.
 */

/**
 * Represents a row in the table.
 *
 * @typedef {React.ReactNode} Row
 * @property {Cell[]} children - An array of cells within the row.
 * @property {() => void} [onClick] - An optional callback function to handle row click.
 */

/**
 * @typedef {Array<object>} Columns
 * @property {string} title
 * @property {string} size
 * @property {string} className
 */

/**
 * Represents the Table props.
 *
 * @typedef {object} Props
 * @property {Row[]} children - An array of rows for the table.
 * @property {Columns} columns
 * @property {string} [highlightClass] - An optional class for highlighting rows.
 */

/**
 * Represents data for a table header.
 *
 * @typedef {object} HeaderData
 * @property {React.ReactNode} content - The content of the header cell.
 * @property {string} className - The CSS class name for the header cell.
 */

/**
 * Represents data for a table row.
 *
 * @typedef {object} RowData
 * @property {React.ReactNode} content - The content of the row cell.
 * @property {string} className - The CSS class name for the row cell.
 * @property {() => void | null} onClick - A function to handle row click, or null.
 * @property {() => void | null} onMouseOver - A function to handle mouseover, or null.
 * @property {() => void | null} onMouseOut - A function to handle mouseout, or null.
 */

/**
 * Represents the Table state.
 *
 * @typedef {object} State
 * @property {string} gridTemplateColumns
 * @property {HeaderData[]} headerData - An array of header data.
 * @property {RowData[]} rowData - An array of content data.
 * @property {string} highlightClass - The CSS class for highlighting rows.
 */

/**
 * A table component.
 *
 * @extends Component<Props, State>
 */
export default class Table extends Component {
  // Define default props and their types using PropTypes
  static defaultProps = {
    highlightClass: "table-row-highlight",
    colClassNames: [],
  };

  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    columns: PropTypes.arrayOf(PropTypes.object),
    highlightClass: PropTypes.string,
  };

  state = {
    gridTemplateColumns: "",
    headerData: [],
    rowData: [],
    highlightClass: this.props.highlightClass,
  };

  /**
   * @param {Props | Readonly<Props>} props
   */
  constructor(props) {
    super(props);

    this.state = {
      gridTemplateColumns: this.buildGridTemplateColumns(this.props.columns),
      headerData: this.buildHeaderData(this.props.columns),
      rowData: this.buildContentData(this.props.children, this.props.columns),
      highlightClass: this.props.highlightClass,
    };
  }

  /**
   * Updates the component state when props change.
   * @param {Props} prevProps - The previous props.
   * @param {State} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.children !== prevProps.children ||
      this.props.columns !== prevProps.columns ||
      this.props.highlightClass !== prevProps.highlightClass
    ) {
      this.setState({
        gridTemplateColumns: this.buildGridTemplateColumns(this.props.columns),
        headerData: this.buildHeaderData(this.props.columns),
        rowData: this.buildContentData(this.props.children, this.props.columns),
        highlightClass: this.props.highlightClass,
      });
    }
  }

  /**
   * Builds header data for the table.
   *
   * @param {Columns} columns - An array of column titles.
   * @returns {string} - An array of header data.
   * @private
   */
  buildGridTemplateColumns(columns) {
    let template = "";
    for (let i = 0; i < columns.length; i++) {
      template = template + " " + columns[i].size || "1fr";
    }
    return template;
  }

  /**
   * Builds header data for the table.
   *
   * @param {Columns} columns - An array of column titles.
   * @returns {HeaderData[]} - An array of header data.
   * @private
   */
  buildHeaderData(columns) {
    return columns.map((column, colIndex) => ({
      content: column.title || "\u00a0",
      className: `table-header table-header-col-${colIndex} table-header-cell ${
        column.className || ""
      }`,
    }));
  }

  /**
   * Builds content data for the table.
   *
   * @param {Row[]} rows - An array of rows.
   * @param {Columns} columns - An array of column class names.
   * @returns {RowData[]} - An array of content data.
   * @private
   */
  buildContentData(rows, columns) {
    const data = [];

    React.Children.forEach(rows, (rowChilds, rowIndex) => {
      if (!React.isValidElement(rowChilds)) {
        return;
      }

      const rowUID = uuidv4();

      React.Children.forEach(rowChilds.props.children, (child, colIndex) => {
        if (!React.isValidElement(child)) {
          return;
        }

        data.push({
          content: child.props.children || "\u00a0",
          className: `table-row table-row-${rowIndex} table-row-${
            rowIndex % 2 === 0 ? "odd" : "even"
          } table-row-${rowUID} table-col-${colIndex} table-col-${
            colIndex % 2 === 0 ? "odd" : "even"
          } table-cell ${columns[colIndex].className || ""}`,
          onClick: rowChilds.props.onClick || null,
          onMouseOver: rowChilds.props.onClick
            ? () => {
                this.addHighlight(rowUID);
              }
            : null,
          onMouseOut: rowChilds.props.onClick
            ? () => {
                this.removeHighlight(rowUID);
              }
            : null,
        });
      });
    });

    return data;
  }

  /**
   * Adds highlighting to table rows with the given id.
   *
   * @param {(number|string)} id - The id of the rows to highlight.
   * @private
   */
  addHighlight(id) {
    const elements = document.getElementsByClassName("table-row-" + id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add(this.state.highlightClass);
    }
  }

  /**
   * Removes highlighting from table rows with the given id.
   *
   * @param {(number|string)} id - The id of the rows to remove highlight from.
   * @private
   */
  removeHighlight(id) {
    const elements = document.getElementsByClassName("table-row-" + id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove(this.state.highlightClass);
    }
  }

  /**
   * Renders the Table component.
   *
   * @returns {JSX.Element} The rendered table component.
   */
  render() {
    return (
      <div
        className={"table"}
        style={{
          gridTemplateColumns: this.state.gridTemplateColumns,
        }}
      >
        {this.state.headerData.map((data, index) => (
          <div key={index} className={data.className}>
            {data.content}
          </div>
        ))}
        {this.state.rowData.map((data, index) => (
          <div
            key={index}
            onClick={data.onClick}
            onMouseOver={data.onMouseOver}
            onMouseOut={data.onMouseOut}
            className={data.className}
          >
            {data.content}
          </div>
        ))}
      </div>
    );
  }
}

/**
 * Creates a row for the table.
 *
 * @component
 * @param {object} props
 * @param {Cell[]} props.children - An array of row cells.
 * @param {() => void} [props.onClick] - An optional callback function to handle row click.
 * @returns {Cell[]}
 */
export const Row = ({ children, onClick }) => {
  return children;
};

Row.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  onClick: PropTypes.func,
};

/**
 * Creates a cell for a row.
 *
 * @component
 * @param {object} props
 * @param {React.ReactNode} [props.children] - The content for the cell.
 * @returns {React.ReactNode}
 */
export const Cell = ({ children }) => {
  return children;
};

Cell.propTypes = {
  children: PropTypes.node,
};
