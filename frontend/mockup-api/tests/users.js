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
  userItemSchema,
  userSchema,
  errorSchema,
} = require("./libs/schemas");
const { USERS_PATH, ITEMS_PER_PAGE } = require("../config");
const { faker } = require("@faker-js/faker");

const PAGE_URI = "/" + USERS_PATH;
const USERS_URI = "/" + USERS_PATH;

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

          validatePage(response, pageSchema, userItemSchema);

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
          validateSchema(response, userSchema);

          validateValue(response, "uid", uid);

          validateValue(response, "_links.self.href", USERS_URI + "/" + uid);
          validateValue(
            response,
            "_links.self.title",
            response.firstName +
              (response.lastName ? " " + response.lastName : "")
          );

          validateValue(response, "_links.update.href", USERS_URI + "/" + uid);
          validateValue(response, "_links.update.title", "Gem");
          validateValue(response, "_links.update.method", "PATCH");

          validateValue(response, "_links.delete.href", USERS_URI + "/" + uid);
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
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = firstName + "_" + lastName + "@gmail.com";

  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
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
          validateSchema(response, userSchema);

          validateValue(response, "firstName", data.firstName);
          validateValue(response, "lastName", data.lastName);
          validateValue(response, "email", data.email);

          validateValue(
            response,
            "_links.self.href",
            USERS_URI + "/" + response.uid
          );
          validateValue(
            response,
            "_links.self.title",
            response.firstName +
              (response.lastName ? " " + response.lastName : "")
          );

          validateValue(
            response,
            "_links.update.href",
            USERS_URI + "/" + response.uid
          );
          validateValue(response, "_links.update.title", "Gem");
          validateValue(response, "_links.update.method", "PATCH");

          validateValue(
            response,
            "_links.delete.href",
            USERS_URI + "/" + response.uid
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
          validateSchema(response, userSchema);

          if (data.firstName) {
            validateValue(response, "firstName", data.firstName);
          }
          if (data.lastName) {
            validateValue(response, "lastName", data.lastName);
          }
          if (data.email) {
            validateValue(response, "email", data.email);
          }
          validateValue(
            response,
            "_links.self.href",
            USERS_URI + "/" + response.uid
          );
          if (data.firstName && data.lastName) {
            validateValue(
              response,
              "_links.self.title",
              response.firstName +
                (response.lastName ? " " + response.lastName : "")
            );
          }

          validateValue(
            response,
            "_links.update.href",
            USERS_URI + "/" + response.uid
          );
          validateValue(response, "_links.update.title", "Gem");
          validateValue(response, "_links.update.method", "PATCH");

          validateValue(
            response,
            "_links.delete.href",
            USERS_URI + "/" + response.uid
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
    "response with page 1 and 100 users",
    testPage(PAGE_URI, PAGE_URI + "?page=2", 1)
  );

  it(
    "response with page 2 and 100 users",
    testPage(PAGE_URI + "?page=2", PAGE_URI + "?page=3", 2)
  );

  it(
    "response with page 3 and 100 users",
    testPage(PAGE_URI + "?page=3", null, 3)
  );
  it("response in case of page not found", testError(PAGE_URI + "?page=4"));
});

describe("GET " + PAGE_URI + "/:uid", () => {
  it("response with a user", testUnit(PAGE_URI, 0, 0));
  it("response in case of user not found", testError(PAGE_URI + "/" + 500));
});

describe("POST " + PAGE_URI, () => {
  it("response with a user", testPost(PAGE_URI));
  it(
    "response in case of missing values",
    testPostError(PAGE_URI, {
      firstName: "",
      lastName: "",
      email: "",
      content: "", // Does not exist
    })
  );
  it("response in case of missing data objects", testPostError(PAGE_URI, {}));
});

describe("PATCH " + PAGE_URI + "/:uid", () => {
  it(
    "able to update firstName",
    testPatch(PAGE_URI, 63, {
      firstName: faker.person.firstName(),
    })
  );
  it(
    "response with a error when firstName missing value",
    testPatchError(PAGE_URI, 63, {
      firstName: "",
    })
  );
  it(
    "response with a error when firstName value is too short",
    testPatchError(PAGE_URI, 63, {
      firstName: "a",
    })
  );
  it(
    "response with a error when firstName value is too long",
    testPatchError(PAGE_URI, 63, {
      firstName:
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmn",
    })
  );

  it(
    "able to update lastName value",
    testPatch(PAGE_URI, 63, {
      lastName: faker.person.lastName(),
    })
  );
  it(
    "able to set lastName to empty",
    testPatch(PAGE_URI, 63, {
      lastName: "",
    })
  );
  it(
    "response with a error when lastName value is too short",
    testPatchError(PAGE_URI, 63, {
      lastName: "a",
    })
  );
  it(
    "response with a error when lastName value is too long",
    testPatchError(PAGE_URI, 63, {
      lastName:
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmn",
    })
  );

  it(
    "able to update email value",
    testPatch(PAGE_URI, 63, {
      email: "test2@foo.bar",
    })
  );
  it(
    "response with a error when email missing value",
    testPatchError(PAGE_URI, 63, {
      email: "",
    })
  );
  it(
    "response with a error when email is not valid",
    testPatchError(PAGE_URI, 63, {
      email: "test.foo.bar",
    })
  );
  it(
    "response with a error when email is too long",
    testPatchError(PAGE_URI, 63, {
      email:
        "abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghij@abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd.bar",
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
        firstName: "test",
        lastName: "test",
        email: "test@foo.bar",
      },
      404
    )
  );
});
