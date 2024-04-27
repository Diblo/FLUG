/**
 * routerContext.js
 *
 * @file Provides context for router-related information.
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */
import { createContext } from "react"

/**
 * @typedef {Record<string, any>} Params
 */

/**
 * @typedef {React.FunctionComponent<{}> | React.ComponentClass<{}, any> | string} CreateComponent
 */

/**
 * @typedef {JSX.Element} ElementComponent
 */

/**
 * @typedef {ElementComponent | CreateComponent} Component
 */

/**
 * @typedef {Object} TargetObject
 * @property {string} path
 * @property {string} search
 * @property {string} hash
 * @property {() => string} toString
 */

/**
 * @typedef {Object} TargetParams
 * @property {Params} target.pathParams - Path parameters.
 * @property {Params} target.searchParams - Search parameters.
 */

/**
 * @typedef {Object} Route
 * @property {string} alias - Alias for the route.
 * @property {string} path
 * @property {string} patternPath
 * @property {Params} params
 * @property {Component} defaultComponent - Component to render for the route.
 * @property {CreateComponent?} layoutComponent - Layout component to render for the route.
 * @property {Component?} notFoundComponent
 * @property {CreateComponent?} errorComponent
 */

/**
 * @callback GetRoute
 * @param {string} path - The path to find.
 * @returns {Route | null} The matched route or null if not found.
 */

/**
 * @callback GetNearestRoute
 * @param {string} path - The current path.
 * @returns {Route | null} The nearest parent route or null if not found.
 */

/**
 * @callback GetRouteByAlias
 * @param {string} alias
 * @param {Params} [params={}] - The parameters to include in the route.
 * @returns {Route | null} The matched route or null if not found.
 */

/**
 * @callback GetPathByAlias
 * @param {string} alias - The alias to find.
 * @param {Params} [params={}] - The parameters to include in the route.
 * @returns {string | null} The matched path or null if not found.
 */

/**
 * @callback AliasExists
 * @param {string} alias - The alias to check.
 * @returns {boolean} - True if the alias exists, otherwise false.
 */

/**
 * @typedef {Object} Routes
 * @property {GetRoute} getRoute - Get a route based on path.
 * @property {GetNearestRoute} getNearestRoute - Get the nearest parent route based on current route.
 * @property {GetRouteByAlias} getRouteByAlias
 * @property {GetPathByAlias} getPathByAlias - Get the path of an alias
 * @property {AliasExists} aliasExists - Checks if an alias exists in the route tree.
 */

/**
 * @callback SetRoute
 * @param {Route} route
 * @param {Component} [content]
 * @param {Record<string, any>} [props]
 * @returns {void}
 */

/**
 * @callback SetLocation
 * @param {string | TargetObject} target
 * @returns {void}
 */

/**
 * Containing the current location information.
 *
 * @typedef {Object} Location
 * @property {TargetObject & TargetParams} target
 * @property {Params} params
 */

/**
 * @typedef {Object} RouterContext
 * @property {Routes} routes
 * @property {Route?} route
 * @property {SetRoute} setRoute
 * @property {SetLocation} setLocation
 * @property {Location} location
 */

/**
 * Context for router-related information.
 *
 * @type {React.Context<RouterContext>}
 */
const context = createContext(null)

export default context
