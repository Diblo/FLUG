/**
 * router.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/} More information about the GNU Affero General Public License v3.0
 * @author Fyns Linux User Group
 */
import React, { isValidElement } from "react"
import RouterConfig from "../config"

/**
 * @typedef {import("../context").Route} Route
 * @typedef {import("../context").Params} Params
 * @typedef {import("../context").Component} Component
 * @typedef {import("../context").CreateComponent} CreateComponent
 * @typedef {import("../context").GetRoute} GetRoute
 * @typedef {import("../context").GetNearestRoute} GetNearestRoute
 * @typedef {import("../context").GetRouteByAlias} GetRouteByAlias
 * @typedef {import("../context").GetPathByAlias} GetPathByAlias
 * @typedef {import("../context").AliasExists} AliasExists
 * @typedef {import("../context").Routes} Routes
 *
 * @typedef {Object} InputRoute
 * @property {string} path - The path of the route.
 * @property {Component} [component] - Component to render for the route.
 * @property {CreateComponent} [layout] - Layout component to render for the route.
 * @property {CreateComponent} [error]
 * @property {string} [alias] - Alias for the route.
 *
 * @typedef {Object} SegmentNode
 * @property {string} segment - The segment of the route.
 * @property {string} patternPath
 * @property {Component?} defaultComponent - Component to render for the segment.
 * @property {CreateComponent?} layoutComponent - Layout component to render for the segment.
 * @property {Component?} notFoundComponent - Component to render when the route is not found.
 * @property {CreateComponent?} errorComponent - Component to render when there's an error.
 * @property {string | null} alias - Alias for the segment.
 * @property {() => boolean} isRoute
 * @property {() => boolean} isWildcardNode
 * @property {SegmentNode | null} parent - Parent segment node.
 * @property {Record<string, SegmentNode>} children - Children segment nodes.
 * @property {CreateComponent?} _layoutComponent - Internal layout component.
 * @property {Component?} _notFoundComponent - Internal notFoundComponent.
 * @property {CreateComponent?} _errorComponent - Internal errorComponent.
 */

/**
 * @param {string} path
 * @returns {Array<string>}
 */
const splitPath = (path) => path.split("/").filter((segment) => segment !== "")

/**
 * Parses and normalizes parameter values based on the provided key using pre-defined parsing functions.
 *
 * @param {string} param - The key corresponding to the parameter type.
 * @param {string} value - The value of the parameter to be parsed.
 * @returns {string | number | boolean | undefined} The normalized value of the parameter, or undefined if parsing fails.
 */
const parseParameter = (param, value) => {
  const parser = RouterConfig.getPathValidator(param)
  if (parser) {
    const _value = parser(value)
    if (_value !== undefined) {
      return _value
    }
  }
  return undefined
}

/**
 * @param {string} patternPath - The pattern path.
 * @param {Params} [params]
 * @returns {string}
 */
const buildPath = (patternPath, params = {}) => {
  const patternSegments = splitPath(patternPath)
  const _params = { ...params }

  const isMatch = patternSegments.every((patternSegment, index) => {
    if (patternSegment.startsWith(":")) {
      const param = patternSegment.slice(1)

      const value = parseParameter(param, _params[param])
      if (value === undefined) {
        return false
      }

      patternSegments[index] = String(value)

      delete _params[param]
    }

    return true
  })

  const allParamsUsed = Object.keys(_params).length === 0

  return isMatch && allParamsUsed ? `/${patternSegments.join("/")}` : null
}

/**
 * Creates a segment node.
 *
 * @param {SegmentNode | null} parent - The parent segment node.
 * @param {string} segment - The segment of the route.
 * @returns {SegmentNode} The created segment node.
 */
const createNode = (parent, segment) => ({
  alias: null,
  segment,
  get patternPath() {
    return `${
      !this.parent || this.parent.patternPath === "/"
        ? ""
        : this.parent.patternPath
    }/${this.segment}`
  },
  defaultComponent: null,
  get layoutComponent() {
    return (
      this._layoutComponent ||
      (this.parent ? this.parent.layoutComponent : null)
    )
  },
  set layoutComponent(value) {
    this._layoutComponent = value
  },
  get notFoundComponent() {
    return (
      this._notFoundComponent ||
      (this.parent ? this.parent.notFoundComponent : null)
    )
  },
  set notFoundComponent(value) {
    this._notFoundComponent = value
  },
  get errorComponent() {
    return (
      this._errorComponent || (this.parent ? this.parent.errorComponent : null)
    )
  },
  set errorComponent(value) {
    this._errorComponent = value
  },
  isRoute: function () {
    return this.defaultComponent !== null
  },
  isWildcardNode: function () {
    return this.segment === "*"
  },
  parent,
  children: {},
  _layoutComponent: null,
  _notFoundComponent: null,
  _errorComponent: null,
})

/**
 * @param {SegmentNode} node
 * @param {Params} params
 * @returns {Route}
 */
const createRouteFromRouteNode = (node, params) => ({
  alias: node.alias,
  path: buildPath(node.patternPath, params),
  patternPath: node.patternPath,
  params,
  defaultComponent: node.defaultComponent,
  layoutComponent: node.layoutComponent,
  notFoundComponent: node.notFoundComponent,
  errorComponent: node.errorComponent,
})

/**
 * Represents a route tree that manages routes.
 */
class RouteTree {
  /**
   * Constructs a new RouteTree instance.
   */
  constructor() {
    /** @type {SegmentNode} */
    this.rootNode = createNode(null, "") // create root
    /** @type {Object.<string, SegmentNode>} */
    this.alias = {}
  }

  /**
   *
   * @private
   * @param {string} path - The path to add.
   * @returns {SegmentNode} The last segment node of the added path.
   */
  _addPath(path) {
    const segments = splitPath(path)
    let currentNode = this.rootNode

    for (const segment of segments) {
      if (!currentNode.children[segment]) {
        currentNode.children[segment] = createNode(currentNode, segment)
      }
      currentNode = currentNode.children[segment]
    }

    return currentNode
  }

  /**
   * Sets an alias for a node.
   *
   * @private
   * @param {string} alias - The alias to add.
   * @param {SegmentNode} node - The corresponding segment node.
   * @returns {void}
   */
  _setAlias(alias, node) {
    this.alias[alias] = node
  }

  /**
   * @private
   * @param {string} path
   * @returns {{node?: SegmentNode, params?: Params}}
   */
  _routeSearch(path) {
    const segments = splitPath(path)
    const params = {}

    /**
     *
     * @param {SegmentNode} node
     * @param {string} segment
     * @returns {SegmentNode?}
     */
    const getChild = (node, segment) => {
      if (node.children[segment]) {
        return node.children[segment]
      }

      for (const nodeSegment in node.children) {
        if (!nodeSegment.startsWith(":")) {
          continue
        }

        const param = nodeSegment.slice(1)
        const value = parseParameter(param, segment)
        if (value === undefined) {
          continue
        }

        params[param] = value

        return node.children[nodeSegment]
      }

      return null
    }

    /**
     * Recursively search for node in the node tree.
     *
     * @param {SegmentNode?} node - The current node.
     * @param {Array<string>} remainingSegments - The remaining segments to traverse.
     * @returns {SegmentNode?} The matched segment node or null if not found.
     */
    const preformRecursiveSearch = (
      node,
      remainingSegments,
      wildcardNode = null
    ) => {
      if (!node || remainingSegments.length === 0) {
        return node && node.isRoute() ? node : wildcardNode
      }

      const childNode = getChild(node, remainingSegments.shift())

      return preformRecursiveSearch(
        childNode,
        remainingSegments,
        node.children["*"] || wildcardNode
      )
    }

    const node = preformRecursiveSearch(this.rootNode, segments)

    if (node && node.isRoute()) {
      return { node, params }
    }

    return {}
  }

  /**
   * Adds a route.
   *
   * @param {InputRoute} route - The route to add.
   * @returns {void}
   */
  add(route) {
    const node = this._addPath(route.path)

    node.defaultComponent = route.component
    node.layoutComponent = route.layout
    if (node.isWildcardNode()) {
      if (node.parent) {
        node.parent.notFoundComponent = route.component
      } else {
        node.notFoundComponent = route.component
      }
    }
    node.errorComponent = route.error
    node.alias = route.alias

    if (node.alias) {
      this._setAlias(node.alias, node)
    }
  }

  /**
   * Get the route.
   *
   * @type {GetRoute}
   */
  getRoute(path) {
    const { node = null, params = {} } = this._routeSearch(path)

    if (node) {
      return createRouteFromRouteNode(node, params)
    }

    return null
  }

  /**
   * Get the nearest parent route.
   *
   * @type {GetNearestRoute}
   */
  getNearestRoute(path) {
    // Finde current route
    const { node = null, params = {} } = this._routeSearch(path)

    if (!node) {
      return null
    }

    // Finde nearest parent route
    let currentNode = node

    while (currentNode.parent) {
      // If current node is a param, remove the corresponding parameter
      // before go a step up
      if (currentNode.segment.startsWith(":")) {
        const param = currentNode.segment.slice(1)
        delete params[param]
      }

      currentNode = currentNode.parent

      if (currentNode.isRoute() && !currentNode.isWildcardNode()) {
        return createRouteFromRouteNode(currentNode, params)
      }
    }

    return null
  }

  /**
   * Get the route by alias.
   *
   * @type {GetRouteByAlias}
   */
  getRouteByAlias(alias, params = {}) {
    const node = this.alias[alias]

    if (node && node.isRoute()) {
      return createRouteFromRouteNode(node, params)
    }

    return null
  }

  /**
   * Get the path by alias.
   *
   * @type {GetPathByAlias}
   */
  getPathByAlias(alias, params = {}) {
    const node = this.alias[alias]

    if (node && node.isRoute()) {
      return buildPath(node.patternPath, params)
    }

    return null
  }

  /**
   * Checks if an alias exists in the route tree.
   *
   * @type {AliasExists}
   */
  aliasExists(alias) {
    return alias in this.alias
  }
}

/**
 * Extracts the props of a JSX element representing a route.
 *
 * @param {JSX.Element} element - The JSX element representing a route.
 * @throws {Error} Throws an error if any of the required props are missing or invalid.
 * @returns {InputRoute} An object containing the extracted props of the route.
 */
const extractInputRouteProps = (element) => {
  const {
    path,
    component = null,
    layout = null,
    error = null,
    alias = null,
  } = element.props

  if (!path || typeof path !== "string") {
    throw new Error('The "path" prop must be provided and must be a string.')
  }

  const hasComponent = component || layout || error
  if (!hasComponent) {
    throw new Error(
      'Either "component", "layout" or "error" prop must be specified.'
    )
  }

  if (alias && typeof alias !== "string") {
    throw new Error('The "alias" prop must be a string.')
  }

  return {
    path,
    component,
    layout,
    error,
    alias,
  }
}

/**
 * @param {React.ReactNode} children - The children nodes.
 * @returns {Routes} - The list of segment nodes.
 */
export const createRoutesFromChildren = (children) => {
  const routeTree = new RouteTree()

  /**
   *
   * @param {React.ReactNode} children
   * @param {string} parentPath
   */
  const _perform = (children, parentPath = "") => {
    React.Children.forEach(children, (child) => {
      if (!isValidElement(child)) {
        throw new Error("The child element must be valid JSX element.")
      }

      const { path, component, layout, error, alias } =
        extractInputRouteProps(child)

      const fullPath = `${parentPath}${path.startsWith("/") ? "" : "/"}${path}`

      routeTree.add({
        path: fullPath,
        component,
        layout,
        error,
        alias,
      })

      _perform(child.props.children, fullPath)
    })
  }

  _perform(children)

  return routeTree
}
