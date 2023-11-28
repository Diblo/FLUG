const ValueTypes = {
  STRING: "string",
  STR: "string",
  INTEGER: "integer",
  INT: "integer",
  FILE: "file",
  FLOAT: "float",
  OBJECT: "object",
  OBJ: "object",
  ARRAY: "array",
  BOOLEAN: "boolean",
  BOOL: "boolean",
  NULL: "null",
  EMAIL: "email",
  DATE: "date",
  SLUG: "slug",
  URI: "uri",
  METHOD: "method",
};

const fileRegex = /^[a-zA-Z0-9-_]+\.[a-zA-Z]{2,4}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const slugRegex = /^(?!-)[a-z0-9-]+(?<!-)$/;
const domainRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})(\/|$)/;
const urlRegex =
  /^[a-zA-Z0-9\-._~!$&'()*+,;=:@%\/]+(\?[a-zA-Z0-9\-._~!$&'()*+,;=:@%\/]+)?(#\w*)?$/;

/**
 * Validates the data type of a value based on the specified type.
 *
 * @param {any} value - The value to validate.
 * @param {string} type - The expected data type (e.g., "email", "date", "slug").
 * @returns {boolean} - True if the value matches the expected data type; otherwise, false.
 */
function isType(value, type) {
  switch (type) {
    case "string":
      return typeof value === "string";
    case "file":
      return fileRegex.test(value);
    case "integer":
      return Number.isInteger(value);
    case "float":
      return typeof value === "number" && !Number.isInteger(value);
    case "object":
      return Object.prototype.toString.call(value) === "[object Object]";
    case "array":
      return Array.isArray(value);
    case "boolean":
      return typeof value === "boolean";
    case "null":
      return value === null;
    case "date":
      return !isNaN(Date.parse(value));
    case "email":
      return emailRegex.test(value);
    case "slug":
      return slugRegex.test(value);
    case "uri":
      return !domainRegex.test(value) && urlRegex.test(value);
    case "method":
      return (
        value === "GET" ||
        value === "POST" ||
        value === "PATCH" ||
        value === "DELETE"
      );
    default:
      throw new Error("Unknown or unsupported data type: " + type);
  }
}

function validateBySchema(json, schema, path) {
  for (const key in schema) {
    if (!json.hasOwnProperty(key)) {
      throw new Error(
        `The '${path !== "" ? path + "." : ""}${key}' is missing.`
      );
    }

    const curPath = path !== "" ? path + "." + key : key;
    const schemaType = schema[key];
    const jsonValue = json[key];

    if (isType(schemaType, ValueTypes.ARRAY)) {
      let valid = false;
      let types = [];
      for (const sType of schemaType) {
        if (isType(sType, ValueTypes.OBJECT)) {
          if (isType(jsonValue, ValueTypes.OBJECT)) {
            validateBySchema(jsonValue, sType, curPath);
            valid = true;
            break;
          }
          types.push(ValueTypes.OBJECT);
        } else {
          if (isType(jsonValue, sType)) {
            valid = true;
            break;
          }
          types.push(sType);
        }
      }
      if (!valid) {
        throw new Error(
          `The '${curPath}' should be ${
            types.length > 1 ? "one of: " : ""
          }${types.join(", ")}.`
        );
      }
    } else if (isType(schemaType, ValueTypes.OBJECT)) {
      if (!isType(jsonValue, ValueTypes.OBJECT)) {
        throw new Error(`The '${curPath}' should be the type object.`);
      }

      validateBySchema(jsonValue, schemaType, curPath);
    } else if (!isType(jsonValue, schemaType)) {
      throw new Error(`The '${curPath}' should be the type ${schemaType}.`);
    }
  }
}

function validateByJson(json, schema, path) {
  for (const key in json) {
    if (!schema.hasOwnProperty(key)) {
      throw new Error(
        `Illegal object '${path !== "" ? path + "." : ""}${key}'.`
      );
    }

    const curPath = path !== "" ? path + "." + key : key;
    const schemaType = schema[key];
    const jsonObj = json[key];

    if (isType(jsonObj, ValueTypes.OBJECT)) {
      if (isType(schemaType, ValueTypes.ARRAY)) {
        let errorMsg = null;
        let valid = false;

        for (const sType of schemaType) {
          if (isType(sType, ValueTypes.OBJECT)) {
            try {
              validateByJson(jsonObj, sType, curPath);
              valid = true;
            } catch (error) {
              errorMsg = error.message;
            }
          }
        }

        if (valid === false) {
          throw new Error(errorMsg);
        }
      } else {
        validateByJson(jsonObj, schemaType, curPath);
      }
    }
  }
}

function validateSchema(json, schema, path = "") {
  validateBySchema(json, schema, path);
  validateByJson(json, schema, path);
}

function validatePage(json, pageSchema, itemSchema) {
  validateSchema(json, pageSchema);

  for (const index in json.items) {
    validateSchema(json.items[index], itemSchema, `items.${index}`);
  }
}

function validateValue(json, path, compareTo) {
  let obj = getNestedObject(json, path);

  if (obj !== compareTo) {
    throw new Error(
      `The '${path}' should be '${compareTo}' instead of '${obj}'.`
    );
  }
}

function validateSize(json, path, size) {
  let obj = getNestedObject(json, path);

  if (obj.lenght === size) {
    throw new Error(
      `The '${path}' should have ${size} items instead of ${obj.lenght}.`
    );
  }
}

function getNestedObject(obj, path) {
  for (const key of path.split(".")) {
    if (obj === undefined || obj === null) {
      throw new Error(
        `Invalid path: '${path}'. The object '${key}' does not exist.`
      );
    }

    obj = obj[key];
  }
  return obj;
}

module.exports = {
  ValueTypes,
  validateSchema,
  validatePage,
  validateValue,
  validateSize,
};
