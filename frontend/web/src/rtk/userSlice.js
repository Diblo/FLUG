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
 * File: userSlice.js
 */
import { createResourceSlice } from "../utils/rtk"
import { getResource, deleteResource } from "../utils/api"

const userSlice = createResourceSlice({
  name: "user",
  reducers: (create) => ({
    getUser: create.asyncThunk((uid) => getResource("users", `/${uid}`)),
    deleteUser: create.asyncThunk((uid) => deleteResource("users", `/${uid}`)),
  }),
})

export default userSlice.reducer

/**
 * @typedef {Object} Actions
 * @property {(uid: number) => any} getUser
 * @property {(uid: number) => any} deleteUser
 */

/** @type {Actions} */
// @ts-ignore Overrides the definition provided by TypeScript
export const { getUser, deleteUser } = userSlice.actions
