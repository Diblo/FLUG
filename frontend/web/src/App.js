/**
 * App.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */
import React from "react"

import { Ui } from "./modules/ui"
import Router, { Route, NavUp, RouterConfig } from "./modules/router"

import { PATH_PARAMS } from "./config"

import FrontendLayout from "./screens/layout/FrontendLayout/FrontendLayout"
import HomePage from "./screens/pages/frontend/HomePage/HomePage"
import AboutPage from "./screens/pages/frontend/AboutPage/AboutPage"
import StatutePage from "./screens/pages/frontend/StatutePage/StatutePage"
import BlogsPage from "./screens/pages/frontend/BlogsPage/BlogsPage"
import BlogPage from "./screens/pages/frontend/BlogPage/BlogPage"
import EventsPage from "./screens/pages/frontend/EventsPage/EventsPage"
import EventPage from "./screens/pages/frontend/EventPage/EventPage"

import AuthLayout from "./screens/layout/AuthLayout/AuthLayout"

import BackendLayout from "./screens/layout/BackendLayout/BackendLayout"
import BackendHomePage from "./screens/pages/backend/HomePage/HomePage"
import BackendEventsPage from "./screens/pages/backend/EventsPage/EventsPage"
import BackendUsersPage from "./screens/pages/backend/UsersPage/UsersPage"
import BackendUserPage from "./screens/pages/backend/UserPage/UserPage"
import BackendUserEditorPage from "./screens/pages/backend/UserEditorPage/UserEditorPage"

import NotFoundPage from "./screens/pages/NotFoundPage/NotFoundPage"
import ErrorPage from "./screens/pages/ErrorPage/ErrorPage"

import "./App.css"

for (const param in PATH_PARAMS) {
  RouterConfig.addPathParam(param, PATH_PARAMS[param])
}

const App = () => (
  <Ui>
    <Router>
      <Route alias="home" path="/" component={<HomePage />} layout={FrontendLayout} error={ErrorPage}>
        {/**
         * Routes for Frontend Section
         */}
        <Route alias="events" path="arrangementer" component={<EventsPage />}>
          <Route alias="event" path=":slug" component={<EventPage />} />
        </Route>
        <Route alias="blogs" path="blogs" component={<BlogsPage />}>
          <Route alias="blog" path=":slug" component={<BlogPage />} />
        </Route>
        <Route alias="statute" path={encodeURI("vedtægter")} component={<StatutePage />} />
        <Route alias="about" path="om" component={<AboutPage />} />

        {/**
         * Routes for User Authentication Section
         *
         * Routes for user login, logout, and password reset requests.
         *
         * NOTE:
         * There is no parent path for user authentication. This is because the pages are
         * a series of loose pages that only have a common layout. The pages use a different
         * layout to avoid that the backend layout is displayed before login and that the
         * frontend and backend layout are not mixed up on user authentication.
         */}
        <Route path="godkendelse" layout={AuthLayout}>
          <Route alias="login" path="login" component={<NotFoundPage />} />
          <Route alias="logout" path="logout" component={<NotFoundPage />} />
          <Route alias="reset_password" path="reset-password" component={<NotFoundPage />}>
            <Route path=":accessToken" component={<NotFoundPage />} />
          </Route>
        </Route>

        {/**
         * Routes for Backend Section
         */}
        <Route alias="admin.home" path="admin" component={<BackendHomePage />} layout={BackendLayout}>
          <Route alias="admin.events" path="events" component={<BackendEventsPage />}>
            <Route alias="admin.event.new" path="new" component={<NotFoundPage />} />
            <Route alias="admin.event" path=":uid" component={<NotFoundPage />}>
              <Route alias="admin.event.edit" path="edit" component={<NotFoundPage />} />
            </Route>
          </Route>

          <Route alias="admin.blogs" path="blogs" component={<NotFoundPage />}>
            <Route alias="admin.blog.new" path="new" component={<NotFoundPage />} />
            <Route alias="admin.blog" path=":uid" component={<NotFoundPage />}>
              <Route alias="admin.blog.edit" path="edit" component={<NotFoundPage />} />
            </Route>
          </Route>

          <Route alias="admin.users" path="users" component={<BackendUsersPage />}>
            <Route alias="admin.user.new" path="new" component={<BackendUserEditorPage />} />
            <Route alias="admin.user" path=":uid" component={<BackendUserPage />}>
              <Route alias="admin.user.edit" path="edit" component={<BackendUserEditorPage />} />
            </Route>
          </Route>

          {/** Redirects
           * In the backend will show 404 page
           */}
          <Route path="*" component={NotFoundPage} />
        </Route>
      </Route>

      {/**
       * 404 Handling
       *
       * Handles URls with no matching routes.
       *
       * NOTE:
       * To accommodate SEO, all 404s should be redirected with 301 status to
       * appropriate content or to the root of the site.
       */}
      <Route path="*" component={NavUp} />
    </Router>
  </Ui>
)

export default App
