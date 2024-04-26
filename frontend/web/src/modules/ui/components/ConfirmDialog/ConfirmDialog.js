/**
 * ConfirmDialog.js
 *
 * @file A modal component for displaying a confirm dialog.
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */

import React, { useEffect, useState } from "react"
import { Modal } from "react-native"

import { text } from "../../../../utils/i18n"

import { Button, RedButton } from "../../../../components/Button/Button"

import "./ConfirmDialog.css"

/**
 * @typedef {Object} ConfirmDialogProps
 * @property {boolean} visible - Whether the dialog is visible or not.
 * @property {() => void} onYes - The callback function to execute when the "Yes" button is clicked.
 * @property {() => void | null} [onNo=null] - The callback function to execute when the "No" button is clicked.
 */

/**
 * A modal component for displaying a confirm dialog.
 * @param {ConfirmDialogProps} props - Component props.
 * @returns {JSX.Element} The confirm dialog component.
 */
const ConfirmDialog = ({ visible, onYes, onNo = null }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => setIsVisible(visible || false), [visible])

  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <div className="confirm-dialog">
        <div className="confirm-dialog-content">
          <div className="confirm-dialog-text">
            {text("modals.confirm.message")}
          </div>
          <div className="confirm-dialog-button-bar">
            <RedButton
              onPress={() => {
                setIsVisible(false)
                onYes()
              }}
              className="confirm-dialog-button"
            >
              {text("action.yes")}
            </RedButton>
            <Button
              onPress={() => {
                setIsVisible(false)
                onNo && onNo()
              }}
              className="confirm-dialog-button"
            >
              {text("action.no")}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDialog
