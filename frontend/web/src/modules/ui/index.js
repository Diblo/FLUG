/**
 * index.js
 *
 * @file Entry point for the UI module.
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */

import useUi, { Ui } from "./hooks/useUi"
import ActivityIndicator from "./components/ActivityIndicator/ActivityIndicator"

export default useUi

export { Ui, ActivityIndicator }
