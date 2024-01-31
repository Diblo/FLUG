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
 * File: rtk.js
 */
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"

import getText from "./text"

/**
 * Regular expression pattern for validating email addresses.
 *
 * @type {RegExp}
 * @constant
 */
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

/**
 * Regular expression pattern for validating SLUGs (URL-friendly strings).
 *
 * @type {RegExp}
 * @constant
 */
const slugRegex = /^(?!-)[a-z0-9-]+(?<!-)$/

/**
 * Regular expression pattern for validating date strings in the format "YYYY-MM-DDTHH:mm:ss.SSSZ".
 *
 * @type {RegExp}
 * @constant
 */
const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

/**
 * Enum representing different value types.
 *
 * @readonly
 * @enum {string}
 */
export const specType = {
  string: "string",
  email: "email",
  slug: "slug",
  date: "date",
}

/**
 * Reducer function.
 *
 * @template S
 * @typedef {(state: S, action: { payload: any }) => void} ReducerFunc
 */

/**
 * Prepared reducer function.
 *
 * @typedef {(value: any) => any} PreparedReducerFunc
 */

/**
 * `asyncThunk` option.
 *
 * @typedef {(arg: any, thunkApi: {dispatch: (action: any) => void, getState: () => Object.<string, any>, fulfillWithValue: (value: any) => any, rejectWithValue: (value: any) => any}) => any} AsyncThunkPayloadFunc
 */

/**
 * Reducer for an async thunk.
 *
 * @template S
 * @typedef {Object} AsyncThunkSliceReducerConfig
 * @property {(state: S) => void} pending - Handles the pending state.
 * @property {(state: S, action: { payload?: any, error: { name?: string, message?: string, stack?: string, code?: string }, meta?: {rejectedWithValue: boolean} }) => void} rejected - Handles the rejected state.
 * @property {(state: S, action: { payload: any }) => void} fulfilled - Handles the fulfilled state.
 */

/**
 * Custom reducers option with reducer creators.
 *
 * @template S
 * @typedef {(create: {
 *    reducer: (reducer: ReducerFunc<S>) => any;
 *    preparedReducer: (prepare: PreparedReducerFunc, reducer: ReducerFunc<S>) => any,
 *    asyncThunk: (payloadCreator: AsyncThunkPayloadFunc) => any,
 * }) => import('@reduxjs/toolkit').SliceCaseReducers<S>} CustomReducers
 */

/**
 * The return type when a slice is created.
 *
 * @template S
 * @typedef {import('@reduxjs/toolkit').Slice<S, any>} Slice
 */

/**
 * This function creates a Redux Toolkit slice with the specified options.
 *
 * @param {Object} options - Options for creating the edit slice.
 * @param {string} options.name - The name of the slice.
 * @param {Record<string, any>} options.initialState - Initial state for the slice.
 * @param {CustomReducers<any>} options.reducers - Reducers for the slice.
 * @param {AsyncThunkSliceReducerConfig<any>} options.asyncThunkReducer - Reducer for async thunk.
 * @returns {Slice<any>} - RTK CreateSlice.
 */
export const createSlice = (options) => {
  const sliceCreator = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
  })

  return sliceCreator({
    name: options.name,
    initialState: options.initialState,
    reducers: (create) => {
      // Create custom async thunk function
      const asyncThunk = (
        /** @type {AsyncThunkPayloadFunc} */ payloadCreator
      ) => {
        return create.asyncThunk(payloadCreator, options.asyncThunkReducer)
      }

      return options.reducers({ ...create, asyncThunk })
    },
  })
}

/**
 * Represents the state structure for a resource.
 *
 * @typedef {Object} ResourceState
 * @property {boolean} loading - Indicates whether the entity is currently in a loading state.
 * @property {Object.<string, any>} data - The entity data.
 * @property {string | null} message - The message after loading, if no error.
 * @property {string | null} error - Error message after loading, if any.
 */

/**
 * Configuration for handling async thunks in the resource slice.
 *
 * @type {AsyncThunkSliceReducerConfig<ResourceState>}
 */
const resourceAsyncThunkConfig = {
  pending: (state) => {
    state.loading = true
    state.data = {}
    state.message = null
    state.error = null
  },
  rejected: (state, action) => {
    state.loading = false
    state.error = `${action.error.name}: ${action.error.message}`
  },
  fulfilled: (state, action) => {
    const { data = {}, message } = action.payload

    state.loading = false
    state.data = data
    state.message = message
  },
}

/**
 * Create a resource slice.
 *
 * @param {Object} options - Options for creating the edit slice.
 * @param {string} options.name - The name of the slice.
 * @param {CustomReducers<ResourceState>} options.reducers - Reducers for the slice.
 * @returns {Slice<ResourceState>} - RTK Slice.
 */
export const createResourceSlice = ({ name, reducers }) => {
  return createSlice({
    name,
    initialState: {
      loading: false,
      data: {},
      error: null,
    },
    reducers,
    asyncThunkReducer: resourceAsyncThunkConfig,
  })
}

/**
 * Represents pagination information for list resources.
 *
 * @typedef {Object} ListResourcesPagination
 * @property {number} first - The first page number.
 * @property {number} prev - The previous page number.
 * @property {number} self - The current page number.
 * @property {number} next - The next page number.
 * @property {number} last - The last page number.
 */

/**
 * Represents the state structure for list resources.
 *
 * @typedef {Object} ListResourcesState
 * @property {boolean} loading - Indicates whether the page is currently in a loading state.
 * @property {Object.<number, any[]>} pages - The page data.
 * @property {ListResourcesPagination} pagination - Pagination information.
 * @property {string | null} error - Error message after loading, if any.
 */

/**
 * Configuration for handling async thunks in the list resources slice.
 *
 * @type {AsyncThunkSliceReducerConfig<ListResourcesState>}
 */
const listResourcesAsyncThunkConfig = {
  pending: (state) => {
    state.loading = true
    state.error = null
  },
  rejected: (state, action) => {
    state.loading = false
    state.error = `${action.error.name}: ${action.error.message}`
  },
  fulfilled: (state, action) => {
    const firstPage = 1
    const { items, page, totalPages } = action.payload.data

    state.loading = false
    state.pages[page] = items
    state.pagination.first = page
    state.pagination.prev = Math.max(page - 1, firstPage)
    state.pagination.self = page
    state.pagination.next = Math.min(page + 1, totalPages)
    state.pagination.last = totalPages
  },
}

/**
 * Create a list resources slice.
 *
 * @param {Object} options - Options for creating the edit slice.
 * @param {string} options.name - The name of the slice.
 * @param {CustomReducers<ListResourcesState>} options.reducers - Reducers for the slice.
 * @returns {Slice<ListResourcesState>} - RTK Slice.
 */
export const createListResourcesSlice = ({ name, reducers }) => {
  return createSlice({
    name,
    initialState: {
      loading: false,
      pages: {},
      pagination: {
        first: 1,
        prev: 1,
        self: 1,
        next: 1,
        last: 1,
      },
      error: null,
    },
    reducers,
    asyncThunkReducer: listResourcesAsyncThunkConfig,
  })
}

/**
 * Specification for validation.
 *
 * @typedef {Object} Specification
 * @property {string} type - The value type.
 * @property {boolean} required - Indicates if the field is required.
 * @property {number} [min] - Minimum length, if applicable.
 * @property {number} [max] - Maximum length, if applicable.
 */

/**
 * Represents the state structure for edit resource.
 *
 * @typedef {Object} EditResourceState
 * @property {boolean} loading - Indicates whether the edit state is currently in a loading state.
 * @property {Object.<string, any>} data - The edit data.
 * @property {Object.<string, any>} initData - The initial data.
 * @property {Object.<string, any>} validateError - Validation errors.
 * @property {Object.<string, Specification>} specification - Specifications for each field.
 * @property {Object.<string, any>} requestBody - Request body for async operations.
 * @property {string | null} message - The message after loading, if no error.
 * @property {string | null} error - Error message after loading, if any.
 */

/**
 * Configuration for handling async thunks in the edit resource slice.
 *
 * @type {AsyncThunkSliceReducerConfig<EditResourceState>}
 */
const editResourceAsyncThunkConfig = {
  pending: (state) => {
    state.loading = true
    for (const key in state.specification) {
      state.validateError[key] = null
    }
    state.message = null
    state.error = null
  },
  rejected: (state, action) => {
    if (action.meta.rejectedWithValue) {
      for (const key in action.payload) {
        state.validateError[key] = action.payload[key]
      }
      return
    }

    state.loading = false
    state.error = `${action.error.name}: ${action.error.message}`
  },
  fulfilled: (state, action) => {
    const { data, message } = action.payload

    state.loading = false
    state.data = data
    for (const key in state.specification) {
      state.initData[key] = data[key]
    }
    state.requestBody = {}
    state.message = message
  },
}

/**
 * @param {Slice<EditResourceState>} caseReducers
 */

/**
 * Create an edit resource slice.
 *
 * @param {Object} options - Options for creating the edit slice.
 * @param {string} options.name - The name of the slice.
 * @param {Object.<string, Specification>} options.specification - Specifications for each field.
 * @param {CustomReducers<EditResourceState>} options.reducers - Reducers for the slice.
 * @returns {Slice<EditResourceState>} - RTK Slice.
 */
export const createEditResourceSlice = ({ name, specification, reducers }) => {
  const initialState = {
    loading: false,
    data: {},
    initData: {},
    validateError: {},
    specification,
    requestBody: {},
    error: null,
  }

  for (const key in specification) {
    initialState.data[key] = ""
    initialState.initData[key] = ""
    initialState.validateError[key] = null
  }

  return createSlice({
    name,
    initialState,
    reducers: (create) => {
      return {
        ...reducers(create),

        // Extend reducer case; These reducer cases are not meant to
        // be exported as actions but instead used by other reducer cases
        setDataValue: create.reducer((state, action) => {
          const { fieldName, value = "" } = action.payload

          state.data[fieldName] = value

          if (state.initData[fieldName] !== state.data[fieldName]) {
            state.requestBody[fieldName] = state.data[fieldName]
          } else {
            delete state.requestBody[fieldName]
          }
        }),

        clear: create.reducer((state) => {
          state.data = {}
          state.initData = {}
          state.validateError = {}
          state.requestBody = {}

          for (const key in state.specification) {
            state.data[key] = ""
            state.initData[key] = ""
            state.validateError[key] = null
          }
        }),
      }
    },
    asyncThunkReducer: editResourceAsyncThunkConfig,
  })
}

/**
 * Validates a value based on its type using predefined regular expressions.
 *
 * @param {string} type - The type of the value to be validated.
 * @param {string} value - The value to be validated.
 * @throws {Error} Throws an error with a specific message if validation fails.
 */
const validateType = (type, value) => {
  const validationMap = {
    [specType.email]: { regex: emailRegex, errorMessage: "errorInvalidEmail" },
    [specType.slug]: { regex: slugRegex, errorMessage: "errorInvalidSLUG" },
    [specType.date]: {
      regex: dateRegex,
      errorMessage: "errorInvalidDateFormat",
    },
  }

  const validation = validationMap[type]

  if (validation && !validation.regex.test(value)) {
    throw Error(getText(validation.errorMessage))
  }
}

/**
 * Validates the length of a value within a specified range.
 *
 * @param {string} value - The value to be validated.
 * @param {number} [min] - The minimum allowed length (inclusive).
 * @param {number} [max] - The maximum allowed length (inclusive).
 * @throws {Error} Throws an error with a specific message if length validation fails.
 */
const validateLength = (value, min, max) => {
  const length = value.length
  const minLength = min > 0 ? min : Number.MIN_SAFE_INTEGER
  const maxLength = max > 0 ? max : Number.MAX_SAFE_INTEGER

  if (length < minLength || length > maxLength) {
    if (min !== Number.MIN_SAFE_INTEGER) {
      if (max !== Number.MAX_SAFE_INTEGER) {
        throw Error(getText("errorLengthBetween", false, [min, max]))
      }

      throw Error(getText("errorLengthMinimum", false, min))
    }

    throw Error(getText("errorLengthMaximum", false, max))
  }
}

/**
 * Validates a value based on the given specification.
 *
 * @param {string} value - The value to validate.
 * @param {Specification} specification - The specification to validate against.
 * @returns {string | null} - Error message if validation fails, otherwise null.
 */
export const validate = (value, specification) => {
  const length = value.length

  if (length > 0) {
    try {
      validateType(specification.type, value)

      validateLength(value, specification.min, specification.max)
    } catch (error) {
      return error.message
    }
  } else if (specification.required) {
    return getText("errorFieldRequired")
  }

  return null
}
