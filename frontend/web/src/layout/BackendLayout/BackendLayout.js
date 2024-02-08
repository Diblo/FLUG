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
 * File: BackendLayout.js
 */
import React, { useEffect, useRef } from "react"
import { Outlet } from "react-router-dom"

import { SHORT_SITE_TITLE } from "../../data/site"
import getText from "../../utils/text"

import Header from "../../components/Header/Header"
import { MenuLink } from "../../components/Link/Link"
import Content from "../../components/Content/Content"
import Footer from "../../components/Footer/Footer"

const calcElementHeight = (element) => {
  const { marginTop, marginBottom } = window.getComputedStyle(element)
  return element.offsetHeight + parseFloat(marginTop) + parseFloat(marginBottom)
}

/**
 * Backend Layout Component
 */
export default function BackendLayout() {
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
        siteTitle={`${SHORT_SITE_TITLE} ${getText("admin")}`}
        siteUrl="/admin">
        <MenuLink url="/admin/events">{getText("events")}</MenuLink>
        <MenuLink url="/admin/blogs">{getText("blogs")}</MenuLink>
        <MenuLink url="/admin/users">{getText("users")}</MenuLink>
        <MenuLink url="/">{getText("frontend")}</MenuLink>
      </Header>
      <Content ref={contentRef}>
        <Outlet />
      </Content>
      <Footer ref={footerRef} />
    </>
  )
}
