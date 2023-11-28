const DATABASE_DATA = {};

const Types = {
  STRING: "string",
  INTEGER: "integer",
  OBJECT: "object",
};

function isParamType(param, paramName, type) {
  switch (type) {
    case "string":
      if (typeof param === "string") return;
      break;
    case "integer":
      if (Number.isInteger(param)) return;
      break;
    case "object":
      if (Object.prototype.toString.call(param) === "[object Object]") return;
      break;
    default:
      throw new Error("Unknown or unsupported data type: " + type);
  }

  throw new Error(`Invalid input for ${paramName}. Expected an ${type}.`);
}

/**
 * Create a new table in the database.
 *
 * @param {string} table - Table name (e.g., "users", "blogs").
 */
function createTable(table) {
  isParamType(table, "table", Types.STRING);
  DATABASE_DATA[table] = { increment: 0 };
}

class Database {
  /**
   * Add data to the database.
   *
   * @param {string} table - Table name (e.g., "users", "blogs").
   * @param {object} data - Data to be added.
   * @returns {number} - Data ID.
   */
  add(table, data) {
    isParamType(table, "table", Types.STRING);
    isParamType(data, "data", Types.OBJECT);

    data.uid = DATABASE_DATA[table].increment++;
    DATABASE_DATA[table][data.uid] = data;
    return parseInt(data.uid);
  }

  /**
   * Retrieve data from the database by UID.
   *
   * @param {string} table - Table name (e.g., "users", "blogs").
   * @param {number} uid - Data ID.
   * @returns {object|null} - Retrieved data.
   */
  get(table, uid) {
    isParamType(table, "table", Types.STRING);
    isParamType(uid, "uid", Types.INTEGER);

    if (DATABASE_DATA[table][uid]) {
      return DATABASE_DATA[table][uid];
    }
    return null;
  }

  /**
   * Retrieve a range of data from the database.
   *
   * @param {string} table - Table name (e.g., "users", "blogs").
   * @param {number} begin - Start index of the data range.
   * @param {number} max - Maximum number of items to retrieve.
   * @returns {Array} - An array of data within the specified range.
   */
  gets(table, begin, max) {
    isParamType(table, "table", Types.STRING);
    isParamType(begin, "begin", Types.INTEGER);
    isParamType(max, "max", Types.INTEGER);

    const keys = Object.keys(DATABASE_DATA[table]).filter(
      (key) => key !== "increment"
    );
    const startIndex = begin;
    const endIndex = Math.min(startIndex + max, keys.length); // Ensure we don't go out of bounds.

    if (startIndex >= keys.length) {
      return []; // If "begin" is out of bounds, return an empty array.
    }

    const data = [];
    for (let i = startIndex; i < endIndex; i++) {
      data.push(DATABASE_DATA[table][keys[i]]);
    }
    return data;
  }

  /**
   * Update data in the database.
   *
   * @param {string} table - Table name (e.g., "users", "blogs").
   * @param {number} uid - Data ID.
   * @param {object} data - Data to be updated.
   */
  update(table, uid, data) {
    isParamType(table, "table", Types.STRING);
    isParamType(uid, "uid", Types.INTEGER);
    isParamType(data, "data", Types.OBJECT);

    if (DATABASE_DATA[table][uid]) {
      data.uid = uid;
      for (const key in data) {
        DATABASE_DATA[table][uid][key] = data[key];
      }
    }
  }

  exists(table, uid) {
    isParamType(table, "table", Types.STRING);
    isParamType(uid, "uid", Types.INTEGER);

    return DATABASE_DATA[table].hasOwnProperty(uid);
  }

  /**
   * Delete data from the database.
   *
   * @param {string} table - Table name (e.g., "users", "blogs").
   * @param {number} uid - Data ID.
   */
  delete(table, uid) {
    isParamType(table, "table", Types.STRING);
    isParamType(uid, "uid", Types.INTEGER);

    if (DATABASE_DATA[table][uid]) {
      delete DATABASE_DATA[table][uid];
    }
  }

  /**
   * Count the number of items in the database.
   *
   * @param {string} table - Table name (e.g., "users", "blogs").
   * @returns {number} - Count of items.
   */
  countRows(table) {
    isParamType(table, "table", Types.STRING);

    return Object.keys(DATABASE_DATA[table]).length - 1;
  }

  /**
   * Retrieve data from the database by its slug.
   *
   * @param {string} table - Table name (e.g., "users", "blogs").
   * @param {string} slug - The slug used to identify the data.
   * @returns {number|null} - The data ID for the specified slug or null if not found.
   */
  getIdBySlug(table, slug) {
    isParamType(table, "table", Types.STRING);
    isParamType(slug, "slug", Types.STRING);

    for (const uid in DATABASE_DATA[table]) {
      if (DATABASE_DATA[table][uid].slug === slug) {
        return parseInt(uid);
      }
    }
    return null;
  }
}

const database = new Database();

module.exports = {
  createTable,
  Database,
  database,
};
