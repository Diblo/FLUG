/**
 * REST API mockup
 */
// Import necessary libraries
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { EXPRESS_PORT } = require("./config");
const routes = require("./src/routes");
const {
  jPage,
  jUser,
  jBlog,
  jEvent,
  jImage,
  jSuccess,
  jError,
} = require("./src/json");
const { ResourceNotFound, PageNotFound, InputError } = require("./src/Error");

// Initialize the database
require("./init_databse")();

// Create an Express app
const app = express();

// Use middleware for monitor file changes and print logging
app.use(morgan("dev"));
app.use(cors());

// Use middleware to extend the request and response object
app.use(express.json());
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
    const data = req.body;

    const { error } = schema.validate(data);
    if (error) {
      throw new InputError(error.details[0].message);
    }

    return data;
  };

  function handleArgs(entityOrStatus, entity) {
    return {
      status: typeof entityOrStatus === "number" ? entityOrStatus : 200,
      entity: typeof entityOrStatus === "number" ? entity : entityOrStatus,
    };
  }

  res.jPage = function (resPath, items, totalResults, curPage, totalPages) {
    return this.status(200).json(
      jPage(resPath, items, totalResults, curPage, totalPages)
    );
  };

  res.jUser = function (entityOrStatus, entity) {
    const args = handleArgs(entityOrStatus, entity);
    return this.status(args.status).json(jUser(args.entity));
  };
  res.jBlog = function (entityOrStatus, entity) {
    const args = handleArgs(entityOrStatus, entity);
    return this.status(args.status).json(jBlog(args.entity));
  };
  res.jEvent = function (entityOrStatus, entity) {
    const args = handleArgs(entityOrStatus, entity);
    return this.status(args.status).json(jEvent(args.entity));
  };
  res.jImage = function (entityOrStatus, entity) {
    const args = handleArgs(entityOrStatus, entity);
    return this.status(args.status).json(jImage(args.entity));
  };

  res.jSuccess = function (message) {
    return this.status(200).json(jSuccess(message));
  };
  res.jError = function (status, jCode, error) {
    return this.status(status).json(jError(req.originalUrl, jCode, error));
  };

  next();
});

// Add routes
app.use("/", routes);

// error-handling middleware
app.use((err, req, res, next) => {
  switch (true) {
    case err instanceof ResourceNotFound:
    case err instanceof InputError:
      res.jError(err.code, err.jCode, err.message, err.description);
      break;
    default:
      res.jError(500, 0, "Something went wrong!", "An unknown error has occurred");
  }
});

// Start the server
app.listen(EXPRESS_PORT, () => {
  console.log(`Server is running on port ${EXPRESS_PORT}`);
});

module.exports = app;
