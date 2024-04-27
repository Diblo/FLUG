import React, { useState, useEffect } from "react"

import { fetchData } from "../../../../utils/error"

import ContentLayout from "../../layout/FrontendPageLayout/ContentLayout"
import Table, { Row, RowCell } from "../../../../components/Table/Table"
import { LocalDate } from "../../../../components/Date/Date"
import getText from "../../../../utils/text"

import "./BlogsPage.css"
import Content from "../../../../components/Content/Content"
import { HeadTitle } from "../../../../components/ContentTitle/ContentTitle"
import { useSelector } from "react-redux"

export default function AdminBlogsScreen() {
  //const dispatch = useDispatch()
  const usersState = useSelector(
    (/** @type {import('../../../../rtk/store').RootState} */ state) =>
      state.users,
  )

  const [blogs, setBlogs] = useState([])
  const [nextPage, setNextPage] = useState(null)

  const headers = [
    {
      title: getText("title"),
      className: "admin-blog-title",
      size: "1fr",
    },
    {
      title: getText("desc"),
      className: "admin-blog-desc",
      size: "2fr",
    },
    {
      title: getText("createdAt"),
      className: "admin-blog-created",
      size: ".5fr",
    },
    {
      title: getText("updatedAt"),
      className: "admin-blog-updated",
      size: ".5fr",
    },
  ]

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
          )
        }),
      ])
      setNextPage(response.pagination.next)
    }

    fetchData(href, handleResponse)
  }

  /**
   * @param {string|number} [to]
   */
  function navToEditor(to) {
    window.location.href = "/admin/blogs/" + to
  }

  function handleNextPage() {
    if (nextPage) {
      handleRequest(nextPage.href)
      return true
    }
    return false
  }

  useEffect(() => {
    handleRequest(config.api.uris.blogs)
  }, [])

  const rows = Object.values(usersState.pages).flatMap((page) =>
    page.map((row) => ({
      cells: [
        { value: row.fname, className: "fname" },
        { value: row.lname, className: "lname" },
      ],
      onClick: () => {
        ;() => navToEditor(row.uid)
      },
    })),
  )

  return (
    <>
      <Content>
        <HeadTitle>{getText("blogAdministrationHeader")}</HeadTitle>
        <Table headers={headers} data={rows}></Table>
      </Content>

      <ContentLayout
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
      </ContentLayout>
    </>
  )
}
