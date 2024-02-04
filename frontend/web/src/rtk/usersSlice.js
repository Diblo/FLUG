/**
 * Copyright (c) 2024 Fyns Linux User Group
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * File: usersSlice.js
 */
import { createListResourcesSlice } from "../utils/rtk"
import { getResources } from "../utils/api"

const usersSlice = createListResourcesSlice({
  name: "users",
  reducers: (create) => ({
    listUsers: create.asyncThunk((params) =>
      getResources("users", {
        page: 1,
        initial_letter: "all",
        order: "firstname",
        max: 100,
        ...(params || {}),
      })
    ),
  }),
})

export default usersSlice.reducer

/**
 * @typedef {Object} Actions
 * @property {(payload?: {
 *  page?: number,
 *  initial_letter?: string,
 *  order?: string,
 *  max?: number,
 * }) => any} listUsers
 */

/** @type {Actions} */
// @ts-ignore Overrides the definition provided by TypeScript
export const { listUsers } = usersSlice.actions
