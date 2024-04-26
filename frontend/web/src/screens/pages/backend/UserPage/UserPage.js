/**
 * UserPage.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */
import React, { useCallback, useEffect, useRef } from "react"

import useUi from "../../../../modules/ui"
import { useNavigation, useRouter } from "../../../../modules/router"

import { text } from "../../../../utils/i18n"

import useService from "../../../../hooks/useService"
import { deleteUser, getUser } from "../../../../services/users"

import {
  ContentAlignment,
  ContentHeader,
} from "../../../../components/Content/Content"
import Scroller from "../../../../components/Scroller/Scroller"
import { MailTo } from "../../../../components/Links/Links"
import { LocalDateTime } from "../../../../components/Date/Date"
import {
  ButtonBar,
  Button,
  RedButton,
} from "../../../../components/Button/Button"
import Table, {
  Row as TableRow,
  RowCell,
  RowTitle,
} from "../../../../components/Table/Table"

const UserPage = () => {
  const { activityIndicator, notification, dialog } = useUi()
  const { navigate, location } = useNavigation()
  const { showNotFound } = useRouter()
  const [serviceState, dispatch] = useService()
  const deletingUser = useRef(false)

  const onEdit = useCallback(
    () =>
      navigate.alias("admin.user.edit", {
        pathParams: location.target.pathParams,
      }),
    [navigate, location]
  )

  const confirmDiaglog = useCallback(() => {
    dialog.show(() => {
      deletingUser.current = true
      dispatch(deleteUser(location.params.uid))
    })
  }, [dialog, dispatch, location])

  useEffect(
    () => {
      dispatch(getUser(location.params.uid))
    },
    // eslint-disable-next-line
    []
  )

  useEffect(
    () => {
      activityIndicator.set(serviceState.loading)

      if (serviceState.init || serviceState.loading) {
        return
      }

      if (deletingUser.current) {
        deletingUser.current = false

        if (serviceState.error) {
          return notification.success(text("user.error.not_found"))
        }

        notification.success(text("user.success.deleted"))
        return navigate.up()
      }

      if (serviceState.error) {
        showNotFound(text("user.error.not_found"))
      }
    },
    // eslint-disable-next-line
    [serviceState]
  )

  const { data } = serviceState

  return (
    <Scroller float>
      <ContentAlignment>
        <ContentHeader
          sticky
          title={`${data.firstName || "-"} ${data.lastName || ""}`}
        />
        <Table numberOfColumns={2}>
          <TableRow rowIndex={0}>
            <RowTitle>{text("user.first_name")}</RowTitle>
            <RowCell>{data.firstName}</RowCell>
          </TableRow>
          <TableRow rowIndex={1}>
            <RowTitle>{text("user.last_name")}</RowTitle>
            <RowCell>{data.lastName}</RowCell>
          </TableRow>
          <TableRow rowIndex={2}>
            <RowTitle>{text("user.email")}</RowTitle>
            <RowCell>
              {data.email && <MailTo disableBotSecure>{data.email}</MailTo>}
            </RowCell>
          </TableRow>
          <TableRow rowIndex={3}>
            <RowTitle>{text("user.created_at")}</RowTitle>
            <RowCell>
              {data.createdAt && (
                <LocalDateTime>{data.createdAt}</LocalDateTime>
              )}
            </RowCell>
          </TableRow>
          <TableRow rowIndex={4}>
            <RowTitle>{text("user.updated_at")}</RowTitle>
            <RowCell>
              {data.updatedAt && (
                <LocalDateTime>{data.updatedAt}</LocalDateTime>
              )}
            </RowCell>
          </TableRow>
          <TableRow rowIndex={5}>
            <RowTitle>{text("user.logged_in_at")}</RowTitle>
            <RowCell>
              {data.loggedInAt && (
                <LocalDateTime>{data.loggedInAt}</LocalDateTime>
              )}
            </RowCell>
          </TableRow>
        </Table>
        <ButtonBar>
          <Button onPress={onEdit}>{text("action.edit")}</Button>
          <RedButton onPress={confirmDiaglog}>
            {text("action.delete")}
          </RedButton>
        </ButtonBar>
      </ContentAlignment>
    </Scroller>
  )
}

export default UserPage
