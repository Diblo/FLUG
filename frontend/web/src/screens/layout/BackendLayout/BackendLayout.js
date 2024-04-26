/**
 * BackendLayout.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */
import React, { useEffect, useRef } from "react"

import { ActivityIndicator } from "../../../modules/ui"
import { useRouter } from "../../../modules/router"

import { text } from "../../../utils/i18n"
import { calcElementHeight } from "../../../utils/element"

import Header from "../../../components/Header/Header"
import Content from "../../../components/Content/Content"
import Footer from "../../../components/Footer/Footer"
import { MenuLink } from "../../../components/Links/Links"

/**
 * Backend Layout Component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
const BackendLayout = ({ children }) => {
  const { getPathByAlias } = useRouter()
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const footerRef = useRef(null)

  const updateContentHeight = () => {
    const headerHeight = calcElementHeight(headerRef.current)
    const footerHeight = calcElementHeight(footerRef.current)

    const contentHeight = window.innerHeight - headerHeight - footerHeight

    contentRef.current.style.height = `${contentHeight}px`
  }

  useEffect(() => {
    // Call the function initially
    updateContentHeight()

    // Add a resize event listener
    window.addEventListener("resize", updateContentHeight)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateContentHeight)
    }
  }, [])

  return (
    <>
      <Header
        ref={headerRef}
        title={text("backend.title")}
        target={getPathByAlias("admin.home")}
      >
        <MenuLink
          target={getPathByAlias("admin.events")}
          title={text("event.events")}
        >
          {text("event.events")}
        </MenuLink>
        <MenuLink
          target={getPathByAlias("admin.blogs")}
          title={text("blog.blogs")}
        >
          {text("blog.blogs")}
        </MenuLink>
        <MenuLink
          target={getPathByAlias("admin.users")}
          title={text("user.users")}
        >
          {text("user.users")}
        </MenuLink>
        <MenuLink
          target={getPathByAlias("home")}
          title={text("backend.frontend_nav_title")}
        >
          {text("backend.frontend_nav_title")}
        </MenuLink>
      </Header>
      <ActivityIndicator />
      <Content ref={contentRef}>{children}</Content>
      <Footer ref={footerRef} />
    </>
  )
}

export default BackendLayout
