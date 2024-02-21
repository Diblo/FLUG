import React, { useState, useEffect } from "react";

import { fetchData } from "../../utils/api";

import Content from "../../components/Content";
import Table, { Row, Cell } from "../../components/Table";
import { LocalDate } from "../../components/DateTime";
import getText from "../../utils/text";

import config from "../../config";

import "../../styles/screens/AdminBlogScreen.css";

export default function AdminBlogsScreen() {
  const [blogs, setBlogs] = useState([]);
  const [nextPage, setNextPage] = useState(null);

  const columns = [
    {
      title: getText("title"),
      size: "1fr",
      className: "admin-blog-title",
    },
    {
      title: getText("desc"),
      size: "2fr",
      className: "admin-blog-desc",
    },
    {
      title: getText("createdAt"),
      size: ".5fr",
      className: "admin-blog-created",
    },
    {
      title: getText("updatedAt"),
      size: ".5fr",
      className: "admin-blog-updated",
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
      setBlogs((prevBlogs) => [
        ...prevBlogs,
        ...response.items.filter((newBlog) => {
          return !prevBlogs.some(
            (existingBlog) => existingBlog.uid === newBlog.uid,
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
    window.location.href = "/admin/blogs/" + to;
  }

  function handleNextPage() {
    if (nextPage) {
      handleRequest(nextPage.href);
      return true;
    }
    return false;
  }

  useEffect(() => {
    handleRequest(config.api.uris.blogs);
  }, []);

  return (
    <Content
      pageTitle={getText("blogAdministrationHeader")}
      fixedTitlePos={true}
      buttonTitle={getText("add")}
      buttonPress={() => navToEditor("new_blog")}
      onPageLoad={handleNextPage}
    >
      {blogs.length == 0 ? (
        <div>{getText("noBlogs")}</div>
      ) : (
        <Table columns={columns} highlightClass="highlight">
          {blogs.map((blog, index) => (
            <Row key={index} onClick={() => navToEditor(blog.uid)}>
              <Cell>{blog.title}</Cell>
              <Cell>{blog.shortDesc}</Cell>
              <Cell>
                <LocalDate>{blog.createdAt}</LocalDate>
              </Cell>
              <Cell>
                {blog.updatedAt && <LocalDate>{blog.updatedAt}</LocalDate>}
              </Cell>
            </Row>
          ))}
        </Table>
      )}
    </Content>
  );
}
