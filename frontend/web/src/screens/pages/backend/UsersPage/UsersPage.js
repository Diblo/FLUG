/**
 * UsersPage.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */
import React, { useCallback, useEffect, useState } from "react"

import { useNavigation, useRouter } from "../../../../modules/router"
import useUi from "../../../../modules/ui"

import { text } from "../../../../utils/i18n"

import useService from "../../../../hooks/useService"
import { listUsers } from "../../../../services/users"

import {
  ContentAlignment,
  ContentHeader,
} from "../../../../components/Content/Content"
import Scroller from "../../../../components/Scroller/Scroller"
import Table, {
  Header,
  HeaderCell,
  NoData,
  Row,
  RowCell,
} from "../../../../components/Table/Table"
import HorizontalSpacing from "../../../../components/HorizontalSpacing/HorizontalSpacing"
import { GreenButton } from "../../../../components/Button/Button"
import { LocalDate } from "../../../../components/Date/Date"

const AddButton = () => {
  const { navigate } = useNavigation()

  return (
    <GreenButton onPress={() => navigate.alias("admin.user.new")}>
      {text("action.add")}
    </GreenButton>
  )
}

const tableColumnSizes = [
  "1fr",
  "1fr",
  "min-content",
  "min-content",
  "min-content",
]

const HeaderRow = () => (
  <Header>
    <HeaderCell>{text("user.name")}</HeaderCell>
    <HeaderCell>{text("user.email")}</HeaderCell>
    <HeaderCell>{text("user.created_at")}</HeaderCell>
    <HeaderCell>{text("user.updated_at")}</HeaderCell>
    <HeaderCell>{text("user.logged_in_at")}</HeaderCell>
  </Header>
)

const UserRow = ({ user, rowIndex }) => {
  const { navigate } = useNavigation()

  const openUser = () =>
    navigate.alias("admin.user", {
      pathParams: { uid: user.uid },
    })

  return (
    <Row rowIndex={rowIndex} onClick={openUser}>
      <RowCell>{`${user.firstName} ${user.lastName || ""}`}</RowCell>
      <RowCell>{user.email}</RowCell>
      <RowCell>
        <LocalDate>{user.createdAt}</LocalDate>
      </RowCell>
      <RowCell>
        {user.updatedAt && <LocalDate>{user.updatedAt}</LocalDate>}
      </RowCell>
      <RowCell>
        {user.loggedInAt && <LocalDate>{user.loggedInAt}</LocalDate>}
      </RowCell>
    </Row>
  )
}

const UsersPage = () => {
  const { activityIndicator, notification } = useUi()
  const { showError } = useRouter()
  const [serviceState, dispatch] = useService()
  const [userData, setUserData] = useState({})

  const { pagination = {} } = serviceState.data

  const nextPage = useCallback(
    () => dispatch(listUsers({ page: pagination.next })),
    [dispatch, pagination.next],
  )

  useEffect(
    () => {
      dispatch(listUsers())
    },
    // eslint-disable-next-line
    [],
  )

  useEffect(
    () => {
      activityIndicator.set(serviceState.loading)

      if (serviceState.init || serviceState.loading) {
        return
      }

      if (serviceState.error) {
        return Object.keys(userData).length > 0
          ? notification.error(text("error.unknown"))
          : showError()
      }

      const newUserData = { ...userData }
      for (const user of serviceState.data.items) {
        newUserData[user.uid] = user
      }
      setUserData(newUserData)
    },
    // eslint-disable-next-line
    [serviceState],
  )

  return (
    <Scroller
      float
      loading={!serviceState.init && serviceState.loading}
      onBottom={pagination.current !== pagination.last && nextPage}
    >
      <ContentAlignment>
        <ContentHeader
          sticky
          title={text("user.header.admin")}
          titleElement={<AddButton />}
        />
        <Table numberOfColumns={5} columnSizes={tableColumnSizes} highlightRow>
          <HeaderRow />
          {Object.values(userData).map((user, rowIndex) => (
            <UserRow key={rowIndex} user={user} rowIndex={rowIndex} />
          ))}
          {Object.keys(userData).length === 0 && (
            <NoData>{text("user.none")}</NoData>
          )}
        </Table>
      </ContentAlignment>
      <HorizontalSpacing />
    </Scroller>
  )
}

export default UsersPage
