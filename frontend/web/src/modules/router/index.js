import Router from "./router"
import { Route, Navigate, NavUp, Redirect } from "./components"
import { useNavigation, useRouter } from "./hooks"
import RouterConfig from "./config"

/**
 * @typedef {import("./config").ParamValidator} ParamValidator
 * @typedef {import("./config").ParamValidators} ParamValidators
 */

export default Router

export {
  Route,
  Navigate,
  NavUp,
  Redirect,
  useNavigation,
  useRouter,
  RouterConfig,
}
