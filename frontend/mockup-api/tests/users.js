process.env.API_PORT = 2300

const app = require("../server")
const {
  validateSchema,
  validateArraySchema,
  validateValue,
  validateSize,
  Request,
} = require("./comments/tools")
const {
  pageSchema,
  userSchema,
  userItemSchema,
  successResponseSchema,
  errorResponseSchema,
  errorSchema,
} = require("./comments/schemas")
const config = require("../src/comments/config")
const { faker } = require("@faker-js/faker")

const ENDPOINT_URL = "/" + config.getUsersEndpoint()
const ITEMS_PER_PAGE = config.getItemsPerPage()

/** GET */
function testPage(url, nextHref, page) {
  return (done) => {
    new Request(app, done).get(url).call(200, (response) => {
      /* msg */
      validateSchema(response, "", successResponseSchema, 0)
      validateValue(response, "success", true)
      validateValue(response, "message", "Successfully retrieved the resource.")

      /* page */
      validateSchema(response, "data", pageSchema)

      validateSize(response, "data.items", ITEMS_PER_PAGE)
      validateValue(response, "data.results", ITEMS_PER_PAGE)
      validateValue(response, "data.totalResults", 300)

      if (nextHref) {
        validateValue(response, "data.pagination.next.href", nextHref)
        validateValue(response, "data.pagination.next.title", "Næste")
      } else {
        validateValue(response, "data.pagination.next", null)
      }
      validateValue(response, "data.page", page)
      validateValue(response, "data.totalPages", 3)

      /* items */
      validateArraySchema(response, "data.item", userItemSchema)
    })
  }
}

function testResource(url, uid) {
  return (done) => {
    new Request(app, done).get(url).call(200, (response) => {
      /* msg */
      validateSchema(response, "", successResponseSchema, 0)
      validateValue(response, "success", true)
      validateValue(response, "message", "Successfully retrieved the resource.")

      /* resource */
      validateSchema(response, "data", userSchema)

      validateValue(response, "data.uid", uid)

      validateValue(response, "data._links.self.href", ENDPOINT_URL + "/" + uid)
      validateValue(
        response,
        "data._links.self.title",
        response.data.firstName +
          (response.data.lastName ? " " + response.data.lastName : "")
      )

      validateValue(
        response,
        "data._links.update.href",
        ENDPOINT_URL + "/" + uid
      )
      validateValue(response, "data._links.update.title", "Gem")
      validateValue(response, "data._links.update.method", "PATCH")

      validateValue(
        response,
        "data._links.delete.href",
        ENDPOINT_URL + "/" + uid
      )
      validateValue(response, "data._links.delete.title", "Slet")
      validateValue(response, "data._links.delete.method", "DELETE")
    })
  }
}

/** POST */
function testPost(url, data) {
  return (done) => {
    new Request(app, done).post(url, data).call(201, (response) => {
      /* msg */
      validateSchema(response, "", successResponseSchema, 0)
      validateValue(response, "success", true)
      validateValue(
        response,
        "message",
        "The resource has been created successfully."
      )

      /* resource */
      validateSchema(response, "data", userSchema)

      validateValue(response, "data.firstName", data.firstName)
      validateValue(response, "data.lastName", data.lastName)
      validateValue(response, "data.email", data.email)

      validateValue(
        response,
        "data._links.self.href",
        ENDPOINT_URL + "/" + response.data.uid
      )
      validateValue(
        response,
        "data._links.self.title",
        data.firstName + (data.lastName ? " " + data.lastName : "")
      )

      validateValue(
        response,
        "data._links.update.href",
        ENDPOINT_URL + "/" + response.data.uid
      )
      validateValue(response, "data._links.update.title", "Gem")
      validateValue(response, "data._links.update.method", "PATCH")

      validateValue(
        response,
        "data._links.delete.href",
        ENDPOINT_URL + "/" + response.data.uid
      )
      validateValue(response, "data._links.delete.title", "Slet")
      validateValue(response, "data._links.delete.method", "DELETE")
    })
  }
}

/** PATCH */
function testPatch(url, uid, data) {
  return (done) => {
    new Request(app, done).patch(url, data).call(200, (response) => {
      /* msg */
      validateSchema(response, "", successResponseSchema, 0)
      validateValue(response, "success", true)
      validateValue(
        response,
        "message",
        "The resource has been updated successfully."
      )

      /* resource */
      validateSchema(response, "data", userSchema)

      if (data.firstName) {
        validateValue(response, "data.firstName", data.firstName)
      }
      if (data.lastName) {
        validateValue(response, "data.lastName", data.lastName)
      }
      if (data.email) {
        validateValue(response, "data.email", data.email)
      }

      validateValue(response, "data._links.self.href", ENDPOINT_URL + "/" + uid)
      if (data.firstName) {
        validateValue(
          response,
          "data._links.self.title",
          data.firstName +
            (response.data.lastName ? " " + response.data.lastName : "")
        )
      }
      if (data.lastName) {
        validateValue(
          response,
          "data._links.self.title",
          response.data.firstName + (data.lastName ? " " + data.lastName : "")
        )
      }

      validateValue(
        response,
        "data._links.update.href",
        ENDPOINT_URL + "/" + uid
      )
      validateValue(response, "data._links.update.title", "Gem")
      validateValue(response, "data._links.update.method", "PATCH")

      validateValue(
        response,
        "data._links.delete.href",
        ENDPOINT_URL + "/" + uid
      )
      validateValue(response, "data._links.delete.title", "Slet")
      validateValue(response, "data._links.delete.method", "DELETE")
    })
  }
}

/** Error */
function testErrorResponse(method, url, status, message, data = null) {
  return (done) => {
    let request = new Request(app, done)
    if (method === "POST") {
      request = request.post(url, data)
    } else if (method === "PATCH") {
      request = request.patch(url, data)
    } else if (method === "DELETE") {
      request = request.delete(url)
    } else {
      request = request.get(url)
    }

    request.call(status, (response) => {
      /* msg */
      validateSchema(response, "", errorResponseSchema, 0)
      validateValue(response, "success", false)

      /* Error object */
      validateSchema(response, "error", errorSchema)
      validateValue(response, "error.code", status)
      validateValue(response, "error.message", message)
    })
  }
}

/** TESTS */
describe("GET " + ENDPOINT_URL, () => {
  it(
    "response with page 1 and 100 users",
    testPage(ENDPOINT_URL, ENDPOINT_URL + "?page=2", 1)
  )

  it(
    "response with page 3 and 100 users",
    testPage(ENDPOINT_URL + "?page=3", null, 3)
  )

  it(
    "response in case of page not found",
    testErrorResponse(
      "GET",
      ENDPOINT_URL + "?page=4",
      404,
      "The requested resource was not found."
    )
  )
})

describe("GET " + ENDPOINT_URL + "/:uid", () => {
  it("response with a user", testResource(ENDPOINT_URL + "/0", 0))
  it(
    "response in case of user not found",
    testErrorResponse(
      "GET",
      ENDPOINT_URL + "/500",
      404,
      "The requested resource was not found."
    )
  )
})

describe("POST " + ENDPOINT_URL, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const email = firstName + "_" + lastName + "@gmail.com"

  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  }

  it("response with a user", testPost(ENDPOINT_URL, data))
  it(
    "response in case of missing values",
    testErrorResponse(
      "POST",
      ENDPOINT_URL,
      400,
      "The request cannot be fulfilled due to bad syntax.",
      {
        firstName: "",
        lastName: "",
        email: "",
      }
    )
  )
  it(
    "response in case of missing data objects",
    testErrorResponse(
      "POST",
      ENDPOINT_URL,
      400,
      "The request cannot be fulfilled due to bad syntax."
    )
  )
})

describe("PATCH " + ENDPOINT_URL + "/:uid", () => {
  it(
    "able to update firstName",
    testPatch(ENDPOINT_URL + "/63", 63, {
      firstName: faker.person.firstName(),
    })
  )
  it(
    "response with a error when firstName missing value",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      {
        firstName: "",
      }
    )
  )
  it(
    "response with a error when firstName value is too short",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      {
        firstName: "a",
      }
    )
  )
  it(
    "response with a error when firstName value is too long",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      {
        firstName:
          "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmn",
      }
    )
  )

  it(
    "able to update lastName value",
    testPatch(ENDPOINT_URL + "/63", 63, {
      lastName: faker.person.lastName(),
    })
  )
  it(
    "able to set lastName to empty",
    testPatch(ENDPOINT_URL + "/63", 63, {
      lastName: "",
    })
  )
  it(
    "response with a error when lastName value is too short",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      {
        lastName: "a",
      }
    )
  )
  it(
    "response with a error when lastName value is too long",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      {
        lastName:
          "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmn",
      }
    )
  )

  it(
    "able to update email value",
    testPatch(ENDPOINT_URL + "/63", 63, {
      email: "test2@foo.bar",
    })
  )
  it(
    "response with a error when email missing value",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      {
        email: "",
      }
    )
  )
  it(
    "response with a error when email is not valid",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      {
        email: "test.foo.bar",
      }
    )
  )
  it(
    "response with a error when email is too long",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      {
        email:
          "abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghij@abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd.bar",
      }
    )
  )

  it(
    "response with a error when empty or missing body",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax."
    )
  )

  it(
    "response in case of not found",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/600",
      404,
      "The requested resource was not found.",
      {
        firstName: "test",
        lastName: "test",
        email: "test@foo.bar",
      }
    )
  )
})
