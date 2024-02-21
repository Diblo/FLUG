## Functional Requirements

| ID     | Name                           | Description                                                                                     | Completed |
| ------ | ------------------------------ | ----------------------------------------------------------------------------------------------- | :-------: |
| F-1    | `GET`                          | Responds with the requested resource                                                            |     -     |
| F-2    | `POST` and `PATCH`             | Responds with the newly created or updated resource                                             |     -     |
| F-3    | `DELETE`                       | Responds with a success message                                                                 |     -     |
| F-4    | `GET /users`                   | Returns a page with a list of users                                                             |     -     |
| F-5    | `POST /users`                  | Creates a new user and sends a password reset link to the user via email                        |     -     |
| F-6    | `GET /users/[uid]`             | Returns the user with `uid`                                                                     |     -     |
| F-7    | `PATCH /users/[uid]`           | Updates the user with `uid`                                                                     |     -     |
| F-8    | `DELETE /users/[uid]`          | Deletes the user with `uid`                                                                     |     -     |
| F-9    | `GET /blogs`                   | Returns a page with a list of blogs                                                             |     -     |
| F-10   | `POST /blogs`                  | Creates a new blog                                                                              |     -     |
| F-10.1 | Facebook                       | Adds the blog post to FLUG's Facebook group feed                                                |     -     |
| F-11   | `GET /blogs/[id]`              | Returns the blog with `uid` or `SLUG`                                                           |     -     |
| F-12   | `PATCH /blogs/[uid]`           | Updates the blog with `uid`                                                                     |     -     |
| F-12.1 | Facebook                       | Updates the blog post in FLUG's Facebook group feed                                             |     -     |
| F-13   | `DELETE /blogs/[uid]`          | Deletes the blog with `uid`                                                                     |     -     |
| F-13.1 | Facebook                       | Deletes the blog post in FLUG's Facebook group feed                                             |     -     |
| F-14   | `GET /events`                  | Returns a page with a list of events                                                            |     -     |
| F-15   | `POST /events`                 | Creates a new event                                                                             |     -     |
| F-15.1 | Facebook                       | Adds the event post to FLUG's Facebook group events                                             |     -     |
| F-15.2 | Meetup                         | Adds the event post to FLUG's Meetup group                                                      |     -     |
| F-15.3 | Google                         | Adds the event post to FLUG's Google Calendar                                                   |     -     |
| F-16   | `GET /events/[id]`             | Returns the event with `uid` or `SLUG`                                                          |     -     |
| F-17   | `PATCH /events/[uid]`          | Updates the event with `uid`                                                                    |     -     |
| F-17.1 | Facebook                       | Updates the event post in FLUG's Facebook group events                                          |     -     |
| F-17.2 | Meetup                         | Updates the event post in FLUG's Meetup group                                                   |     -     |
| F-17.3 | Google                         | Updates the event post in FLUG's Google Calendar                                                |     -     |
| F-18   | `DELETE /events/[uid]`         | Deletes the event with `uid`                                                                    |     -     |
| F-18.1 | Facebook                       | Deletes the event post in FLUG's Facebook group events                                          |     -     |
| F-18.2 | Meetup                         | Deletes the event post in FLUG's Meetup group                                                   |     -     |
| F-18.3 | Google                         | Deletes the event post in FLUG's Google Calendar                                                |     -     |
| F-20   | `GET /images`                  | Returns an image with `uid`                                                                     |     -     |
| F-20   | `GET /images/[uid]`            | Returns a page with a list of images                                                            |     -     |
| F-17   | `PATCH /images/[uid]`          | Updates the image with `uid`                                                                    |     -     |
| F-17   | `DELETE /images/[uid]`         | Deletes the image with `uid`                                                                    |     -     |
| F-19   | `GET /location/[address]`      | Returns a page with a list of location results from Google Geocoding API (`address` URL-encode) |     -     |
| F-21   | `GET /login`                   | Returns login validation options, e.g., captcha                                                 |     -     |
| F-22   | `POST /login`                  | Logs in the user and returns authorization information                                          |     -     |
| F-23   | `GET /reset_password`          | Returns password reset validation options, e.g., captcha                                        |     -     |
| F-24   | `POST /reset_password`         | Requests a link for password reset and responds with a success message                          |     -     |
| F-25   | `POST /reset_password/[token]` | Resets the user's password and returns authorization information                                |     -     |

## Non-Functional Requirements

| ID     | Name                          | Description                                                                                                | Completed |
| ------ | ----------------------------- | ---------------------------------------------------------------------------------------------------------- | :-------: |
| NF-1   | Error Message                 | `GET`, `POST`, `PATCH`, `DELETE` sends an error message upon failure                                       |     -     |
| NF-2   | Access Authorization          | Resources without specific authorization require a token for authorization                                 |     -     |
| NF-2.1 | No Authorization              | `GET /login`, `GET /reset_password`, and `GET /images/*` can be accessed without any form of authorization |     -     |
| NF-2.2 | Bot Protection Authorization  | `POST /login` and `POST /reset_password` can be accessed with bot protection authorization                 |     -     |
| NF-2.3 | One-Time Token                | `PATCH /reset_password` cannot be accessed without a one-time token for authorization                      |     -     |
| NF-3   | Created User                  | Administrators create new users who must reset their password initially                                    |     -     |
| NF-4   | Resource Deletion             | The resource and other references (Foreign Keys) to the resource are deleted along with the resource       |     -     |
| NF-4.1 | Image Deletion                | Images cannot be deleted if there are references (Foreign Keys) to the image                               |     -     |
| NF-5   | Logging                       | Log to syslog                                                                                              |     -     |
| NF-5.1 | Log IP address and User-Agent | Login, login attempts, password reset, password reset attempts, creation, updates, and deletions           |     -     |
| NF-5.1 | Log User ID                   | Creation, updates, and deletions                                                                           |     -     |
