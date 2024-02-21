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

import { useDispatch, useUserSelector } from "../../../rtk/store"
import { deleteUser, getUser } from "../../../rtk/userSlice"

import { ActivityIndicatorWithMessage } from "../../../components/ActivityIndicator/ActivityIndicator"

import {
  ContentAlignment,
  ContentTitle,
} from "../../../components/Content/Content"
import Scroller from "../../../components/Scroller/Scroller"
import { MailToLink } from "../../../components/Link/Link"
import { LocalDateTime } from "../../../components/Date/Date"
import ButtonBar from "../../../components/ButtonBar/ButtonBar"
import { Button, RedButton } from "../../../components/Button/Button"

import getText from "../../../utils/text"

import "./UserPage.css"

export default function UserPage() {
  const dispatch = useDispatch()
  const userState = useUserSelector()
  const notification = useNotification()
  const uid = useUIDParam()

  useEffect(() => {
    if (uid === undefined) {
      notification.error(getText("missingUID"))
      return
    }

    dispatch(getUser(uid))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!userState.loading && userState.error) {
      notification.error(userState.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState])

  return (
    <Scroller float={true}>
      <ContentAlignment>
        {userState.loading ? (
          <ActivityIndicatorWithMessage />
        ) : (
          <>
            <ContentTitle sticky={true}>
              {`${userState.data.firstName || "-"} ${
                userState.data.lastName || ""
              }`}
            </ContentTitle>
            <div className="user-info">
              <div className="user-info-row user-info-odd">
                <div>{getText("firstName")}:</div>
                <div>{userState.data.firstName}</div>
              </div>
              <div className="user-info-row">
                <div>{getText("lastName")}:</div>
                <div>{userState.data.lastName}</div>
              </div>
              <div className="user-info-row user-info-odd">
                <div>{getText("email")}:</div>
                <div>
                  {userState.data.email && (
                    <MailToLink>{userState.data.email}</MailToLink>
                  )}
                </div>
              </div>
              <div className="user-info-row">
                <div>{getText("createdAt")}:</div>
                <div>
                  {userState.data.createdAt && (
                    <LocalDateTime>{userState.data.createdAt}</LocalDateTime>
                  )}
                </div>
              </div>
              <div className="user-info-row user-info-odd">
                <div>{getText("updatedAt")}:</div>
                <div>
                  {userState.data.updatedAt && (
                    <LocalDateTime>{userState.data.updatedAt}</LocalDateTime>
                  )}
                </div>
              </div>
              <div className="user-info-row">
                <div>{getText("loggedInAt")}:</div>
                <div>
                  {userState.data.loggedInAt && (
                    <LocalDateTime>{userState.data.loggedInAt}</LocalDateTime>
                  )}
                </div>
              </div>
            </div>
            <ButtonBar>
              <Button
                onPress={() =>
                  (window.location.href = `/admin/user/edit/${userState.data.uid}`)
                }>
                {getText("edit")}
              </Button>
              <RedButton
                onPress={() => dispatch(deleteUser(userState.data.uid))}>
                {getText("delete")}
              </RedButton>
            </ButtonBar>
          </>
        )}
      </ContentAlignment>
    </Scroller>
  )
}
