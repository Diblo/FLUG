import { Provider } from "react-redux"
import store from "./rtk/store"
import { ToastProvider } from "react-native-toast-notifications"
import React, { Navigate, Route, Routes } from "react-router-dom";

import DefaultLayout from "./components/layouts/DefaultLayout";
import HomeScreen from "./screens/frontend/HomeScreen";
import EventsScreen from "./screens/frontend/EventsScreen";
import EventScreen from "./screens/frontend/EventScreen";
import BlogsScreen from "./screens/frontend/BlogsScreen";
import BlogScreen from "./screens/frontend/BlogScreen";
import AboutScreen from "./screens/frontend/AboutScreen";
import StatuteScreen from "./screens/frontend/StatuteScreen";

import AdminLayout from "./components/layouts/AdminLayout";
import AdminHomeScreen from "./screens/backend/AdminHomeScreen";
import AdminUsersScreen from "./screens/backend/AdminUsersScreen";
import AdminUserEditorScreen from "./screens/backend/AdminUserEditorScreen";
import AdminBlogsScreen from "./screens/backend/AdminBlogsScreen";
import AdminBlogEditorScreen from "./screens/backend/AdminBlogEditorScreen";
import AdminEventsScreen from "./screens/backend/AdminEventsScreen";
import AdminEventEditorScreen from "./screens/backend/AdminEventEditorScreen";

import AuthLayout from "./components/layouts/AuthLayout";
import LoginScreen from "./screens/auth/LoginScreen";
import LogoutScreen from "./screens/auth/LogoutScreen";
import RequestPasswordReset from "./screens/auth/RequestPasswordResetScreen";
import ResetPassword from "./screens/auth/ResetPasswordScreen";

import ErrorScreen from "./screens/ErrorScreen";
import NotFoundScreen from "./screens/NotFoundScreen";

import "./styles/App.css";

/**
 * Status 301 Component
 *
 * Redirects to a specified URL or URI with a 301 status code.
 * If a 'slug' is provided, it appends it to the URL or URI.
 *
 * @param {Object} props
 * @param {string} props.to - The target URL or URI to redirect to.
 * @param {string} [props.slug] - An 'slug' (optional) to append to the URL or URI.
 * @returns {JSX.Element} The redirection element.
 */
function Status301({ to, slug }) {
  if (slug) {
    return <Navigate to={`${to}/${slug}`} replace={true} />;
  }
  return <Navigate to={to} replace={true} />;
}

/**
 * App Component
 *
 * This component serves as the main routing configuration for the application,
 * handling routing for the backend, user authentication, and frontend sections.
 * It also includes redirection and 404 handling.
 *
 * @returns {JSX.Element} The application's routing configuration.
 */
export default function App() {
  return (
    <Provider store={store}>
      {/**
       * ToastProvider doc:
       * https://www.npmjs.com/package/react-native-toast-notifications
       */}
      <ToastProvider
        placement="bottom"
        duration={2500}
        animationType="slide-in"
        normalColor="#29abe1"
        swipeEnabled={true}
      >
        <Routes>
          {/**
           * Routes for Backend Section
           */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHomeScreen />} />

            <Route path="/admin/users" element={<AdminUsersScreen />} />
            <Route
              path="/admin/users/new_user"
              element={<AdminUserEditorScreen />}
            />
            <Route
              path="/admin/users/:uid"
              element={<AdminUserEditorScreen />}
            />
            <Route path="/admin/blogs" element={<AdminBlogsScreen />} />
            <Route
              path="/admin/blogs/new_blog"
              element={<AdminBlogEditorScreen />}
            />
            <Route
              path="/admin/blogs/:uid"
              element={<AdminBlogEditorScreen />}
            />
            <Route path="/admin/events" element={<AdminEventsScreen />} />
            <Route
              path="/admin/events/new_event"
              element={<AdminEventEditorScreen />}
            />
            <Route
              path="/admin/events/:uid"
              element={<AdminEventEditorScreen />}
            />

            <Route path="/admin/error" element={<ErrorScreen />} />

            {/* Redirects
            In the backend we will show 404 but stay on the URI to improve debugging,
            and so we don't send the user away from the backend
        */}
            <Route path="*" element={<NotFoundScreen />} />
          </Route>

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
          <Route element={<AuthLayout />}>
            <Route path="/log-ind" element={<LoginScreen />} />
            <Route path="/log-ud" element={<LogoutScreen />} />
            <Route
              path="/anmod-om-nulstilling-af-adgangskode"
              element={<RequestPasswordReset />}
            />
            <Route
              path="/nulstil-adgangskode/:accessToken"
              element={<ResetPassword />}
            />
          </Route>

          {/**
           * Routes for Frontend Section
           */}
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<HomeScreen />} />

            <Route path="/arrangementer" element={<EventsScreen />} />
            <Route path="/arrangementer/:slug" element={<EventScreen />} />
            <Route path="/blogs" element={<BlogsScreen />} />
            <Route path="/blogs/:slug" element={<BlogScreen />} />
            <Route path="/om" element={<AboutScreen />} />
            <Route path="/vedtægter" element={<StatuteScreen />} />

            <Route path="/fejl" element={<ErrorScreen />} />
          </Route>

          {/**
           * 404 Handling
           *
           * Handles URIs with no matching routes.
           *
           * NOTE:
           * To accommodate SEO, all 404s should be redirected with a 301 status code to
           * appropriate content or to the root of the site.
           */}
          <Route path="/blog" element={<Status301 to="/blogs" />} />
          <Route path="/blog/:slug" element={<Status301 to="/blogs" />} />
          <Route path="/events" element={<Status301 to="/arrangementer" />} />
          <Route
            path="/events/:slug"
            element={<Status301 to="/arrangementer" />}
          />
          <Route path="/event" element={<Status301 to="/arrangementer" />} />
          <Route
            path="/event/:slug"
            element={<Status301 to="/arrangementer" />}
          />
          <Route path="/about" element={<Status301 to="/om" />} />

          <Route path="/login" element={<Status301 to="/log-ind" />} />
          <Route path="/logout" element={<Status301 to="/log-ud" />} />

          <Route path="*" element={<Status301 to="/" />} />
        </Routes>
      </ToastProvider>
    </Provider>
  )
}
