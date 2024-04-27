# API Documentation

## Terminology

| Term | Description                                                               |
| ---- | ------------------------------------------------------------------------- |
| SLUG | SLUG refers to the end of a URL after `/`, identifying the specific post. |

## Endpoints

### Users

- **GET `/users`**
  - Provides a list of users.
- **POST `/users`**
  - Creates a new user and initiates a password reset by sending an email.
- **GET `/users/[uid]`**
  - Retrieves a specific user.
- **PATCH `/users/[uid]`**
  - Modifies the details of a user.
- **DELETE `/users/[uid]`**
  - Removes a user from the system.

### Blogs

- **GET `/blogs`**
  - Fetches a collection of blogs.
- **POST `/blogs`**
  - Adds a new blog post.
- **GET `/blogs/[id]`**
  - Retrieves a specific blog post using its unique identifier or slug.
- **PATCH `/blogs/[uid]`**
  - Updates the content of a blog post.
- **DELETE `/blogs/[uid]`**
  - Deletes a specific blog post.

### Events

- **GET `/events`**
  - Fetches a collection of events.
- **POST `/events`**
  - Creates a new event.
- **GET `/events/[id]`**
  - Retrieves details about a specific event using its unique identifier or slug.
- **PATCH `/events/[uid]`**
  - Updates the details of an event.
- **DELETE `/events/[uid]`**
  - Deletes a specific event.

### Images

- **GET `/images`**
  - Fetches a collection of images.
- **POST `/images`**
  - Uploads a new image.
- **GET `/images/[uid]`**
  - Retrieves a specific image.
- **PATCH `/images/[uid]`**
  - Updates the details of an image.
- **DELETE `/images/[uid]`**
  - Removes a specific image.

### Other

- **GET `/location/[address]`**
  - Provides location results based on the provided address.
- **GET `/login`**
  - Offers login validation options, such as captcha.
- **POST `/login`**
  - Authenticates the user and returns authorization information.
- **GET `/reset_password`**
  - Provides password reset validation options, e.g., captcha.
- **POST `/reset_password`**
  - Initiates a password reset and responds with a success message.
- **POST `/reset_password/[token]`**
  - Resets the user's password based on the provided token.

## Objects

### Main

The main object serves as the parent container in a response. The table below shows an overview of the fields present in the main object under different response scenarios.

| Field Name | Type                         | Content (200, 201) | No Content (204) | Error (4xx) | Description                                |
| ---------- | ---------------------------- | ------------------ | ---------------- | ----------- | ------------------------------------------ |
| `success`  | Boolean                      | Yes                | Yes              | Yes         | Indicates whether there was an error.      |
| `data`     | Page Object, Resource Object | Yes                | No               | No          | Contains either a page or resource object. |
| `error`    | Error Object                 | No                 | No               | Yes         | Error object.                              |
| `message`  | String                       | Yes                | Yes              | No          | Success message.                           |

Note: "Content" refers to situations where the response includes content, "No Content" refers to situations where the response do not includes content, and "Error" relates to 4xx error responses.

**Success Message:**

| Method   | Status Code | Message                                     |
| -------- | ----------- | ------------------------------------------- |
| `GET`    | 200         | Successfully retrieved the resource.        |
| `POST`   | 201         | The resource has been created successfully. |
| `PATCH`  | 200         | The resource has been updated successfully. |
| `DELETE` | 204         | The resource has been deleted successfully. |

**Examples:**

`GET`: Successfully retrieved the resource.

```json
{
  "success": true,
  "data": {
    "uid": 0,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "createdAt": "2023-11-01T12:00:00Z",
    "updatedAt": "2023-11-15T08:30:00Z",
    "loggedInAt": "2023-11-15T08:30:00Z"
  },
  "message": "Successfully retrieved the resource."
}
```

`POST`: The resource has been created successfully.

```json
{
  "success": true,
  "data": {
    "uid": 1,
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "createdAt": "2023-11-01T12:00:00Z",
    "updatedAt": "2023-11-23T10:45:00Z",
    "loggedInAt": "2023-11-23T10:45:00Z"
  },
  "message": "The resource has been created successfully."
}
```

`PATCH`: The resource has been updated successfully.

```json
{
  "success": true,
  "data": {
    "uid": 0,
    "firstName": "John",
    "lastName": null,
    "email": "john@example.com",
    "createdAt": "2023-11-01T12:00:00Z",
    "updatedAt": "2023-11-26T10:03:00Z",
    "loggedInAt": "2023-11-26T10:03:00Z"
  },
  "message": "The resource has been updated successfully."
}
```

`DELETE`: The resource has been deleted successfully.

```json
{
  "success": true,
  "message": "The resource has been deleted successfully."
}
```

### Page

| Field Name     | Type                   | Nullable | Description                                                |
| -------------- | ---------------------- | -------- | ---------------------------------------------------------- |
| `items`        | List with Item Objects | No       | A list containing user, blog, event or image item objects. |
| `pagination`   | Pagination Object      | No       |                                                            |
| `results`      | Number                 | No       | Number of results                                          |
| `totalResults` | Number                 | No       | Total number of results                                    |
| `page`         | Number                 | No       | Current page                                               |
| `totalPages`   | Number                 | No       | Total number of pages                                      |

**Example:**

```json
{
  "items": [
    {
      "uid": 0,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "createdAt": "2023-11-01T12:00:00Z",
      "updatedAt": "2023-11-15T08:30:00Z",
      "loggedInAt": "2023-11-15T08:30:00Z"
    }
    // Other users...
  ],
  "pagination": {
    "first": 1,
    "prev": 1,
    "self": 1,
    "next": 2,
    "last": 3
  },
  "results": 10,
  "totalResults": 150,
  "page": 1,
  "totalPages": 15
}
```

**Query Parameters:**

| Parameter | Type   | Description                                      | Example  |
| --------- | ------ | ------------------------------------------------ | -------- |
| `page`    | Number | Specifies the page number for paginated results. | `page=2` |
| `max`     | Number | Specifies the maximum number of items per page.  | `max=20` |

#### Pagination

| Field Name | Type   | Nullable | Description |
| ---------- | ------ | -------- | ----------- |
| `first`    | Number | No       |             |
| `prev`     | Number | No       |             |
| `current`  | Number | No       |             |
| `next`     | Number | No       |             |
| `last`     | Number | No       |             |

#### Items

##### User

| Field Name   | Type   | Nullable | Description                                             |
| ------------ | ------ | -------- | ------------------------------------------------------- |
| `uid`        | Number | No       | Unique identifier for the user.                         |
| `firstName`  | String | No       | User's first name.                                      |
| `lastName`   | String | Yes      | User's last name.                                       |
| `email`      | String | No       | User's email address.                                   |
| `createdAt`  | String | No       | ISO 8601 representation when the user was created.      |
| `updatedAt`  | String | Yes      | ISO 8601 representation when the user was last updated. |
| `loggedInAt` | String | Yes      | ISO 8601 representation when the user last logged in.   |

**Example:**

```json
{
  "uid": 0,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "createdAt": "2023-11-01T12:00:00Z",
  "updatedAt": "2023-11-15T08:30:00Z",
  "loggedInAt": "2023-11-15T08:30:00Z"
}
```

**Query Parameters:**

| Parameter        | Type   | Values                                                                   | Description                                                  | Example                                                    |
| ---------------- | ------ | ------------------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------------------- |
| `initial_letter` | String | `a-z, 0-9, other`                                                        | Filters the users by the initial letter of their first name. | `initial_letter=a` (Includes only items starting with 'a') |
| `order`          | String | `firstname`, `lastname`, `email`, `createdat`, `updatedat`, `loggedinat` | Specifies the field to sort the user results.                | `order=firstname` (Sorts by the `firstname` field)         |

##### Blog

| Field Name  | Type             | Nullable | Description                                             |
| ----------- | ---------------- | -------- | ------------------------------------------------------- |
| `uid`       | Number           | No       | Unique identifier for the blog.                         |
| `title`     | String           | No       | Title of the blog post.                                 |
| `shortDesc` | String           | No       | A brief description of the blog post.                   |
| `image`     | Image Ref Object | Yes      |                                                         |
| `createdAt` | String           | No       | ISO 8601 representation when the blog was created.      |
| `updatedAt` | String           | Yes      | ISO 8601 representation when the blog was last updated. |

**Example:**

```json
{
  "uid": 0,
  "title": "Blog Post",
  "shortDesc": "A brief description of the blog post.",
  "image": {
    "src": "blog_image.jpg",
    "alt": "Blog Image"
  },
  "createdAt": "2023-11-10T09:45:00Z",
  "updatedAt": "2023-11-10T10:30:00Z"
}
```

**Query Parameters:**

| Parameter        | Type   | Values                            | Description                                          | Example                                                    |
| ---------------- | ------ | --------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| `initial_letter` | String | `a-z, 0-9, other`                 | Filters the blog by the initial letter of the title. | `initial_letter=a` (Includes only items starting with 'a') |
| `order`          | String | `title`, `createdat`, `updatedat` | Specifies the field to sort the blog results.        | `order=title` (Sorts by the `title` field)                 |

##### Event

| Field Name      | Type   | Nullable | Description                                                   |
| --------------- | ------ | -------- | ------------------------------------------------------------- |
| `uid`           | Number | No       | Unique identifier for the event.                              |
| `title`         | String | No       | Title of the event.                                           |
| `shortDesc`     | String | No       | A brief description of the event.                             |
| `startDateTime` | String | No       | ISO 8601 representation the start date and time of the event. |
| `location`      | String | No       | Location where the event takes place.                         |
| `createdAt`     | String | No       | ISO 8601 representation when the event was created.           |
| `updatedAt`     | String | Yes      | ISO 8601 representation when the event was last updated.      |

**Example:**

```json
{
  "uid": 0,
  "title": "Tech Conference",
  "slug": "tech-conference",
  "shortDesc": "Annual tech conference.",
  "startDateTime": "2023-12-01T09:00:00Z",
  "location": "Convention Center",
  "createdAt": "2023-10-20T14:00:00Z",
  "updatedAt": "2023-11-05T16:30:00Z"
}
```

**Query Parameters:**

| Parameter        | Type   | Values                                             | Description                                           | Example                                                    |
| ---------------- | ------ | -------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------- |
| `initial_letter` | String | `a-z, 0-9, other`                                  | Filters the event by the initial letter of the title. | `initial_letter=a` (Includes only items starting with 'a') |
| `order`          | String | `title`, `startdatetime`, `createdat`, `updatedat` | Specifies the field to sort the event results.        | `order=title` (Sorts by the `title` field)                 |

##### Image

| Field Name  | Type   | Nullable | Description                                              |
| ----------- | ------ | -------- | -------------------------------------------------------- |
| `uid`       | Number | No       | Unique identifier for the image.                         |
| `src`       | String | No       | Image name with extension.                               |
| `alt`       | String | No       | Alternate text for the image.                            |
| `createdAt` | String | No       | ISO 8601 representation when the image was created.      |
| `updatedAt` | String | Yes      | ISO 8601 representation when the image was last updated. |

**Example:**

```json
{
  "uid": 0,
  "src": "example1.jpg",
  "alt": "Example 1",
  "createdAt": "2023-11-02T11:00:00Z",
  "updatedAt": "2023-11-02T11:05:00Z"
}
```

**Query Parameters:**

| Parameter | Type   | Values                          | Description                                    | Example                                |
| --------- | ------ | ------------------------------- | ---------------------------------------------- | -------------------------------------- |
| `order`   | String | `src`, `createdat`, `updatedat` | Specifies the field to sort the image results. | `order=src` (Sorts by the `src` field) |

##### Location

| Field Name | Type | Nullable | Description |
| ---------- | ---- | -------- | ----------- |
|            |      |          |             |

### Resource

#### User

| Data Type | Field        | Null | Description                                             |
| --------- | ------------ | ---- | ------------------------------------------------------- |
| Number    | `uid`        | No   | Unique identifier for the user.                         |
| String    | `firstName`  | No   | User's first name.                                      |
| String    | `lastName`   | Yes  | User's last name.                                       |
| String    | `email`      | No   | Unique email address for the user.                      |
| String    | `createdAt`  | No   | ISO 8601 representation when the user was created.      |
| String    | `updatedAt`  | Yes  | ISO 8601 representation when the user was last updated. |
| String    | `loggedInAt` | Yes  | ISO 8601 representation when the user last logged in.   |

**Example:**

```json
{
  "uid": 0,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "createdAt": "2023-11-01T12:00:00Z",
  "updatedAt": "2023-11-15T08:30:00Z",
  "loggedInAt": "2023-11-15T08:30:00Z"
}
```

#### Blog

| Data Type | Field       | Null | Description                                             |
| --------- | ----------- | ---- | ------------------------------------------------------- |
| Number    | `uid`       | No   | Unique identifier for the blog.                         |
| String    | `title`     | No   | Title of the blog post.                                 |
| String    | `slug`      | No   | Unique SLUG to identifier the blog.                     |
| String    | `shortDesc` | No   | A brief description of the blog post.                   |
| Object    | `image`     | Yes  | Image refers object.                                    |
| Text      | `content`   | No   | Content of the blog post in Makedown format.            |
| String    | `createdAt` | No   | ISO 8601 representation when the blog was created.      |
| String    | `updatedAt` | Yes  | ISO 8601 representation when the blog was last updated. |

**Example:**

```json
{
  "uid": 0,
  "title": "Blog Post",
  "slug": "blog-post",
  "shortDesc": "A brief description of the blog post.",
  "image": {
    "src": "blog_image.jpg",
    "alt": "Blog Image"
  },
  "content": "<p>This is the blog content in Makedown format.</p>",
  "createdAt": "2023-11-10T09:45:00Z",
  "updatedAt": "2023-11-10T10:30:00Z"
}
```

#### Event

| Data Type | Field           | Null | Description                                                   |
| --------- | --------------- | ---- | ------------------------------------------------------------- |
| Number    | `uid`           | No   | Unique identifier for the event.                              |
| String    | `title`         | No   | Title of the event.                                           |
| String    | `slug`          | No   | Unique SLUG to identifying the event.                         |
| String    | `shortDesc`     | No   | A brief description of the event.                             |
| String    | `startDateTime` | No   | ISO 8601 representation the start date and time of the event. |
| String    | `endDateTime`   | No   | ISO 8601 representation the end date and time of the event.   |
| String    | `location`      | No   | Location where the event takes place.                         |
| Text      | `content`       | No   | Details of the event in Makedown format.                      |
| String    | `createdAt`     | No   | ISO 8601 representation when the event was created.           |
| String    | `updatedAt`     | Yes  | ISO 8601 representation when the event was last updated.      |

**Example:**

```json
{
  "uid": 0,
  "title": "Tech Conference",
  "slug": "tech-conference",
  "shortDesc": "Annual tech conference.",
  "startDateTime": "2023-12-01T09:00:00Z",
  "endDateTime": "2023-12-03T18:00:00Z",
  "location": "Convention Center",
  "content": "<p>Event details in Makedown format.</p>",
  "createdAt": "2023-10-20T14:00:00Z",
  "updatedAt": "2023-11-05T16:30:00Z"
}
```

#### Image

| Data Type | Field       | Null | Description                                              |
| --------- | ----------- | ---- | -------------------------------------------------------- |
| Number    | `uid`       | No   | Unique identifier for the image.                         |
| String    | `src`       | No   | Image name with extension.                               |
| String    | `alt`       | No   | Alternate text for the image.                            |
| String    | `createdAt` | No   | ISO 8601 representation when the image was created.      |
| String    | `updatedAt` | Yes  | ISO 8601 representation when the image was last updated. |

**Example:**

```json
{
  "uid": 0,
  "src": "example1.jpg",
  "alt": "Example 1",
  "createdAt": "2023-11-02T11:00:00Z",
  "updatedAt": "2023-11-02T11:05:00Z"
}
```

#### Login

| Data Type | Field                    | Null | Description            |
| --------- | ------------------------ | ---- | ---------------------- |
| Unknown   | \<bot validation fields> |      | Not currently defined. |

#### Authorization Information

| Data Type | Field                               | Null | Description            |
| --------- | ----------------------------------- | ---- | ---------------------- |
| Unknown   | \<authorization information fields> |      | Not currently defined. |

Reset Password

| Data Type | Field                    | Null | Description            |
| --------- | ------------------------ | ---- | ---------------------- |
| Unknown   | \<bot validation fields> |      | Not currently defined. |

### Error

| Field Name    | Type   | Description        |
| ------------- | ------ | ------------------ |
| `code`        | String | Status code.       |
| `message`     | String | Status message.    |
| `description` | String | Error description. |

**Status Code & Message:**

| Status Code | Message                                               |
| ----------- | ----------------------------------------------------- |
| 400         | The request cannot be fulfilled due to bad syntax.    |
| 401         | Access is denied.                                     |
| 403         | The server refuses to approve the request.            |
| 404         | The requested resource was not found.                 |
| 405         | The request method is not supported.                  |
| 500         | The server encountered an unexpected condition.       |
| 503         | The server is currently unable to handle the request. |

`GET`, `PATCH`, `DELETE`: The requested resource was not found.

```json
{
  "success": false,
  "error": {
    "code": 404,
    "message": "The requested resource was not found.",
    "description": "User with 345 was not found."
  }
}
```

`POST`, `PATCH`: The request cannot be fulfilled due to bad syntax.

```json
{
  "success": false,
  "error": {
    "code": 400,
    "message": "The request cannot be fulfilled due to bad syntax.",
    "description": "firstName is required."
  }
}
```

### POST Body

#### User

| Data Type | Field       | Min | Max | Required | Description             |
| --------- | ----------- | --- | --- | -------- | ----------------------- |
| String    | `firstName` | 2   | 50  | Yes      | First name of the user. |
| String    | `lastName`  | 2   | 50  | No       | Last name of the user.  |
| String    | `email`     | 7   | 100 | Yes      | Unique email address.   |

**Example:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com"
}
```

#### Blog

| Data Type | Field       | Min | Max    | Required | Description                                  |
| --------- | ----------- | --- | ------ | -------- | -------------------------------------------- |
| String    | `title`     | 5   | 100    | Yes      | Title of the blog post.                      |
| String    | `slug`      | 5   | 150    | Yes      | Unique SLUG to identifying the blogs.        |
| String    | `shortDesc` | 145 | 155    | Yes      | Short description of the blog post.          |
| Object    | `image`     | -   | 8MB    | No       | Image refers object.                         |
| Text      | `content`   | 300 | 65,535 | Yes      | Content of the blog post in Makedown format. |

**Example:**

```json
{
  "title": "Example Blog Title",
  "slug": "example-blog-title",
  "shortDesc": "This is a short description of the blog post.",
  "image": {
    "src": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    "alt": "Blog Image Alt Text"
  },
  "content": "<p>This is the content of the blog post in Makedown format.</p>"
}
```

#### Event

| Data Type | Field           | Min | Max    | Required | Description                                                                                          |
| --------- | --------------- | --- | ------ | -------- | ---------------------------------------------------------------------------------------------------- |
| String    | `title`         | 5   | 100    | Yes      | Title of the event.                                                                                  |
| String    | `slug`          | 5   | 150    | Yes      | Unique SLUG to identifying the events.                                                               |
| String    | `shortDesc`     | 145 | 155    | Yes      | Short description of the event.                                                                      |
| String    | `startDateTime` | 24  | 24     | Yes      | ISO 8601 representation of the start date and time of the event.                                     |
| String    | `endDateTime`   | 24  | 24     | Yes      | ISO 8601 representation of the end date and time of the event. Should be later than `startDateTime`. |
| String    | `location`      | 15  | 255    | Yes      | Location of the event.                                                                               |
| Text      | `content`       | 300 | 65,535 | Yes      | Content describing the event in Makedown format.                                                     |

**Example:**

```json
{
  "title": "Example Event Title",
  "slug": "example-event-title",
  "shortDesc": "This is a short description of the event.",
  "startDateTime": "2023-12-01T18:00:00Z",
  "endDateTime": "2023-12-01T20:00:00Z",
  "location": "Example Event Location",
  "content": "<p>This is the content describing the event in Makedown format.</p>"
}
```

#### Image

| Data Type | Field | Min | Max | Required | Description                                                   |
| --------- | ----- | --- | --- | -------- | ------------------------------------------------------------- |
| String    | `src` | -   | 8MB | Yes      | Image data specified as a data URI scheme, encoded in base64. |
| String    | `alt` | 15  | 50  | Yes      | Alternative text for the image.                               |

**Example:**

```json
{
  "src": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
  "alt": "Image Alt Text"
}
```

#### Authorization

| Data Type | Field                    | Required               | Description |
| --------- | ------------------------ | ---------------------- | ----------- |
| String    | `email`                  |                        |             |
| String    | `password`               |                        |             |
| Unknown   | \<bot validation fields> | Not currently defined. |             |

#### Request Password Reset

| Data Type | Field                    | Required               | Description |
| --------- | ------------------------ | ---------------------- | ----------- |
| String    | `email`                  |                        |             |
| Unknown   | \<bot validation fields> | Not currently defined. |             |

#### Reset Password

| Data Type | Field      | Required | Description |
| --------- | ---------- | -------- | ----------- |
| String    | `password` |          |             |

### PATCH Body

#### User

| Data Type | Field       | Min | Max | Nullable or Empty | Description                                    |
| --------- | ----------- | --- | --- | ----------------- | ---------------------------------------------- |
| String    | `firstName` | 2   | 50  | No                | First name of the user.                        |
| String    | `lastName`  | 2   | 50  | Yes               | Last name of the user.                         |
| String    | `email`     | -   | 100 | No                | Unique email address associated with the user. |

**Example:**

Let's say you want to update the firstName and email fields of a user.

```json
{
  "firstName": "NewFirstName",
  "email": "newemail@example.com"
}
```

#### Blog

| Data Type | Field       | Min | Max    | Nullable or Empty | Description                             |
| --------- | ----------- | --- | ------ | ----------------- | --------------------------------------- |
| String    | `title`     | 5   | 100    | No                | Title of the blog.                      |
| String    | `slug`      | 5   | 150    | No                | Unique SLUG to identifying the blog.    |
| String    | `shortDesc` | 145 | 155    | No                | Short description of the blog content.  |
| Object    | `image`     | -   | 8MB    | Yes               | Image Referring Object.                 |
| Text      | `content`   | 300 | 65,535 | No                | Content of the blog in Makedown format. |

**Example:**

If you wish to update the title and shortDesc fields of a blog.

```json
{
  "title": "New Blog Title",
  "shortDesc": "Updated short description of the blog."
}
```

#### Event

| Data Type | Field           | Min | Max    | Null or Empty | Description                                                                                   |
| --------- | --------------- | --- | ------ | ------------- | --------------------------------------------------------------------------------------------- |
| String    | `title`         | 5   | 100    | No            | Title of the event.                                                                           |
| String    | `slug`          | 5   | 150    | No            | Unique SLUG to identifying the event.                                                         |
| String    | `shortDesc`     | 145 | 155    | No            | Short description of the event.                                                               |
| String    | `startDateTime` | 24  | 24     | No            | ISO 8601 representation of the event's start date and time.                                   |
| String    | `endDateTime`   | 24  | 24     | No            | ISO 8601 representation of the event's end date and time. Must be later than `startDateTime`. |
| String    | `location`      | 15  | 255    | No            | Location where the event will take place.                                                     |
| Text      | `content`       | 300 | 65,535 | No            | Content describing the event in Makedown format.                                              |

**Example:**

For modifying the title, startDateTime, and endDateTime fields of an event.

```json
{
  "title": "New Event Title",
  "startDateTime": "2023-12-01T18:00:00Z",
  "endDateTime": "2023-12-01T20:00:00Z"
}
```

#### Image

| Data Type | Field | Min | Max | Null or Empty | Description                                 |
| --------- | ----- | --- | --- | ------------- | ------------------------------------------- |
| String    | `alt` | 15  | 50  | No            | Alternative text description for the image. |

**Example:**

If you're updating the alt field of an image.

```json
{
  "alt": "New Image Alt Description"
}
```

### Refers

Reference objects is used to include other resources in a resource.

#### Image

| Data Type | Field | Null | Response | Body | Description                                                                     |
| --------- | ----- | ---- | -------- | ---- | ------------------------------------------------------------------------------- |
| Number    | `uid` | No   | Yes      | No   | Unique identifier for the image.                                                |
| String    | `src` | No   | Yes      | Yes  | Image name with extension or specified as a data URI scheme, encoded in base64. |
| String    | `alt` | No   | Yes      | Yes  | Alternate text for the image.                                                   |

Note: "Response" refers to situations where the object is used for a response, "Body" refers to situations where the object is used in a request.

**Example:**

As response

```json
{
  //..
  "field": {
    "uid": 0,
    "src": "example1.jpg",
    "alt": "Image Alt Text"
  }
}
```

When making a request

```json
{
  //..
  "field": {
    "src": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    "alt": "Image Alt Text"
  }
}
```

## String Types

### Basic

**Not allowed:**

- Control Characters
- Whitespace Characters
- Unicode Characters
- `<>"'`

If `<>"'` are present, they must be HTML encoded.

### SLUG

The validation for SLUG follows specific criteria:

- It must contain only lowercase alphanumeric characters (`a-z, 0-9`) or hyphens (`-`).
- It cannot start or end with a hyphen.

```re
^(?!-)[a-z0-9-]+(?<!-)$
```

### Date

The validation for date follows specific criteria:

- It must follow the format `YYYY-MM-DDTHH:MM:SS.SSSZ`, where:
  - `YYYY` represents the year with four digits.
  - `MM` represents the month with two digits (01-12).
  - `DD` represents the day with two digits (01-31).
  - `T` separates the date and time parts.
  - `HH` represents the hour with two digits (00-23).
  - `MM` represents the minutes with two digits (00-59).
  - `SS` represents the seconds with two digits (00-59).
  - `SSS` represents the milliseconds with three digits (000-999).
  - `Z` represents the UTC time zone.

**For example:**

`2023-11-01T12:00:00.000Z` represents November 1, 2023, at 12:00:00 PM UTC.

```re
^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$
```

### Email

Email validation criteria include:

- The local part (before the @ symbol) can contain alphanumeric characters (`a-z, 0-9`), dots (`.`), underscores (`_`), percent signs (`%`), plus signs (`+`), or hyphens (`-`).
- The domain part (after the @ symbol) can contain alphanumeric characters (`a-z, 0-9`), dots (`.`), or hyphens (`-`).

**Example:**

```re
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$
```

### Password

**Allowed:**

- Alphanumeric characters (`A-Z, a-z, 0-9`)
- `! @ # $ % ^ & * ( ) _ + - = { } [ ] \ | ; : , . / ?`

### Text

**Not allowed:**

- Control Characters except for `\n`
- Whitespace Characters except for `\n`
- Unicode Characters
- `<>"'`

If `<>"'` are present, they must be HTML encoded.

Support Markdown syntax.

### Image

Is specified as filename with ext, or when uploading as a data URI scheme, encoded in base64.

## Status Codes

**2xx (Success):** Indicate that the request was received, understood, and accepted.

- **200 OK:** The request was successfully processed and returning the content.
- **201 Created:** Indicates successful creation of a new resource and returning the content.
- **204 No Content:** The server successfully processed the request but is not returning any content.

**4xx (Client Errors):** Occur when the client's request contains incorrect syntax or cannot be fulfilled.

- **400 Bad Request:** The request cannot be fulfilled due to bad syntax or other client-side errors.
- **401 Unauthorized:** The client needs to authenticate itself to get the requested response.
- **403 Forbidden:** The client is authenticate but does not have permission to access the requested resource.
- **404 Not Found:** The requested resource does not exist on the server.

**5xx (Server Errors):** Indicate that the server failed to fulfill a valid request due to an error on its end.

- **500 Internal Server Error:** A generic error message indicating that something has gone wrong on the server.
- **503 Service Unavailable:** The server is not ready to handle the request due to temporary overloading or maintenance.

## Expected Behavior

### Supported Methods

- Supports `GET`, `POST`, `PATCH`, and `DELETE` methods.

### Access

- `GET /login`, `GET /reset_password` are accessible without authorization.
- `POST /login`, `POST /reset_password` are accessible with bot protection measures.
- `PATCH /reset_password` requires a one-time token.
- All other requests requires an authentication token for access

### Authentication Token

- The token can only be obtained by logging in.
- The token is unique to the logged in user

### Successful Response

- `GET` endpoints deliver requested resource with status code 200.
- `POST` endpoints return the newly created resource with status code 201.
- `PATCH` endpoints return the updated resource with status code 200.
- `DELETE` endpoints confirm deletion with status code 204.
- All endpoints provide a successful message.

### Error Response

- Endpoints deliver an error message when they respond with 4xx status codes.
- The service responds with a 5xx status code to other errors.

### Individual Field Update

- `PATCH` endpoints enable updating individual fields.

### New Users

- Existing users create new users who must reset their password initially.

### Deletion

- Deleting a resource also removes related references (Foreign Keys) to other resources.
- A resource that is referenced(Foreign Keys) cannot be deleted.
- Files etc are deleted if there is no resource for them.

### Encryption

- All requests must be encrypted with TLS 1.2 or later

### Logging

- Logs activities to syslog.
- Logging of IP address and User-Agent when attempts to log in and attempts to reset the password.
- Logging of IP address, User-Agent and User ID when a user logs in, reset the password, creates, updates, or deletes.

## Images

### Sets

| Set                 | Purpose                                                                                         | Minimum        | Maximum          | Image Format   | Example                               |
| ------------------- | ----------------------------------------------------------------------------------------------- | -------------- | ---------------- | -------------- | ------------------------------------- |
| Original Image      | The original uploaded image, functioning as a backup and reference, e.g., for Google Image Bot. | 380x200 pixels | -                | -              | `/images/<SHA2-224>.ext`              |
| Web Content Image   | Images optimized for use on the website.                                                        | 380x200 pixels | 1920x1280 pixels | -              | `/images/optimized/<SHA2-224>.ext`    |
| Open Graph Image    | Images optimized for use on Facebook marked with the "-og" suffix.                              | 380x200 pixels | 1920x1010 pixels | 1.9:1 (+-0.09) | `/images/optimized/<SHA2-224>-og.ext` |
| Twitter Cards Image | Images optimized for use on Twitter Cards marked with the "-x" suffix.                          | 200x200 pixels | 1280x1280 pixels | 1:1            | `/images/optimized/<SHA2-224>-x.ext`  |

### Handling

**Naming:**

- Images are named with a SHA2-224 value followed by an extension type.
- The SHA2-224 value and extension type are determined after the image is optimized but before image processing.

**Storage:**

- An image is stored as an image set [Image Set], where all images in a set have the same SHA2-224 value and extension type.
- The original, unprocessed image is stored in `/images`.
- Optimized and processed images are stored in `/images/optimized`.
- Images are stored in the image format that fits their extension type.
- If an image name already exists and there is a difference between the new original, unprocessed image and the existing original, unprocessed image, the new image is saved as an original, unprocessed image without creating a new image set. The new image should have the suffix '-vV' inserted between the SHA2-224 value and the extension type. 'V' represents the next unused integer starting from 2.

**Optimization and Processing:**

- **Optimization:**

  - Optimized images should be without metadata and undergo TinyPNG optimization.
  - Optimized images should have a DPI of 95.

- **Adjustment of Image Format:**

  - Adjustment occurs by cropping with a focus on the center of the image to achieve the desired format.

- **Enlargement:**

  - Images should not be enlarged to achieve a size.

#### Upload

- Uploaded images must not exceed 8 MB in size.
- Permitted formats are JPEG and PNG.
- Images that do not meet the minimum size are rejected.
