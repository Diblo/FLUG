const fs = require("fs")
const path = require("path")

const DATABASE_DATA = {}

/**
 * Represents the available data types.
 *
 * @typedef {Object} Types
 * @property {string} STRING - Represents the string data type.
 * @property {string} INTEGER - Represents the integer data type.
 * @property {string} OBJECT - Represents the object data type.
 */
const Types = {
  STRING: "string",
  INTEGER: "integer",
  OBJECT: "object",
}

const _table = {
  string: (param) => {
    return typeof param === "string"
  },
  integer: (param) => {
    return Number.isInteger(param)
  },
  object: (param) => {
    return Object.prototype.toString.call(param) === "[object Object]"
  },
}

/**
 * Check if a parameter has one of the specified types.
 *
 * @param {*} param - The parameter to check.
 * @param {string} paramName - The name of the parameter for error messages.
 * @param {string|string[]} types - The allowed type(s). Can be a single type or an array of types.
 * @throws Will throw an error if the parameter type is not supported or if the parameter does not match the expected type(s).
 */
function isParamType(param, paramName, types) {
  const allowedTypes = Array.isArray(types) ? types : [types]

  const isValidType = allowedTypes.some((type) => {
    if (!_table.hasOwnProperty(type)) {
      throw new Error("Unknown or unsupported data type: " + type)
    }

    return _table[type](param)
  })

  if (!isValidType) {
    throw new Error(
      `Invalid input for ${paramName}. Expected ${allowedTypes.join(" or ")}.`,
    )
  }
}

/**
 * Create a new table in the database.
 *
 * @param {string} table - Table name (e.g., "users", "blogs").
 */
function createTable(table) {
  isParamType(table, "table", Types.STRING)
  DATABASE_DATA[table] = { increment: 0 }
}

/**
 * Exports database data to a JSON file.
 *
 * @param {string} filename - The name of the file to export the data to. It should be relative to this file.
 */
function exportData(filename) {
  const filePath = path.join(__dirname, filename)

  try {
    fs.writeFileSync(filePath, JSON.stringify(DATABASE_DATA), "utf-8")
    console.log(`Database data exported successfully to '${filePath}'`)
  } catch (err) {
    console.error("Error exporting database data:", err)
  }
}

/**
 * Database class for handling data operations.
 *
 * @class
 * @constructor
 */
class Database {
  constructor() {
    const filePath = path.join(__dirname, "../data/database.json")
    if (!fs.existsSync(filePath)) {
      throw new Error(`File does not exist at path: ${filePath}`)
    }

    try {
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"))

      for (const table in data) {
        DATABASE_DATA[table] = data[table]
      }
    } catch (err) {
      throw new Error("Error parsing database file: " + err.message)
    }
  }

  /**
   * Add data to the database.
   *
   * @param {string} table - Table name (e.g., "users", "blogs").
   * @param {object} data - Data to be added.
   * @returns {number} - Data ID.
   * @throws Will throw an error if the input parameters do not match the expected types.
   */
  add(table, data) {
    isParamType(table, "table", Types.STRING)
    isParamType(data, "data", Types.OBJECT)

    data.uid = DATABASE_DATA[table].increment++
    DATABASE_DATA[table][data.uid] = data
    return parseInt(data.uid)
  }

  /**
   * Retrieve data from the database by UID.
   *
   * @param {string} table - Table name (e.g., "users", "blogs").
   * @param {number} uid - Data ID.
   * @returns {object|null} - Retrieved data.
   * @throws Will throw an error if the input parameters do not match the expected types.
   */
  get(table, uid) {
    isParamType(table, "table", Types.STRING)
    isParamType(uid, "uid", Types.INTEGER)

    if (DATABASE_DATA[table][uid]) {
      return DATABASE_DATA[table][uid]
    }
    return null
  }

  /**
   * Retrieve a range of data from the database.
   *
   * @param {string} table - Table name (e.g., "users", "blogs").
   * @param {number} begin - Start index of the data range.
   * @param {number} max - Maximum number of items to retrieve.
   * @returns {Array} - An array of data within the specified range.
   * @throws Will throw an error if the input parameters do not match the expected types.
   */
  gets(table, begin, max) {
    isParamType(table, "table", Types.STRING)
    isParamType(begin, "begin", Types.INTEGER)
    isParamType(max, "max", Types.INTEGER)

    const keys = Object.keys(DATABASE_DATA[table]).filter(
      (key) => key !== "increment",
    )
    const startIndex = begin
    const endIndex = Math.min(startIndex + max, keys.length) // Ensure we don't go out of bounds.

    if (startIndex >= keys.length) {
      return [] // If "begin" is out of bounds, return an empty array.
    }

    const data = []
    for (let i = startIndex; i < endIndex; i++) {
      data.push(DATABASE_DATA[table][keys[i]])
    }
    return data
  }

  /**
   * Retrieves data by value from a database table based on specified criteria.
   *
   * @param {string} table - The name of the database table.
   * @param {string} column - The column to match the value against.
   * @param {string|number} value - The value to match in the specified column.
   * @returns {Array} - An array of data matching the specified criteria.
   * @throws Will throw an error if the input parameters do not match the expected types.
   */
  getsByValue(table, column, value) {
    isParamType(table, "table", Types.STRING)
    isParamType(column, "column", Types.STRING)
    isParamType(value, "value", [Types.STRING, Types.NUMBER])

    const keys = Object.keys(DATABASE_DATA[table]).filter(
      (key) => key !== "increment",
    )

    /**
     * Array to store data matching the specified criteria.
     * @type {Array}
     */
    const data = []

    for (const uid of keys) {
      if (DATABASE_DATA[table][uid][column] === value) {
        data.push(DATABASE_DATA[table][uid])
      }
    }

    return data
  }

  /**
   * Update data in the database.
   *
   * @param {string} table - Table name (e.g., "users", "blogs").
   * @param {number} uid - Data ID.
   * @param {object} data - Data to be updated.
   * @throws Will throw an error if the input parameters do not match the expected types.
   */
  update(table, uid, data) {
    isParamType(table, "table", Types.STRING)
    isParamType(uid, "uid", Types.INTEGER)
    isParamType(data, "data", Types.OBJECT)

    if (DATABASE_DATA[table][uid]) {
      data.uid = uid
      for (const key in data) {
        DATABASE_DATA[table][uid][key] = data[key]
      }
    }
  }

  /**
   * Check if data with the specified UID exists in the database.
   *
   * @param {string} table - Table name (e.g., "users", "blogs").
   * @param {number} uid - Data ID.
   * @returns {boolean} - True if the data with the specified UID exists, false otherwise.
   * @throws Will throw an error if the input parameters do not match the expected types.
   */
  exists(table, uid) {
    isParamType(table, "table", Types.STRING)
    isParamType(uid, "uid", Types.INTEGER)

    return DATABASE_DATA[table].hasOwnProperty(uid)
  }

  /**
   * Delete data from the database.
   *
   * @param {string} table - Table name (e.g., "users", "blogs").
   * @param {number} uid - Data ID.
   * @throws Will throw an error if the input parameters do not match the expected types.
   */
  delete(table, uid) {
    isParamType(table, "table", Types.STRING)
    isParamType(uid, "uid", Types.INTEGER)

    if (DATABASE_DATA[table][uid]) {
      delete DATABASE_DATA[table][uid]
    }
  }

  /**
   * Count the number of items in the database.
   *
   * @param {string} table - Table name (e.g., "users", "blogs").
   * @returns {number} - Count of items.
   * @throws Will throw an error if the input parameters do not match the expected types.
   */
  countRows(table) {
    isParamType(table, "table", Types.STRING)

    return Object.keys(DATABASE_DATA[table]).length - 1
  }
}

const database = new Database()

module.exports = {
  createTable,
  exportData,
  database,
}
