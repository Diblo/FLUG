import React, { useState, useEffect } from "react";

import { fetchData } from "../../utils/api";

import Content from "../../components/Content";
import Table, { Row, Cell } from "../../components/Table";
import { LocalDate } from "../../components/DateTime";
import getText from "../../utils/text";

import config from "../../config";

import "../../styles/screens/AdminEventScreen.css";

export default function AdminEventsScreen() {
  const [events, setEvents] = useState([]);
  const [nextPage, setNextPage] = useState(null);

  const columns = [
    {
      title: getText("title"),
      size: "1fr",
      className: "admin-event-title",
    },
    {
      title: getText("desc"),
      size: "2fr",
      className: "admin-event-desc",
    },
    {
      title: getText("createdAt"),
      size: ".5fr",
      className: "admin-event-created",
    },
    {
      title: getText("updatedAt"),
      size: ".5fr",
      className: "admin-event-updated",
    },
  ];

  /**
   * @param {string} href
   */
  function handleRequest(href) {
    /**
     * @param {object} response
     */
    function handleResponse(response) {
      setEvents((prevEvents) => [
        ...prevEvents,
        ...response.items.filter((newEvent) => {
          return !prevEvents.some(
            (existingEvent) => existingEvent.uid === newEvent.uid,
          );
        }),
      ]);
      setNextPage(response.pagination.next);
    }

    fetchData(href, handleResponse);
  }

  /**
   * @param {string|number} [to]
   */
  function navToEditor(to) {
    window.location.href = "/admin/events/" + to;
  }

  function handleNextPage() {
    if (nextPage) {
      handleRequest(nextPage.href);
      return true;
    }
    return false;
  }

  useEffect(() => {
    handleRequest(config.api.uris.events);
  }, []);

  return (
    <Content
      pageTitle={getText("eventAdministrationHeader")}
      fixedTitlePos={true}
      buttonTitle={getText("add")}
      buttonPress={() => navToEditor("new_event")}
      onPageLoad={handleNextPage}
    >
      {events.length == 0 ? (
        <div>{getText("noEvents")}</div>
      ) : (
        <Table columns={columns} highlightClass="highlight">
          {events.map((event, index) => (
            <Row key={index} onClick={() => navToEditor(event.uid)}>
              <Cell>{event.title}</Cell>
              <Cell>{event.shortDesc}</Cell>
              <Cell>
                <LocalDate>{event.createdAt}</LocalDate>
              </Cell>
              <Cell>
                {event.updatedAt && <LocalDate>{event.updatedAt}</LocalDate>}
              </Cell>
            </Row>
          ))}
        </Table>
      )}
    </Content>
  );
}
