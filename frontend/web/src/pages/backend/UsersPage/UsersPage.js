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
 * File: UsersPage.js
 */
import React, { useEffect } from "react"
import { useNotification } from "../../../utils/hooks"

import { useDispatch, useUsersSelector } from "../../../rtk/store"
import { listUsers } from "../../../rtk/usersSlice"

import {
  ActivityIndicator,
  ActivityIndicatorWithMessage,
} from "../../../components/ActivityIndicator/ActivityIndicator"

import {
  ContentAlignment,
  ContentTitle,
} from "../../../components/Content/Content"
import Scroller from "../../../components/Scroller/Scroller"
import Table from "../../../components/Table/Table"
import { LocalDate } from "../../../components/Date/Date"
import { GreenButton } from "../../../components/Button/Button"

import getText from "../../../utils/text"

const titles = [
  {
    title: getText("name"),
    className: "admin-user-name",
    size: "1fr",
  },
  {
    title: getText("email"),
    className: "admin-user-email",
    size: "1fr",
  },
  {
    title: getText("createdAt"),
    className: "admin-user-created",
  },
  {
    title: getText("updatedAt"),
    className: "admin-user-updated",
  },
  {
    title: getText("loggedInAt"),
    className: "admin-user-logged-in",
  },
]

/**
 * @param {string | number} [to]
 */
const navToEditor = (to) => {
  window.location.href = `/admin/user/${to}`
}

/**
 * @param {Object} pages
 */
const convertPagesIntoRows = (pages) => {
  const rows = []

  for (const user of Object.values(pages).flat(1)) {
    rows.push({
      cells: [
        { value: user.firstName + " " + user.lastName },
        { value: user.email },
        { value: <LocalDate>{user.createdAt}</LocalDate> },
        { value: user.updatedAt && <LocalDate>{user.updatedAt}</LocalDate> },
        { value: user.loggedInAt && <LocalDate>{user.loggedInAt}</LocalDate> },
      ],
      onClick: () => navToEditor(user.uid),
    })
  }

  return rows
}

const getAddButton = () => {
  return (
    <GreenButton onPress={() => navToEditor("edit/new")}>
      {getText("add")}
    </GreenButton>
  )
}

export default function UsersPage() {
  const dispatch = useDispatch()
  const usersState = useUsersSelector()
  const notification = useNotification()

  const rows = convertPagesIntoRows(usersState.pages)

  const getOnBottomFunc = () => {
    if (usersState.pagination.self === usersState.pagination.last) {
      return null
    }

    return () => dispatch(listUsers({ page: usersState.pagination.next }))
  }

  useEffect(() => {
    dispatch(listUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!usersState.loading && usersState.error) {
      notification.error(usersState.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersState])

  return (
    <Scroller float={true} onBottom={getOnBottomFunc()}>
      <ContentAlignment>
        <ContentTitle button={getAddButton()} sticky={true}>
          {getText("userAdministrationHeader")}
        </ContentTitle>
        {usersState.loading && rows.length === 0 ? (
          <ActivityIndicatorWithMessage />
        ) : (
          <>
            <Table
              titles={titles}
              rows={rows}
              noRowsMessage={getText("noUsers")}
            />
            {usersState.loading && <ActivityIndicator small={true} />}
          </>
        )}
      </ContentAlignment>
    </Scroller>
  )
}
