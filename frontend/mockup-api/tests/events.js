process.env.EXPRESS_PORT = 2300;

const request = require("supertest");
const app = require("../server");
const {
  validateSchema,
  validatePage,
  validateValue,
  validateSize,
} = require("./libs/tools");
const {
  pageSchema,
  eventSchema,
  eventItemSchema,
  errorSchema,
} = require("./libs/schemas");
const { EVENTS_PATH, ITEMS_PER_PAGE } = require("../config");
const { faker } = require("@faker-js/faker");

const PAGE_URI = "/" + EVENTS_PATH;
const EVENT_URI = "/" + EVENTS_PATH;

function generateLoremWithinRange(minLength, maxLength) {
  let minLoremText = "";
  let upToMaxLoremText = "";

  while (minLoremText.length < minLength) {
    minLoremText = `${minLoremText} ${faker.lorem.word()}`;
  }
  minLoremText = minLoremText.trim();

  while (upToMaxLoremText.length < maxLength - minLength) {
    upToMaxLoremText = `${upToMaxLoremText} ${faker.lorem.word()}`;
  }
  upToMaxLoremText = upToMaxLoremText.trim();

  const _w = upToMaxLoremText.split(" ");
  const _t = Math.floor(Math.random() * _w.length);
  if (_t) {
    return `${minLoremText} ${_w.slice(0, _t).join(" ")}`;
  }

  return minLoremText;
}

/** GET */
function testPage(uri, nextHref, page) {
  return (done) => {
    request(app)
      .get(uri)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          try {
            return done(
              new Error(
                `${err.message}.\nServer Response: ${
                  JSON.parse(res.text).error
                }.`
              )
            );
          } catch {}
          return done(err);
        }

        try {
          const response = JSON.parse(res.text);

          validatePage(response, pageSchema, eventItemSchema);

          validateSize(response, "items", ITEMS_PER_PAGE);
          validateValue(response, "results", ITEMS_PER_PAGE);
          validateValue(response, "totalResults", 300);

          if (nextHref) {
            validateValue(response, "pagination.next.href", nextHref);
            validateValue(response, "pagination.next.title", "Næste");
          }
          validateValue(response, "page", page);
          validateValue(response, "totalPages", 3);
        } catch (error) {
          return done(error);
        }

        done();
      });
  };
}

function testUnit(uri, id, uid) {
  return (done) => {
    request(app)
      .get(uri + "/" + id)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          try {
            return done(
              new Error(
                `${err.message}.\nServer Response: ${
                  JSON.parse(res.text).error
                }.`
              )
            );
          } catch {}
          return done(err);
        }

        try {
          const response = JSON.parse(res.text);
          validateSchema(response, eventSchema);

          validateValue(response, "uid", uid);

          validateValue(response, "_links.self.href", EVENT_URI + "/" + uid);
          validateValue(response, "_links.self.title", response.title);

          validateValue(response, "_links.update.href", EVENT_URI + "/" + uid);
          validateValue(response, "_links.update.title", "Gem");
          validateValue(response, "_links.update.method", "PATCH");

          validateValue(response, "_links.delete.href", EVENT_URI + "/" + uid);
          validateValue(response, "_links.delete.title", "Slet");
          validateValue(response, "_links.delete.method", "DELETE");
        } catch (error) {
          return done(error);
        }

        done();
      });
  };
}

function testError(uri) {
  return (done) => {
    request(app)
      .get(uri)
      .expect("Content-Type", /json/)
      .expect(404)
      .end((err, res) => {
        if (err) {
          try {
            return done(
              new Error(
                `${err.message}.\nServer Response: ${
                  JSON.parse(res.text).error
                }.`
              )
            );
          } catch {}
          return done(err);
        }

        try {
          const response = JSON.parse(res.text);
          validateSchema(response, errorSchema);

          validateValue(response, "uri", uri);
        } catch (error) {
          return done(error);
        }

        done();
      });
  };
}

/** POST */
function testPost(uri) {
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

  return (done) => {
    request(app)
      .post(uri)
      .send(JSON.stringify(data))
      .set("Content-Type", "application/json")
      .expect(201)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) {
          try {
            return done(
              new Error(
                `${err.message}.\nServer Response: ${
                  JSON.parse(res.text).error
                }.`
              )
            );
          } catch {}
          return done(err);
        }

        try {
          const response = JSON.parse(res.text);
          validateSchema(response, eventSchema);

          validateValue(response, "title", data.title);
          validateValue(response, "slug", data.slug);
          validateValue(response, "shortDesc", data.shortDesc);
          validateValue(response, "startDateTime", data.startDateTime);
          validateValue(response, "endDateTime", data.endDateTime);
          validateValue(response, "location", data.location);
          validateValue(response, "content", data.content);

          validateValue(
            response,
            "_links.self.href",
            EVENT_URI + "/" + response.uid
          );
          validateValue(response, "_links.self.title", data.title);

          validateValue(
            response,
            "_links.update.href",
            EVENT_URI + "/" + response.uid
          );
          validateValue(response, "_links.update.title", "Gem");
          validateValue(response, "_links.update.method", "PATCH");

          validateValue(
            response,
            "_links.delete.href",
            EVENT_URI + "/" + response.uid
          );
          validateValue(response, "_links.delete.title", "Slet");
          validateValue(response, "_links.delete.method", "DELETE");
        } catch (error) {
          return done(error);
        }

        done();
      });
  };
}

function testPostError(uri, data) {
  return (done) => {
    request(app)
      .post(uri)
      .send(JSON.stringify(data))
      .set("Content-Type", "application/json")
      .expect(400)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) {
          try {
            return done(
              new Error(
                `${err.message}.\nServer Response: ${
                  JSON.parse(res.text).error
                }.`
              )
            );
          } catch {}
          return done(err);
        }

        try {
          const response = JSON.parse(res.text);
          validateSchema(response, errorSchema);

          validateValue(response, "uri", uri);
        } catch (error) {
          return done(error);
        }

        done();
      });
  };
}

/** PATCH */
function testPatch(uri, uid, data) {
  return (done) => {
    request(app)
      .patch(uri + "/" + uid)
      .send(JSON.stringify(data))
      .set("Content-Type", "application/json")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) {
          try {
            return done(
              new Error(
                `${err.message}.\nServer Response: ${
                  JSON.parse(res.text).error
                }.`
              )
            );
          } catch {}
          return done(err);
        }

        try {
          const response = JSON.parse(res.text);
          validateSchema(response, eventSchema);

          if (data.title) {
            validateValue(response, "title", data.title);
          }
          if (data.slug) {
            validateValue(response, "slug", data.slug);
          }
          if (data.shortDesc) {
            validateValue(response, "shortDesc", data.shortDesc);
          }
          if (data.location) {
            validateValue(response, "location", data.location);
          }
          if (data.content) {
            validateValue(response, "content", data.content);
          }

          validateValue(response, "_links.self.href", EVENT_URI + "/" + uid);
          if (data.title) {
            validateValue(response, "_links.self.title", data.title);
          }

          validateValue(response, "_links.update.href", EVENT_URI + "/" + uid);
          validateValue(response, "_links.update.title", "Gem");
          validateValue(response, "_links.update.method", "PATCH");

          validateValue(response, "_links.delete.href", EVENT_URI + "/" + uid);
          validateValue(response, "_links.delete.title", "Slet");
          validateValue(response, "_links.delete.method", "DELETE");
        } catch (error) {
          return done(error);
        }

        done();
      });
  };
}

function testPatchError(uri, uid, data, status) {
  return (done) => {
    request(app)
      .patch(uri + "/" + uid)
      .send(JSON.stringify(data))
      .set("Content-Type", "application/json")
      .expect(status ? status : 400)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) {
          try {
            return done(
              new Error(
                `${err.message}.\nServer Response: ${
                  JSON.parse(res.text).error
                }.`
              )
            );
          } catch {}
          return done(err);
        }

        try {
          const response = JSON.parse(res.text);
          validateSchema(response, errorSchema);

          validateValue(response, "uri", uri + "/" + uid);
        } catch (error) {
          return done(error);
        }

        done();
      });
  };
}

/** TESTS */
describe("GET " + PAGE_URI, () => {
  it(
    "response with page 1 and 100 events",
    testPage(PAGE_URI, PAGE_URI + "?page=2", 1)
  );

  it(
    "response with page 2 and 100 events",
    testPage(PAGE_URI + "?page=2", PAGE_URI + "?page=3", 2)
  );

  it(
    "response with page 3 and 100 events",
    testPage(PAGE_URI + "?page=3", null, 3)
  );
  it("response in case of page not found", testError(PAGE_URI + "?page=4"));
});

describe("GET " + PAGE_URI + "/:uid", () => {
  it("response with a event", testUnit(PAGE_URI, 0, 0));
  it("response in case of event not found", testError(PAGE_URI + "/" + 500));
});

describe("GET " + PAGE_URI + "/:slug", () => {
  it("response with a event", testUnit(PAGE_URI, "custom-event-title", 30));
  it(
    "response in case of event not found",
    testError(PAGE_URI + "/custom-event-title2")
  );
});

describe("POST " + PAGE_URI, () => {
  it("response with a event", testPost(PAGE_URI));
  it(
    "response in case of missing values",
    testPostError(PAGE_URI, {
      title: "",
      slug: "",
      shortDesc: "",
      startDateTime: "",
      endDateTime: "",
      location: "",
      content: "",
    })
  );
  it("response in case of missing data objects", testPostError(PAGE_URI, {}));
});

describe("PATCH " + PAGE_URI + "/:uid", () => {
  it(
    "able to update title",
    testPatch(PAGE_URI, 63, {
      title: "abcdefghijklmnopqrstu",
    })
  );
  it(
    "response with a error when title missing value",
    testPatchError(PAGE_URI, 63, {
      title: "",
    })
  );
  it(
    "response with a error when title value is too short",
    testPatchError(PAGE_URI, 63, {
      title: "abcd",
    })
  );
  it(
    "response with a error when title value is too long",
    testPatchError(PAGE_URI, 63, {
      title:
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvw",
    })
  );

  it(
    "able to update slug",
    testPatch(PAGE_URI, 63, {
      slug: "abcdefghijklmnopqrstu",
    })
  );
  it(
    "response with a error when slug missing value",
    testPatchError(PAGE_URI, 63, {
      slug: "",
    })
  );
  it(
    "response with a error when slug value is too short",
    testPatchError(PAGE_URI, 63, {
      slug: "abcd",
    })
  );
  it(
    "response with a error when slug value is too long",
    testPatchError(PAGE_URI, 63, {
      slug: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu",
    })
  );

  it(
    "able to update shortDesc",
    testPatch(PAGE_URI, 63, {
      shortDesc:
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmno",
    })
  );
  it(
    "response with a error when shortDesc missing value",
    testPatchError(PAGE_URI, 63, {
      shortDesc: "",
    })
  );
  it(
    "response with a error when shortDesc value is too short",
    testPatchError(PAGE_URI, 63, {
      shortDesc:
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefgh",
    })
  );
  it(
    "response with a error when shortDesc value is too long",
    testPatchError(PAGE_URI, 63, {
      shortDesc:
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",
    })
  );

  // Missing start datetime

  // Missing end datetime

  it(
    "able to update location",
    testPatch(PAGE_URI, 63, {
      location: "abcdefghijklmnopqrstu",
    })
  );
  it(
    "able to set location to empty",
    testPatch(PAGE_URI, 63, {
      location: "",
    })
  );
  it(
    "response with a error when location value is too short",
    testPatchError(PAGE_URI, 63, {
      location: "abcdefghijklmn",
    })
  );
  it(
    "response with a error when location value is too long",
    testPatchError(PAGE_URI, 63, {
      location:
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv",
    })
  );

  it(
    "able to update content",
    testPatch(PAGE_URI, 63, {
      content: "abcdefghijklmnopqrstuvwxyz",
    })
  );
  it(
    "response with a error when content missing value",
    testPatchError(PAGE_URI, 63, {
      content: "",
    })
  );
  it(
    "response with a error when content value is too short",
    testPatchError(PAGE_URI, 63, {
      content: "abcdefghijklmnopqrs",
    })
  );

  it(
    "response with a error when empty or missing body",
    testPatchError(PAGE_URI, 63, {})
  );

  it(
    "response in case of not found",
    testPatchError(
      PAGE_URI,
      600,
      {
        title: "Test",
        slug: "test",
        shortDesc: "Test",
        startDateTime: "Test",
        endDateTime: "Test",
        content: "Test",
      },
      404
    )
  );
});
