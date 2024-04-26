/**
 * FrontendLayout.js
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
import {
  ExternalLink,
  InternalLink,
  MenuLink,
} from "../../../components/Links/Links"

import fbIcon from "../../../assets/images/fb_icon.png"

import "./FrontendLayout.css"

/**
 * Backend Layout Component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
const FrontendLayout = ({ children }) => {
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
      <Header ref={headerRef} title={text("short_site_title")} target="home">
        <MenuLink
          target={getPathByAlias("events")}
          title={text("event.events")}
        >
          {text("event.events")}
        </MenuLink>
        <MenuLink target={getPathByAlias("blogs")} title={text("blog.blogs")}>
          {text("blog.blogs")}
        </MenuLink>
        <MenuLink target={getPathByAlias("statute")} title="Vedtægter">
          Vedtægter
        </MenuLink>
        <MenuLink target={getPathByAlias("about")} title="Om os">
          Hvem er FLUG?
        </MenuLink>
      </Header>
      <ActivityIndicator />
      <Content ref={contentRef}>{children}</Content>
      <Footer ref={footerRef}>
        <div className="container">
          <nav className="left">
            <h2>Navigation</h2>
            <ul>
              <li>
                <InternalLink
                  target={getPathByAlias("home")}
                  title={text("short_site_title")}
                >
                  {text("short_site_title")}
                </InternalLink>
              </li>
              <li>
                <InternalLink
                  target={getPathByAlias("events")}
                  title={text("event.events")}
                >
                  {text("event.events")}
                </InternalLink>
              </li>
              <li>
                <InternalLink
                  target={getPathByAlias("blogs")}
                  title={text("blog.blogs")}
                >
                  {text("blog.blogs")}
                </InternalLink>
              </li>
              <li>
                <InternalLink
                  target={getPathByAlias("statute")}
                  title="Vedtægter"
                >
                  Vedtægter
                </InternalLink>
              </li>
              <li>
                <InternalLink target={getPathByAlias("about")} title="Om os">
                  Hvem er FLUG?
                </InternalLink>
              </li>
            </ul>
          </nav>
          <div className="right">
            <h2>Find os</h2>
            <ul>
              <li>
                <ExternalLink
                  url="https://www.facebook.com/groups/flug.dk"
                  title="Facebook"
                >
                  <img height="30" src={fbIcon} alt="Facebook Icon" />
                  Facebook
                </ExternalLink>
              </li>
            </ul>
          </div>
        </div>
      </Footer>
    </>
  )
}

export default FrontendLayout
