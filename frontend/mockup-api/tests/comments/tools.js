const { faker } = require("@faker-js/faker")
const path = require("path")
const fs = require("fs")
var imageDataURI = require("image-data-uri")
const request = require("supertest")

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
}

const fileRegex = /^[a-zA-Z0-9-_]+\.[a-zA-Z]{2,4}$/
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
const slugRegex = /^(?!-)[a-z0-9-]+(?<!-)$/
const domainRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})(\/|$)/
const urlRegex =
  /^[a-zA-Z0-9\-._~!$&'()*+,;=:@%\/]+(\?[a-zA-Z0-9\-._~!$&'()*+,;=:@%\/]+)?(#\w*)?$/

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
      return typeof value === "string"
    case "file":
      return fileRegex.test(value)
    case "integer":
      return Number.isInteger(value)
    case "float":
      return typeof value === "number" && !Number.isInteger(value)
    case "object":
      return Object.prototype.toString.call(value) === "[object Object]"
    case "array":
      return Array.isArray(value)
    case "boolean":
      return typeof value === "boolean"
    case "null":
      return value === null
    case "date":
      return !isNaN(Date.parse(value))
    case "email":
      return emailRegex.test(value)
    case "slug":
      return slugRegex.test(value)
    case "uri":
      return !domainRegex.test(value) && urlRegex.test(value)
    case "method":
      return (
        value === "GET" ||
        value === "POST" ||
        value === "PATCH" ||
        value === "DELETE"
      )
    default:
      throw new Error("Unknown or unsupported data type: " + type)
  }
}

function validateBySchema(json, schema, path) {
  for (const key in schema) {
    if (!json.hasOwnProperty(key)) {
      throw new Error(
        `The '${path !== "" ? path + "." : ""}${key}' is missing.`,
      )
    }

    const curPath = path !== "" ? path + "." + key : key
    const schemaType = schema[key]
    const jsonValue = json[key]

    if (isType(schemaType, ValueTypes.ARRAY)) {
      let valid = false
      let types = []
      for (const sType of schemaType) {
        if (isType(sType, ValueTypes.OBJECT)) {
          if (isType(jsonValue, ValueTypes.OBJECT)) {
            validateBySchema(jsonValue, sType, curPath)
            valid = true
            break
          }
          types.push(ValueTypes.OBJECT)
        } else {
          if (isType(jsonValue, sType)) {
            valid = true
            break
          }
          types.push(sType)
        }
      }
      if (!valid) {
        throw new Error(
          `The '${curPath}' should be ${
            types.length > 1 ? "one of: " : ""
          }${types.join(", ")}.`,
        )
      }
    } else if (isType(schemaType, ValueTypes.OBJECT)) {
      if (!isType(jsonValue, ValueTypes.OBJECT)) {
        throw new Error(`The '${curPath}' should be the type object.`)
      }

      validateBySchema(jsonValue, schemaType, curPath)
    } else if (!isType(jsonValue, schemaType)) {
      throw new Error(`The '${curPath}' should be the type ${schemaType}.`)
    }
  }
}

function validateByJson(json, schema, path, maxDepth, depth = 0) {
  for (const key in json) {
    if (!schema.hasOwnProperty(key)) {
      throw new Error(
        `Illegal object '${path !== "" ? path + "." : ""}${key}'.`,
      )
    }

    const curPath = path !== "" ? path + "." + key : key
    const schemaType = schema[key]
    const jsonObj = json[key]

    if (
      (!Number.isInteger(maxDepth) || maxDepth !== depth) &&
      isType(jsonObj, ValueTypes.OBJECT)
    ) {
      if (isType(schemaType, ValueTypes.ARRAY)) {
        let errorMsg = null
        let valid = false

        for (const sType of schemaType) {
          if (isType(sType, ValueTypes.OBJECT)) {
            try {
              validateByJson(jsonObj, sType, curPath, maxDepth, depth + 1)
              valid = true
            } catch (error) {
              errorMsg = error.message
            }
          }
        }

        if (valid === false) {
          throw new Error(errorMsg)
        }
      } else {
        validateByJson(jsonObj, schemaType, curPath, maxDepth, depth + 1)
      }
    }
  }
}

function validateSchema(json, path, schema, maxDepth) {
  let obj = getNestedObject(json, path)

  validateBySchema(obj, schema, path, maxDepth)
  validateByJson(obj, schema, path, maxDepth)
}

function validateArraySchema(json, path, itemSchema, maxDepth) {
  let obj = getNestedObject(json, path)

  for (const index in obj) {
    validateBySchema(obj[index], itemSchema, `${path}[${index}]`, maxDepth)
    validateByJson(obj[index], itemSchema, `${path}[${index}]`, maxDepth)
  }
}

function validateValue(json, path, compareTo) {
  let obj = getNestedObject(json, path)

  if (obj !== compareTo) {
    throw new Error(
      `The '${path}' should be '${compareTo}' instead of '${obj}'.`,
    )
  }
}

function validateSize(json, path, size) {
  let obj = getNestedObject(json, path)

  if (obj.lenght === size) {
    throw new Error(
      `The '${path}' should have ${size} items instead of ${obj.lenght}.`,
    )
  }
}

function getNestedObject(obj, path) {
  if (path) {
    for (const key of path.split(".")) {
      if (obj === undefined || obj === null) {
        throw new Error(
          `Invalid path: '${path}'. The object '${key}' does not exist.`,
        )
      }

      obj = obj[key]
    }
  }
  return obj
}

function generateLoremWithinRange(minLength, maxLength) {
  function generateLoremText(loremText) {
    if (loremText.length < maxLength - 1) {
      return generateLoremText(`${loremText} ${faker.lorem.word()}`)
    }
    return `${loremText}${faker.lorem.word()}`
  }

  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength

  return generateLoremText(faker.lorem.word()).slice(0, length).trim()
}

function getImageAsDataUri(filepath) {
  return imageDataURI.encode(
    Buffer.from(fs.readFileSync(path.resolve(__dirname, "../", filepath))),
    path.extname(filepath).slice(1),
  )
}

class Request {
  constructor(app, done) {
    this._request = request(app)
    this.done = done
  }

  get(url) {
    this._request = this._request.get(url)
    return this
  }

  post(url, data) {
    this._request = this._request
      .post(url)
      .set("Content-Type", "application/json")
    if (data) {
      this._request = this._request.send(JSON.stringify(data))
    }
    return this
  }

  patch(url, data) {
    this._request = this._request
      .patch(url)
      .set("Content-Type", "application/json")
    if (data) {
      this._request = this._request.send(JSON.stringify(data))
    }
    return this
  }

  delete(url) {
    this._request = this._request.del(url)
    return this
  }

  call(expectStatus, callback) {
    this._request
      .expect("Content-Type", /json/)
      .expect(expectStatus)
      .end((err, res) => {
        if (err) {
          try {
            return this.done(
              new Error(
                `${err.message}. Server Response: ${
                  JSON.parse(res.text).error.message
                }. ${JSON.parse(res.text).error.description}.`,
              ),
            )
          } catch {}
          return this.done(err)
        }

        try {
          callback(JSON.parse(res.text))
        } catch (error) {
          return this.done(error)
        }

        this.done()
      })
  }
}

module.exports = {
  ValueTypes,
  validateSchema,
  validateArraySchema,
  validateValue,
  validateSize,
  generateLoremWithinRange,
  getImageAsDataUri,
  Request,
}
