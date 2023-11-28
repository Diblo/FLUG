import React, { useState, useEffect } from "react";

import { fetchData } from "../../utils/api";

import Content from "../../components/Content";
import Table, { Row, Cell } from "../../components/Table";
import { LocalDate } from "../../components/DateTime";
import getText from "../../utils/text";

import config from "../../config";

export default function AdminUsersScreen() {
  const [users, setUsers] = useState([]);
  const [nextPage, setNextPage] = useState(null);

  const columns = [
    { title: getText("name"), size: "1fr", className: "admin-user-name" },
    {
      title: getText("email"),
      size: "1fr",
      className: "admin-user-email",
    },
    {
      title: getText("createdAt"),
      size: ".5fr",
      className: "admin-user-created",
    },
    {
      title: getText("updatedAt"),
      size: ".5fr",
      className: "admin-user-updated",
    },
    {
      title: getText("loggedInAt"),
      size: ".5fr",
      className: "admin-user-logged-in",
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
      setUsers((prevUsers) => [
        ...prevUsers,
        ...response.items.filter((newUser) => {
          return !prevUsers.some(
            (existingUser) => existingUser.uid === newUser.uid
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
    window.location.href = "/admin/users/" + to;
  }

  function handleNextPage() {
    if (nextPage) {
      handleRequest(nextPage.href);
      return true;
    }
    return false;
  }

  useEffect(() => {
    handleRequest(config.api.uris.users);
  }, []);

  return (
    <Content
      pageTitle={getText("userAdministrationHeader")}
      fixedTitlePos={true}
      buttonTitle={getText("add")}
      buttonPress={() => navToEditor("new_user")}
      onPageLoad={handleNextPage}
    >
      {users.length == 0 ? (
        <div>{getText("noUsers")}</div>
      ) : (
        <Table columns={columns} highlightClass="highlight">
          {users.map((user, index) => (
            <Row key={index} onClick={() => navToEditor(user.uid)}>
              <Cell>{user.firstName + " " + user.lastName}</Cell>
              <Cell>{user.email}</Cell>
              <Cell>
                <LocalDate>{user.createdAt}</LocalDate>
              </Cell>
              <Cell>
                {user.updatedAt && <LocalDate>{user.updatedAt}</LocalDate>}
              </Cell>
              <Cell>
                {user.loggedInAt && <LocalDate>{user.loggedInAt}</LocalDate>}
              </Cell>
            </Row>
          ))}
        </Table>
      )}
    </Content>
  );
}
