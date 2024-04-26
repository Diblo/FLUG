/**
 * ActivityIndicator.js
 *
 * @file Component for displaying an activity indicator.
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */

import React from "react"

import useUi from "../../hooks/useUi"

import "./ActivityIndicator.css"

/**
 * ActivityIndicator component displays an animated indicator to indicate ongoing activity.
 * @returns {JSX.Element} The activity indicator component.
 */
const ActivityIndicator = () => {
  const { activityIndicator } = useUi()

  return (
    activityIndicator.state && (
      <div className="activity-indicator">
        <div className="indicator"></div>
      </div>
    )
  )
}

export default ActivityIndicator
