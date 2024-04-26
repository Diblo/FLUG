import { useCallback, useContext, useMemo } from "react"
import routerContext from "./context"
import { resolveTarget } from "./utils/url"

/**
 * @typedef {import("./context").Location} Location
 * @typedef {import("./context").Params} Params
 * @typedef {import("./context").Route} Route
 * @typedef {import("./context").Routes} Routes
 * @typedef {import("./context").TargetObject} TargetObject
 *
 * @typedef {Object} NavigateOptions
 * @property {boolean} [replace]
 * @property {boolean} [noHistory]
 *
 * @typedef {Object} AliasNavigateOptions
 * @property {Params} [pathParams]
 * @property {string} [search]
 * @property {string} [hash]
 *
 * @callback NavigateTo
 * @param {string} target - The target (path, search, and/or hash).
 * @param {NavigateOptions} [options] - Optional parameters.
 * @returns {void}
 *
 * @callback NavigateUp
 * @param {NavigateOptions} [options] - Optional parameters.
 * @returns {void}
 *
 * @callback NavigateRedirect
 * @param {string} target - The target (path, search, and/or hash).
 * @returns {void}
 *
 * @callback NavigateAlias
 * @param {string} alias - The alias of the route to navigate to.
 * @param {NavigateOptions & AliasNavigateOptions} [options] - Optional parameters.
 * @returns {void}
 *
 * @typedef {Object} Navigate
 * @property {NavigateTo} to
 * @property {NavigateUp} up
 * @property {NavigateRedirect} redirect
 * @property {NavigateAlias} alias
 *
 * @typedef {Object} UseNavigation
 * @property {Location} location
 * @property {Navigate} navigate
 *
 * @typedef {Object} NavData
 * @property {Route} [route]
 * @property {TargetObject} [target]
 */

/**
 * Provides access to navigation methods and location information.
 *
 * @returns {UseNavigation} The router navigation.
 * @throws {Error} Throws an error if used outside of Router.
 */
export const useNavigation = () => {
  const context = useContext(routerContext)
  if (!context) {
    throw new Error("useNavigation must be used within Router")
  }

  const { routes, setRoute, location, setLocation } = context

  const nav = useCallback(
    /**
     * @param {string | TargetObject} target
     * @param {Route?} route
     * @param {NavigateOptions} [options] - Optional parameters.
     */
    (target, route, options = {}) => {
      if (!route) {
        return
      }

      if (options.replace) {
        window.history.replaceState(null, "", target.toString())
      } else if (!options.noHistory) {
        window.history.pushState(null, "", target.toString())
      }

      setLocation(target)
      setRoute(route)
    },
    [setRoute, setLocation]
  )

  /**
   * Navigates to the specified target.
   *
   * @type {Navigate}
   */
  const navigate = useMemo(
    () => ({
      to: (target, options) => {
        const newTarget = resolveTarget(target, location.target)
        const route = routes.getRoute(newTarget.path)
        nav(newTarget, route, options)
      },
      up: (options) => {
        const route = routes.getNearestRoute(location.target.path)
        nav(route.path, route, options)
      },
      redirect: function (target) {
        this.to(target, { replace: true })
      },
      alias: (alias, options) => {
        const { pathParams = {}, search = null, hash = null } = options
        const route = routes.getRouteByAlias(alias, pathParams)
        nav(`${route.path}${search || ""}${hash || ""}`, route, options)
      },
    }),
    [routes, location, nav]
  )

  return { location, navigate }
}

/**
 * @callback ShowNotFound
 * @param {React.ReactNode} [message]
 * @param {string} [header]
 * @returns {void}
 *
 * @callback ShowError
 * @param {React.ReactNode} [message]
 * @param {string} [header]
 * @returns {void}
 *
 * @callback GetPathByAlias
 * @param {string} alias
 * @param {Params} [params]
 * @returns {string | null}
 *
 * @typedef {Object} UseRouter
 * @property {ShowNotFound} showNotFound
 * @property {ShowError} showError
 * @property {GetPathByAlias} getPathByAlias
 */

/**
 * Provides access to not found and error methods.
 *
 * @returns {UseRouter}
 * @throws {Error} Throws an error if used outside of Router.
 */
export const useRouter = () => {
  const context = useContext(routerContext)
  if (!context) {
    throw new Error("useRouter must be used within Router")
  }

  const { routes, route, setRoute } = context

  const showNotFound = useCallback(
    /**
     * @type {ShowNotFound}
     */
    (message = null, header = null) => {
      if (!route) return

      setRoute(route, route.notFoundComponent, {
        message,
        header,
      })
    },
    [route, setRoute]
  )

  const showError = useCallback(
    /**
     * @type {ShowError}
     */
    (message = null, header = null) => {
      if (!route) return

      setRoute(route, route.errorComponent, {
        message,
        header,
      })
    },
    [route, setRoute]
  )

  const getPathByAlias = useCallback(
    /**
     * @type {GetPathByAlias}
     */
    (alias, params) => {
      if (routes.aliasExists(alias)) {
        return routes.getPathByAlias(alias, params)
      }

      return null
    },
    [routes]
  )

  return { showNotFound, showError, getPathByAlias }
}
