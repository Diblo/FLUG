/**
 * REST API mockup
 */
// Import necessary libraries
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./src/comments/config");
const routes = require("./src/routes");
const {
  jMain,
  jPage,
  jUser,
  jBlog,
  jEvent,
  jImage,
  jError,
} = require("./src/comments/json");
const {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  ServerError,
} = require("./src/comments/errors");

// Create an Express app
const app = express();

// Use Morgan to log HTTP requests
app.use(morgan("dev"));

// Fix issues typically arise when making AJAX requests
// on one domain to another domain.
app.use(cors());

// Parse JSON in the request body
app.use(
  express.json({
    limit: "9mb",
  }),
);

// Extend the request and response object
app.use((req, res, next) => {
  const slugRegex = /^(?!-)[a-z0-9-]+(?<!-)$/;

  req.getUid = function () {
    const parsedUid = parseInt(req.params.uid || req.params.id);

    if (isNaN(parsedUid) || parsedUid < 0) {
      return null;
    }

    return parsedUid;
  };

  req.getSlug = function () {
    if (!req.params.id || !slugRegex.test(req.params.id)) {
      return null;
    }

    return req.params.id;
  };

  req.getJson = function (schema) {
    const contentType = req.get("Content-Type");
    if (contentType !== "application/json") {
      throw new BadRequest("Invalid Content-Type. Must be application/json.");
    }

    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequest(error.details[0].message);
    }

    return req.body;
  };

  req.getPage = function () {
    const currentPage = req.query.page ? parseInt(req.query.page) : 1;

    if (currentPage <= 0) {
      return null;
    }

    return currentPage;
  };

  function handleMsg(method) {
    if (method == "POST") return "The resource has been created successfully.";
    if (method == "PATCH") return "The resource has been updated successfully.";
    return "Successfully retrieved the resource.";
  }

  res.jPage = function (items, totalResults, curPage, totalPages) {
    return this.json(
      jMain(
        true,
        jPage(req.originalUrl, items, totalResults, curPage, totalPages),
        "Successfully retrieved the resource.",
      ),
    );
  };

  res.jUser = function (entity) {
    return this.json(jMain(true, jUser(entity), handleMsg(req.method)));
  };
  res.jBlog = function (entity) {
    return this.json(jMain(true, jBlog(entity), handleMsg(req.method)));
  };
  res.jEvent = function (entity) {
    return this.json(jMain(true, jEvent(entity), handleMsg(req.method)));
  };
  res.jImage = function (entity) {
    return this.json(jMain(true, jImage(entity), handleMsg(req.method)));
  };

  res.jSuccess = function () {
    return this.json(
      jMain(true, null, "The resource has been deleted successfully."),
    );
  };
  res.jError = function (err) {
    return this.status(err.code).json(
      jMain(false, jError(err.code, err.message, err.description)),
    );
  };

  next();
});

// Do not allow leading slash
app.use((req, res, next) => {
  if (req.path.slice(-1) === "/" && req.path.length > 1) {
    throw new NotFound(
      `Leading slashes are not allowed. URL: '${req.originalUrl}'`,
    );
  } else {
    next();
  }
});

// Add routes
app.use("/", routes);

// Catch non-route match
app.use((req, res) => {
  throw new NotFound(`URL '${req.originalUrl}' does not exist.`);
});

// Catch error
app.use((err, req, res, next) => {
  let error;

  switch (true) {
    case err instanceof BadRequest:
    case err instanceof Unauthorized:
    case err instanceof Forbidden:
    case err instanceof NotFound:
    case err instanceof ServerError:
      error = err;
      break;
    default:
      console.error(err);
      error = new ServerError(err.message);
  }

  res
    .status(error.code)
    .json(jMain(false, jError(error.code, error.message, error.description)));
});

// Start the server
app.listen(config.getApiPort(), () => {
  console.log(`Server is running on port ${config.getApiPort()}`);
});

module.exports = app;
