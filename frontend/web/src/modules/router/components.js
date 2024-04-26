/**
 * router.js
 *
 * @file Defines the Router component for managing navigation in a React application.
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */
import { useEffect } from "react"
import { useNavigation } from "./hooks"

/**
 * @typedef {import("./utils/route").InputRoute & {children?: React.ReactNode}} RouteComponent
 */

/**
 * @param {RouteComponent} props
 */
export const Route = (props) => {
  return null
}

/**
 * @param {Object} props
 * @param {string} props.url
 * @param {boolean} [props.replace]
 * @param {boolean} [props.noHistory]
 */
export const Navigate = ({ url, replace, noHistory }) => {
  const { navigate } = useNavigation()

  useEffect(() => {
    navigate.to(url, { replace, noHistory })
  }, [navigate, url, replace, noHistory])

  return null
}

/**
 * @param {Object} props
 * @param {boolean} [props.replace]
 * @param {boolean} [props.noHistory]
 */
export const NavUp = ({ replace, noHistory }) => {
  const { navigate } = useNavigation()

  useEffect(() => {
    navigate.up({ replace, noHistory })
  }, [navigate, replace, noHistory])

  return null
}

/**
 * @param {Object} props
 * @param {string} props.url
 * @param {boolean} [props.noHistory]
 */
export const Redirect = ({ url, noHistory }) => {
  const { navigate } = useNavigation()

  useEffect(() => {
    navigate.redirect(url, { noHistory })
  }, [navigate, url, noHistory])

  return null
}
