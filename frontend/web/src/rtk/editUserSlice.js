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
 * File: editUserSlice.js
 */
import { createEditResourceSlice, specType, validate } from "../utils/rtk"
import { createResource, getResource, updateResource } from "../utils/api"

const editUserSlice = createEditResourceSlice({
  name: "editUser",
  specification: {
    firstName: {
      type: specType.string,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: specType.string,
      required: false,
      min: 2,
      max: 50,
    },
    email: {
      type: specType.email,
      required: true,
      max: 50,
    },
  },
  reducers: (create) => ({
    createUser: create.reducer((state) => {
      editUserSlice.caseReducers.clear(state)
    }),

    editUser: create.asyncThunk((uid) => getResource("users", `/${uid}`)),

    setFirstName: create.preparedReducer(
      (value) => ({ payload: { fieldName: "firstName", value } }),
      (state, action) => editUserSlice.caseReducers.setDataValue(state, action)
    ),
    setLastName: create.preparedReducer(
      (value) => ({ payload: { fieldName: "lastName", value } }),
      (state, action) => editUserSlice.caseReducers.setDataValue(state, action)
    ),
    setEmail: create.preparedReducer(
      (value) => ({ payload: { fieldName: "email", value } }),
      (state, action) => editUserSlice.caseReducers.setDataValue(state, action)
    ),

    saveUser: create.asyncThunk((_, { getState, rejectWithValue }) => {
      const { editUser } = getState()

      // Initialize an empty object to store the validation result.
      const validateResult = {}

      // Perform validation
      for (const key in editUser.specification) {
        validateResult[key] = validate(
          editUser.data[key],
          editUser.specification[key]
        )
      }

      // Check if there are any validation errors or if request body is empty;
      // In both situations, state is updated with the validation result because
      // of the situation with no validation errors and an empty request body,
      // it may be necessary to remove all old validation errors.
      if (
        Object.values(validateResult).some((value) => value !== null) ||
        Object.keys(editUser.requestBody).length === 0
      ) {
        return rejectWithValue(validateResult)
      }

      // If the user is new (uid is undefined), create a new resource.
      if (editUser.data.uid === undefined) {
        return createResource("users", editUser.requestBody)
      }

      // If the user already exists, update the existing resource.
      return updateResource(
        "users",
        `/${editUser.data.uid}`,
        editUser.requestBody
      )
    }),
  }),
})

export default editUserSlice.reducer

/**
 * @typedef {Object} Actions
 * @property {() => any} createUser
 * @property {(uid: number) => any} editUser
 * @property {(firstName: string) => any} setFirstName
 * @property {(lastName: string) => any} setLastName
 * @property {(email: string) => any} setEmail
 * @property {() => any} saveUser
 */

/** @type {Actions} */
// @ts-ignore Overrides the definition provided by TypeScript
export const {
  createUser,
  editUser,
  setFirstName,
  setLastName,
  setEmail,
  saveUser,
} = editUserSlice.actions
