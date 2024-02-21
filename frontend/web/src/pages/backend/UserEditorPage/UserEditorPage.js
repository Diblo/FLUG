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
 * File: UserPage.js
 */
import React, { useEffect } from "react"
import { useNotification, useUIDParam } from "../../../utils/hooks"

import { useDispatch, useEditUserSelector } from "../../../rtk/store"
import { deleteUser } from "../../../rtk/userSlice"
import {
  createUser,
  editUser,
  saveUser,
  setEmail,
  setFirstName,
  setLastName,
} from "../../../rtk/editUserSlice"

import { ActivityIndicatorWithMessage } from "../../../components/ActivityIndicator/ActivityIndicator"

import {
  ContentAlignment,
  ContentTitle,
} from "../../../components/Content/Content"
import Scroller from "../../../components/Scroller/Scroller"
import Form, { FormButtonBar, FormContent } from "../../../components/Form/Form"
import { TextItem, TextRequiredItem } from "../../../components/Form/FormItem"
import { GreenButton, RedButton } from "../../../components/Button/Button"

import getText from "../../../utils/text"

export default function UserEditorPage() {
  const dispatch = useDispatch()
  const editUserState = useEditUserSelector()
  const notification = useNotification()
  const uid = useUIDParam()

  useEffect(() => {
    if (uid === undefined) {
      dispatch(createUser())
    } else {
      dispatch(editUser(uid))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!editUserState.loading && editUserState.error) {
      notification.error(editUserState.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editUserState])

  return (
    <Scroller float={true}>
      <ContentAlignment>
        {editUserState.loading ? (
          <ActivityIndicatorWithMessage />
        ) : (
          <>
            <ContentTitle sticky={true}>
              {getText("editUserHeader")}
            </ContentTitle>
            <Form>
              <FormContent>
                <TextRequiredItem
                  label={getText("firstName")}
                  onChange={(value) => dispatch(setFirstName(value))}
                  attributes={{
                    placeholder: getText("firstNamePlaceholder"),
                    maxLength: editUserState.specification.firstName.max,
                    autoComplete: "off",
                    autoFocus: true,
                  }}
                  errorMsg={editUserState.validateError.firstName}>
                  {editUserState.data.firstName}
                </TextRequiredItem>
                <TextItem
                  label={getText("lastName")}
                  onChange={(value) => dispatch(setLastName(value))}
                  attributes={{
                    placeholder: getText("firstNamePlaceholder"),
                    maxLength: editUserState.specification.lastName.max,
                    autoComplete: "off",
                  }}
                  errorMsg={editUserState.validateError.lastName}>
                  {editUserState.data.lastName}
                </TextItem>
                <TextRequiredItem
                  label={getText("email")}
                  onChange={(value) => dispatch(setEmail(value))}
                  attributes={{
                    placeholder: getText("firstNamePlaceholder"),
                    maxLength: editUserState.specification.email.max,
                    autoComplete: "off",
                  }}
                  errorMsg={editUserState.validateError.email}>
                  {editUserState.data.email}
                </TextRequiredItem>
              </FormContent>
              <FormButtonBar>
                {(editUserState.data.uid !== undefined && (
                  <>
                    <GreenButton onPress={() => dispatch(saveUser())}>
                      {getText("save")}
                    </GreenButton>
                    <RedButton
                      onPress={() =>
                        dispatch(deleteUser(editUserState.data.uid))
                      }>
                      {getText("delete")}
                    </RedButton>
                  </>
                )) || (
                  <GreenButton onPress={() => dispatch(saveUser())}>
                    {getText("add")}
                  </GreenButton>
                )}
              </FormButtonBar>
            </Form>
          </>
        )}
      </ContentAlignment>
    </Scroller>
  )
}
