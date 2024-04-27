/**
 * router.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/} More information about the GNU Affero General Public License v3.0
 * @author Fyns Linux User Group
 */
import React, { cloneElement, createElement, isValidElement } from "react"
import context from "./context"
import { createRoutesFromChildren } from "./utils/route"
import { buildLocation, getTargetFromUrl, resolveURL } from "./utils/url"

/**
 * @typedef {import("./context").Params} Params
 * @typedef {import("./context").TargetObject} TargetObject
 * @typedef {import("./context").Route} Route
 * @typedef {import("./context").Routes} Routes
 * @typedef {import("./context").Component} Component
 * @typedef {import("./config").ParamValidators} ParamValidators
 *
 * @typedef {import("./context").Location} Location
 * @typedef {import("./context").SetRoute} SetRoute
 * @typedef {import("./context").SetLocation} SetLocation
 *
 * @typedef {Object} RouteCondition
 * @property {JSX.Element} content
 * @property {Route} route
 */

/**
 * Handles the component based on its type.
 *
 * @param {Component} component - The component to handle.
 * @param {Record<string, any>} [props] - The props to apply to the component.
 * @param {React.ReactNode} [children] - The children elements of the component.
 * @returns {JSX.Element} - The JSX element.
 */
const handleComponent = (component, props = {}, children = undefined) => {
  if (isValidElement(component)) {
    return Object.keys(props).length === 0
      ? component
      : cloneElement(component, props, children)
  }

  return createElement(
    /** @type {React.FunctionComponent<{}> | React.ComponentClass<{}, any> | string} */ (
      component
    ),
    props,
    children,
  )
}

/**
 * A component for managing routes.
 */
class Router extends React.Component {
  /**
   * @param {Object} props - Component properties.
   * @param {React.ReactNode} props.children - The routes for the Router.
   */
  constructor(props) {
    super(props)

    this.routes = createRoutesFromChildren(this.props.children)

    /**
     * @type {{routeCondition: RouteCondition, location: string | TargetObject}}
     */
    this.state = {
      routeCondition: {
        content: null,
        route: {},
      },
      location: "/",
    }
  }

  static getDerivedStateFromError() {
    return {}
  }

  componentDidCatch() {
    const { route } = this.state.routeCondition
    if (route.errorComponent) {
      this.setRoute(route, route.errorComponent)
    }
  }

  /**
   * @type {SetLocation}
   */
  setLocation = (target) => {
    this.setState((prevState) => ({
      ...prevState,
      location: target,
    }))
  }

  /**
   * Sets the current route condition.
   *
   * @type {SetRoute}
   */
  setRoute = (route, contentComponent = null, props = {}) => {
    let content = handleComponent(
      contentComponent || route.defaultComponent,
      props,
    )
    if (route.layoutComponent) {
      content = handleComponent(route.layoutComponent, {}, content)
    }

    this.setState((prevState) => ({
      ...prevState,
      routeCondition: { content, route },
    }))
  }

  loadURL = () => {
    const target = getTargetFromUrl(window.location)
    const route = this.routes.getRoute(target.path)
    if (route) {
      this.setLocation(target)
      this.setRoute(route)
    }
  }

  /**
   * Handles link clicks to navigate within the application.
   *
   * @param {MouseEvent} event
   * @returns {void}
   */
  handleLinkClick = (event) => {
    if (
      event.ctrlKey ||
      event.metaKey ||
      !(event.target instanceof HTMLElement) ||
      event.target.tagName.toLowerCase() !== "a"
    )
      return

    const url = resolveURL(
      event.target.getAttribute("href"),
      window.location.href,
    )

    if (url && url.origin === window.location.origin) {
      event.preventDefault()

      const target = getTargetFromUrl(url)
      const route = this.routes.getRoute(target.path)
      if (route) {
        window.history.pushState(null, "", target.toString())
        this.setLocation(target)
        this.setRoute(route)
      }
    }
  }

  componentDidMount() {
    this.loadURL()
    window.addEventListener("click", this.handleLinkClick)
    window.addEventListener("popstate", this.loadURL)
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleLinkClick)
    window.removeEventListener("popstate", this.loadURL)
  }

  render() {
    const { routeCondition, location } = this.state

    return (
      <context.Provider
        value={{
          routes: this.routes,
          route: routeCondition.route,
          setRoute: this.setRoute,
          location: buildLocation(location, routeCondition.route.params || {}),
          setLocation: this.setLocation,
        }}
      >
        {routeCondition.content}
      </context.Provider>
    )
  }
}

export default Router
