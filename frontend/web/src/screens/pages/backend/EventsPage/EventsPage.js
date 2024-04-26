/**
 * EventsPage.js
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
import { listEvents } from "../../../../services/events"

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
    <GreenButton onPress={() => navigate.alias("admin.event.new")}>
      {text("action.add")}
    </GreenButton>
  )
}

const tableColumnSizes = [
  "1fr",
  "min-content",
  "min-content",
  "min-content",
  "min-content",
]

const HeaderRow = () => (
  <Header>
    <HeaderCell>{text("event.title")}</HeaderCell>
    <HeaderCell>{text("event.start")}</HeaderCell>
    <HeaderCell>{text("event.end")}</HeaderCell>
    <HeaderCell>{text("event.created_at")}</HeaderCell>
    <HeaderCell>{text("event.updated_at")}</HeaderCell>
  </Header>
)

const EventRow = ({ event, rowIndex }) => {
  const { navigate } = useNavigation()

  const openEvent = () =>
    navigate.alias("admin.event", {
      pathParams: { uid: event.uid },
    })

  return (
    <Row rowIndex={rowIndex} onClick={openEvent}>
      <RowCell>{event.title}</RowCell>
      <RowCell>
        <LocalDate>{event.start}</LocalDate>
      </RowCell>
      <RowCell>
        <LocalDate>{event.end}</LocalDate>
      </RowCell>
      <RowCell>
        <LocalDate>{event.createdAt}</LocalDate>
      </RowCell>
      <RowCell>
        {event.updatedAt && <LocalDate>{event.updatedAt}</LocalDate>}
      </RowCell>
    </Row>
  )
}

const EventsPage = () => {
  const { activityIndicator, notification } = useUi()
  const { showError } = useRouter()
  const [serviceState, dispatch] = useService()
  const [eventData, setEventData] = useState({})

  const { pagination = {} } = serviceState.data

  const nextPage = useCallback(
    () => dispatch(listEvents({ page: pagination.next })),
    [dispatch, pagination.next]
  )

  useEffect(
    () => {
      dispatch(listEvents())
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

      if (serviceState.error) {
        return Object.keys(eventData).length > 0
          ? notification.error(text("error.unknown"))
          : showError()
      }

      const newEventData = { ...eventData }
      for (const event of serviceState.data.items) {
        newEventData[event.uid] = event
      }
      setEventData(newEventData)
    },
    // eslint-disable-next-line
    [serviceState]
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
          title={text("event.header.admin")}
          titleElement={<AddButton />}
        />
        <Table numberOfColumns={5} columnSizes={tableColumnSizes} highlightRow>
          <HeaderRow />
          {Object.values(eventData).map((event, rowIndex) => (
            <EventRow key={rowIndex} event={event} rowIndex={rowIndex} />
          ))}
          {Object.keys(eventData).length === 0 && (
            <NoData>{text("event.none")}</NoData>
          )}
        </Table>
      </ContentAlignment>
      <HorizontalSpacing />
    </Scroller>
  )
}

export default EventsPage
