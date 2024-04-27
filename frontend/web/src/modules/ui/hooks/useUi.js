/**
 * useUi.js
 *
 * @file Module for managing UI-related functionality.
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import ConfirmDialog from "../components/ConfirmDialog/ConfirmDialog"
import { ToastProvider, useToast } from "react-native-toast-notifications"

/**
 * @typedef {Object} UiProvider
 * @property {Object} activityIndicator - Function to control the visibility of the activity indicator.
 * @property {(show: boolean) => void} activityIndicator.set
 * @property {boolean} activityIndicator.state
 * @property {Object} dialog
 * @property {(onYes: () => void, onNo?: () => void) => void} dialog.show - Function to display a confirm dialog.
 * @property {() => void} dialog.hide - Function to hide a confirm dialog.
 * @property {Object} notification - Object containing methods for displaying different types of notifications.
 * @property {(message: string) => void} notification.info - Method to display an informational notification.
 * @property {(message: string) => void} notification.success - Method to display a success notification.
 * @property {(message: string) => void} notification.warning - Method to display a warning notification.
 * @property {(message: string) => void} notification.error - Method to display an error notification.
 */

const UiContext = createContext(null)

/**
 * Custom hook to access the Ui context.
 * @returns {UiProvider} The UI context.
 * @throws {Error} Throws an error if used outside of a UiProvider.
 */
const useUi = () => {
  const context = useContext(UiContext)
  if (!context) {
    throw new Error("useUi must be used within a UiProvider")
  }

  useEffect(
    () => {
      return () => {
        context.activityIndicator.set(false)
        context.dialog.hide()
      }
    },
    // eslint-disable-next-line
    [],
  )

  return context
}

export default useUi

/**
 * @typedef {import("../components/ConfirmDialog/ConfirmDialog").ConfirmDialogProps} ConfirmDialogProps
 * @typedef {import("react-native-toast-notifications").ToastType} Toast
 */

/**
 * @template T
 * @typedef {React.Dispatch<React.SetStateAction<T>>} SetState
 */

/**
 * Provider component for managing the Ui context.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {React.ReactElement} UiProvider component.
 */
const UiProvider = ({ children }) => {
  /**
   * @type {[activityIndicatorState: boolean, SetState<boolean>]}
   */
  const [activityIndicatorState, setActivityIndicatorState] = useState(false)

  /**
   * @type {[confirmDialogProps: ConfirmDialogProps, SetState<ConfirmDialogProps>]}
   */
  const [confirmDialogProps, setConfirmDialogProps] = useState({
    visible: false,
    children: null,
    onYes: () => {},
    onNo: null,
  })

  /**
   * @type {Toast}
   */
  const toast = useToast()

  const showToast = useCallback(
    /**
     *
     * @param {string} message
     * @param {("normal"|"success"|"warning"|"danger")} type
     */
    (message, type) => toast.show(message, { type }),
    [toast],
  )

  /**
   * @type {UiProvider}
   */
  const value = useMemo(
    () => ({
      activityIndicator: {
        set: (show) => setActivityIndicatorState(show),
        state: activityIndicatorState,
      },
      dialog: {
        show: (onYes, onNo = null) =>
          setConfirmDialogProps({
            visible: true,
            onYes,
            onNo,
          }),
        hide: () =>
          setConfirmDialogProps((prev) => ({ ...prev, visible: false })),
      },
      notification: {
        info: (message) => showToast(message, "normal"),
        success: (message) => showToast(message, "success"),
        warning: (message) => showToast(message, "warning"),
        error: (message) => showToast(message, "danger"),
      },
    }),
    [
      activityIndicatorState,
      setActivityIndicatorState,
      setConfirmDialogProps,
      showToast,
    ],
  )

  return (
    <UiContext.Provider value={value}>
      {children}
      <ConfirmDialog key={new Date().getTime()} {...confirmDialogProps} />
    </UiContext.Provider>
  )
}

/**
 * Provider component that nests dependent providers.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {React.ReactElement} UiProvider component.
 */
export const Ui = ({ children }) => (
  <ToastProvider
    placement="bottom"
    duration={25000}
    animationType="slide-in"
    normalColor="#29abe1"
    swipeEnabled
  >
    <UiProvider>{children}</UiProvider>
  </ToastProvider>
)
