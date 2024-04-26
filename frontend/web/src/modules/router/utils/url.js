import RouterConfig from "../config"

/**
 * @typedef {import("../context").Location} Location
 * @typedef {import("../context").Params} Params
 * @typedef {import("../context").TargetObject} TargetObject
 */

/**
 * Parses search string and normalizes them.
 *
 * @param {string} search - The search string.
 * @returns {Params} The parsed and normalized parameters.
 */
const parseSearchParams = (search) => {
  const params = {}

  new URLSearchParams(search).forEach((value, param) => {
    const parser = RouterConfig.getSearchValidator(param)
    if (parser) {
      const _value = parser(value)
      if (_value !== undefined) {
        params[param] = _value
      }
    }
  })

  return params
}

/**
 * @param {Params} searchParams
 * @returns {string}
 */
const createSearchString = (searchParams) => {
  let searchString = new URLSearchParams(searchParams).toString()

  if (searchString) {
    return `?${searchString}`
  }

  return ""
}

/**
 * @param {string} path
 * @returns {string}
 */
const removeTrailingSlash = (path) => {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path
}

/**
 * @param {string} path
 * @param {string} search
 * @param {string} hash
 * @returns {TargetObject}
 */
const createTargetObject = (path, search, hash) => ({
  path,
  search,
  hash,
  toString: function () {
    return `${this.path}${this.search}${this.hash}`
  },
})

/**
 * Parses the target into its path, search, and hash components.
 *
 * @param {string} target - The target.
 * @returns {TargetObject} An object containing the parsed components.
 */
const parseTarget = (target) => {
  const hashIndex = target.indexOf("#")
  const searchIndex = target.indexOf("?")

  const path = target.substring(
    0,
    searchIndex !== -1 ? searchIndex : hashIndex !== -1 ? hashIndex : undefined
  )
  const search =
    searchIndex !== -1
      ? target.substring(searchIndex, hashIndex !== -1 ? hashIndex : undefined)
      : ""
  const hash = hashIndex !== -1 ? target.substring(hashIndex) : ""

  return createTargetObject(path, search, hash)
}

/**
 * @param {string | globalThis.Location | URL} url
 * @returns {TargetObject}
 */
export const getTargetFromUrl = (url) => {
  const parsedUrl = typeof url === "string" ? new URL(url) : url
  const searchParams = parseSearchParams(parsedUrl.search)

  return createTargetObject(
    parsedUrl.pathname,
    createSearchString(searchParams),
    parsedUrl.hash
  )
}

/**
 * Resolves a target relative to the current URL.
 *
 * @param {string | TargetObject} target - The target.
 * @param {string | TargetObject} baseTarget
 * @returns {TargetObject} The resolved URL.
 */
export const resolveTarget = (target, baseTarget) => {
  const parsedTarget = typeof target === "string" ? parseTarget(target) : target
  const baseUrl = new URL(`${window.location.origin}${baseTarget}`)

  let url = null
  if (
    !parsedTarget.path ||
    parsedTarget.path.startsWith("/") ||
    baseUrl.pathname.endsWith("/")
  ) {
    url = new URL(parsedTarget.toString(), baseUrl)
  } else {
    url = new URL(`${baseUrl.pathname}/${parsedTarget}`, baseUrl)
  }

  return createTargetObject(
    removeTrailingSlash(url.pathname),
    url.search,
    url.hash
  )
}

/**
 *
 * @param {string | TargetObject} target
 * @param {Params} [pathParams]
 * @returns {Location}
 */
export const buildLocation = (target, pathParams = {}) => {
  const parsedTarget = typeof target === "string" ? parseTarget(target) : target
  const searchParams = parseSearchParams(parsedTarget.search)
  const newSearch = createSearchString(searchParams)

  return {
    target: {
      path: parsedTarget.path,
      pathParams,
      search: newSearch,
      searchParams,
      hash: parsedTarget.hash,
      toString: function () {
        return `${this.path}${this.search}${this.hash}`
      },
    },
    params: {
      ...searchParams,
      ...pathParams,
    },
  }
}

/**
 * @param {string | URL} url
 * @param {string | URL} baseUrl
 * @returns {URL | null}
 */
export const resolveURL = (url, baseUrl) => {
  return url ? new URL(url, baseUrl) : null
}
