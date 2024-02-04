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
 * File: store.js
 */
import { configureStore } from "@reduxjs/toolkit"
import { useDispatch as useRRDispatch, useSelector } from "react-redux"

import usersReducer from "./usersSlice"
import userReducer from "./userSlice"
import editUserReducer from "./editUserSlice"

/**
 * @typedef {Object} RootState
 * @property {import('../utils/rtk').ListResourcesState} users
 * @property {import('../utils/rtk').ResourceState} user
 * @property {import('../utils/rtk').EditResourceState} editUser
 */

const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    editUser: editUserReducer,
  },
})

export default store

/** @type {() => (action: any) => void} */
export const useDispatch = () => useRRDispatch()

export const useUsersSelector = () =>
  useSelector((/** @type {RootState} */ state) => state.users)
export const useUserSelector = () =>
  useSelector((/** @type {RootState} */ state) => state.user)
export const useEditUserSelector = () =>
  useSelector((/** @type {RootState} */ state) => state.editUser)
