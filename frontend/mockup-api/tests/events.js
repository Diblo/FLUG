process.env.API_PORT = 2300;

const app = require("../server");
const {
  validateSchema,
  validateArraySchema,
  validateValue,
  validateSize,
  generateLoremWithinRange,
  Request,
} = require("./comments/tools");
const {
  pageSchema,
  eventSchema,
  eventItemSchema,
  successResponseSchema,
  errorResponseSchema,
  errorSchema,
} = require("./comments/schemas");
const config = require("../src/comments/config");
const { faker } = require("@faker-js/faker");

const ENDPOINT_URL = "/" + config.getEventsEndpoint();
const ITEMS_PER_PAGE = config.getItemsPerPage();

/** GET */
function testPage(url, nextHref, page) {
  return (done) => {
    new Request(app, done).get(url).call(200, (response) => {
      /* msg */
      validateSchema(response, "", successResponseSchema, 0);
      validateValue(response, "success", true);
      validateValue(
        response,
        "message",
        "Successfully retrieved the resource.",
      );

      /* page */
      validateSchema(response, "data", pageSchema);

      validateSize(response, "data.items", ITEMS_PER_PAGE);
      validateValue(response, "data.results", ITEMS_PER_PAGE);
      validateValue(response, "data.totalResults", 300);

      if (nextHref) {
        validateValue(response, "data.pagination.next.href", nextHref);
        validateValue(response, "data.pagination.next.title", "Næste");
      } else {
        validateValue(response, "data.pagination.next", null);
      }
      validateValue(response, "data.page", page);
      validateValue(response, "data.totalPages", 3);

      /* items */
      validateArraySchema(response, "data.item", eventItemSchema);
    });
  };
}

function testResource(url, uid) {
  return (done) => {
    new Request(app, done).get(url).call(200, (response) => {
      /* msg */
      validateSchema(response, "", successResponseSchema, 0);
      validateValue(response, "success", true);
      validateValue(
        response,
        "message",
        "Successfully retrieved the resource.",
      );

      /* resource */
      validateSchema(response, "data", eventSchema);

      validateValue(response, "data.uid", uid);

      validateValue(
        response,
        "data._links.self.href",
        ENDPOINT_URL + "/" + uid,
      );
      validateValue(response, "data._links.self.title", response.data.title);

      validateValue(
        response,
        "data._links.slug.href",
        ENDPOINT_URL + "/" + response.data.slug,
      );
      validateValue(response, "data._links.slug.title", response.data.title);

      validateValue(
        response,
        "data._links.update.href",
        ENDPOINT_URL + "/" + uid,
      );
      validateValue(response, "data._links.update.title", "Gem");
      validateValue(response, "data._links.update.method", "PATCH");

      validateValue(
        response,
        "data._links.delete.href",
        ENDPOINT_URL + "/" + uid,
      );
      validateValue(response, "data._links.delete.title", "Slet");
      validateValue(response, "data._links.delete.method", "DELETE");
    });
  };
}

/** POST */
function testPost(url, data) {
  return (done) => {
    new Request(app, done).post(url, data).call(201, (response) => {
      /* msg */
      validateSchema(response, "", successResponseSchema, 0);
      validateValue(response, "success", true);
      validateValue(
        response,
        "message",
        "The resource has been created successfully.",
      );

      /* resource */
      validateSchema(response, "data", eventSchema);

      validateValue(response, "data.title", data.title);
      validateValue(response, "data.slug", data.slug);
      validateValue(response, "data.shortDesc", data.shortDesc);
      validateValue(response, "data.startDateTime", data.startDateTime);
      validateValue(response, "data.endDateTime", data.endDateTime);
      validateValue(response, "data.location", data.location);
      validateValue(response, "data.content", data.content);

      validateValue(
        response,
        "data._links.self.href",
        ENDPOINT_URL + "/" + response.data.uid,
      );
      validateValue(response, "data._links.self.title", data.title);

      validateValue(
        response,
        "data._links.update.href",
        ENDPOINT_URL + "/" + response.data.uid,
      );
      validateValue(response, "data._links.update.title", "Gem");
      validateValue(response, "data._links.update.method", "PATCH");

      validateValue(
        response,
        "data._links.delete.href",
        ENDPOINT_URL + "/" + response.data.uid,
      );
      validateValue(response, "data._links.delete.title", "Slet");
      validateValue(response, "data._links.delete.method", "DELETE");
    });
  };
}

/** PATCH */
function testPatch(url, uid, data) {
  return (done) => {
    new Request(app, done).patch(url, data).call(200, (response) => {
      /* msg */
      validateSchema(response, "", successResponseSchema, 0);
      validateValue(response, "success", true);
      validateValue(
        response,
        "message",
        "The resource has been updated successfully.",
      );

      /* resource */
      validateSchema(response, "data", eventSchema);

      if (data.title) {
        validateValue(response, "data.title", data.title);
      }
      if (data.slug) {
        validateValue(response, "data.slug", data.slug);
      }
      if (data.shortDesc) {
        validateValue(response, "data.shortDesc", data.shortDesc);
      }
      if (data.location) {
        validateValue(response, "data.location", data.location);
      }
      if (data.content) {
        validateValue(response, "data.content", data.content);
      }

      validateValue(
        response,
        "data._links.self.href",
        ENDPOINT_URL + "/" + uid,
      );
      if (data.title) {
        validateValue(response, "data._links.self.title", data.title);
      }

      validateValue(
        response,
        "data._links.update.href",
        ENDPOINT_URL + "/" + uid,
      );
      validateValue(response, "data._links.update.title", "Gem");
      validateValue(response, "data._links.update.method", "PATCH");

      validateValue(
        response,
        "data._links.delete.href",
        ENDPOINT_URL + "/" + uid,
      );
      validateValue(response, "data._links.delete.title", "Slet");
      validateValue(response, "data._links.delete.method", "DELETE");
    });
  };
}

/** Error */
function testErrorResponse(method, url, status, message, data = null) {
  return (done) => {
    let request = new Request(app, done);
    if (method === "POST") {
      request = request.post(url, data);
    } else if (method === "PATCH") {
      request = request.patch(url, data);
    } else if (method === "DELETE") {
      request = request.delete(url);
    } else {
      request = request.get(url);
    }

    request.call(status, (response) => {
      /* msg */
      validateSchema(response, "", errorResponseSchema, 0);
      validateValue(response, "success", false);

      /* Error object */
      validateSchema(response, "error", errorSchema);
      validateValue(response, "error.code", status);
      validateValue(response, "error.message", message);
    });
  };
}

/** TESTS */
describe("GET " + ENDPOINT_URL, () => {
  it(
    "response with page 1 and 100 events",
    testPage(ENDPOINT_URL, ENDPOINT_URL + "?page=2", 1),
  );
  it(
    "response with page 3 and 100 events",
    testPage(ENDPOINT_URL + "?page=3", null, 3),
  );

  it(
    "response in case of page not found",
    testErrorResponse(
      "GET",
      ENDPOINT_URL + "?page=4",
      404,
      "The requested resource was not found.",
    ),
  );
});

describe("GET " + ENDPOINT_URL + "/:uid", () => {
  it("response with a event", testResource(ENDPOINT_URL + "/0", 0));
  it(
    "response in case of event not found",
    testErrorResponse(
      "GET",
      ENDPOINT_URL + "/500",
      404,
      "The requested resource was not found.",
    ),
  );
});

describe("GET " + ENDPOINT_URL + "/:slug", () => {
  it(
    "response with a event",
    testResource(ENDPOINT_URL + "/custom-event-title", 30),
  );
  it(
    "response in case of event not found",
    testErrorResponse(
      "GET",
      ENDPOINT_URL + "/custom-event-title2",
      404,
      "The requested resource was not found.",
    ),
  );
});

describe("POST " + ENDPOINT_URL, () => {
  const title = generateLoremWithinRange(5, 100);
  const startDateTime = faker.date.future().toISOString();

  const data = {
    title: title,
    slug: title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, ""),
    shortDesc: generateLoremWithinRange(140, 155),
    startDateTime: startDateTime,
    endDateTime: faker.date.future({ refDate: startDateTime }).toISOString(),
    location: "Jensenvej 57F, 6000 Ribe",
    content: faker.lorem.paragraphs({ min: 2, max: 8 }),
  };

  it("response with a event", testPost(ENDPOINT_URL, data));
  it(
    "response in case of missing values",
    testErrorResponse(
      "POST",
      ENDPOINT_URL,
      400,
      "The request cannot be fulfilled due to bad syntax.",
      {
        title: "",
        slug: "",
        shortDesc: "",
        startDateTime: "",
        endDateTime: "",
        location: "",
        content: "",
      },
    ),
  );
  it(
    "response in case of missing data objects",
    testErrorResponse(
      "POST",
      ENDPOINT_URL,
      400,
      "The request cannot be fulfilled due to bad syntax.",
    ),
  );
});

describe("PATCH " + ENDPOINT_URL + "/:uid", () => {
  it(
    "able to update title",
    testPatch(ENDPOINT_URL + "/63", 63, {
      title: "abcdefghijklmnopqrstu",
    }),
  );
  it(
    "response with a error when title missing value",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      { title: "" },
    ),
  );
  it(
    "response with a error when title value is too short",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      { title: "abcd" },
    ),
  );
  it(
    "response with a error when title value is too long",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      {
        title:
          "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvw",
      },
    ),
  );

  it(
    "able to update slug",
    testPatch(ENDPOINT_URL + "/63", 63, {
      slug: "abcdefghijklmnopqrstu",
    }),
  );
  it(
    "response with a error when slug missing value",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      { slug: "" },
    ),
  );
  it(
    "response with a error when slug value is too short",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      { slug: "abcd" },
    ),
  );
  it(
    "response with a error when slug value is too long",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      {
        slug: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu",
      },
    ),
  );

  it(
    "able to update shortDesc",
    testPatch(ENDPOINT_URL + "/63", 63, {
      shortDesc:
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmno",
    }),
  );
  it(
    "response with a error when shortDesc missing value",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      { shortDesc: "" },
    ),
  );
  it(
    "response with a error when shortDesc value is too short",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      {
        shortDesc:
          "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefgh",
      },
    ),
  );
  it(
    "response with a error when shortDesc value is too long",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      {
        shortDesc:
          "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",
      },
    ),
  );

  // Missing start datetime

  // Missing end datetime

  it(
    "able to update location",
    testPatch(ENDPOINT_URL + "/63", 63, {
      location: "abcdefghijklmnopqrstu",
    }),
  );
  it(
    "able to set location to empty",
    testPatch(ENDPOINT_URL + "/63", 63, {
      location: "",
    }),
  );
  it(
    "response with a error when location value is too short",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      {
        location: "abcdefghijklmn",
      },
    ),
  );
  it(
    "response with a error when location value is too long",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      {
        location:
          "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv",
      },
    ),
  );

  it(
    "able to update content",
    testPatch(ENDPOINT_URL + "/63", 63, {
      content: "abcdefghijklmnopqrstuvwxyz",
    }),
  );
  it(
    "response with a error when content missing value",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      { content: "" },
    ),
  );
  it(
    "response with a error when content value is too short",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
      { content: "abcdefghijklmnopqrs" },
    ),
  );

  it(
    "response with a error when empty or missing body",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/63",
      400,
      "The request cannot be fulfilled due to bad syntax.",
    ),
  );

  it(
    "response in case of not found",
    testErrorResponse(
      "PATCH",
      ENDPOINT_URL + "/600",
      404,
      "The requested resource was not found.",
      {
        title: "Test",
        slug: "test",
        shortDesc: "Test",
        startDateTime: "Test",
        endDateTime: "Test",
        location: "Test",
        content: "Test",
      },
    ),
  );
});
