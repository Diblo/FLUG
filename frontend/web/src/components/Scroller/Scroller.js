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
 * File: Scroller.js
 */
import React, { useEffect, useRef } from "react"

import "./Scroller.css"

/**
 * @param {Object} props
 * @param {() => void} props.onIntersection - A callback function to be called when observer element come into view.
 * @returns {JSX.Element}
 */
const Observer = ({ onIntersection }) => {
  const observerElement = useRef(null)

  useEffect(() => {
    if (!observerElement.current) return

    const observer = new IntersectionObserver((entries) => {
      // Keeps track of when the observer element intersects with the parent element.
      if (entries[0].isIntersecting) {
        // Avoid onIntersection being called multiple times
        observer.unobserve(observerElement.current)

        // Handle callback
        onIntersection()
      }
    })

    observer.observe(observerElement.current)

    return () => {
      if (!observerElement.current) return

      observer.unobserve(observerElement.current)
    }
  }, [onIntersection])

  return <div ref={observerElement} className="scroll-view-observer"></div>
}

/**
 * Scroll Component
 *
 * This component creates a scrollable container for its children with horizontal and vertical scrolling.
 *
 * @param {Object} props - Props for the Scroller component.
 * @param {React.ReactNode} props.children - The content or components to be displayed inside the scrollable container.
 * @param {Object} [props.overflow]
 * @param {boolean} [props.overflow.scrollX=false] - Enable horizontal scrolling.
 * @param {boolean} [props.overflow.scrollY=true] - Enable vertical scrolling.
 * @param {boolean} [props.float=false] - Enable floating scroller.
 * @param {() => void} [props.onBottom] - Callback function to be executed when the bottom is reached.
 * @param {string} [props.className]
 * @returns {JSX.Element}
 */
export default function Scroller({
  children,
  overflow = {},
  float = false,
  onBottom,
  className,
}) {
  /**
   * Reference to the scroll container element.
   */
  const scrollRef = useRef(null)
  const containerRef = useRef(null)

  const { scrollX = false, scrollY = true } = overflow

  const handleFloatScroller = () => {
    if (!scrollRef.current) return

    containerRef.current.style.marginRight = `${
      scrollRef.current.clientWidth - scrollRef.current.offsetWidth
    }px`
  }

  /**
   * Adjusts padding to compensate for the scrollbar when the floatScroller is enabled.
   */
  useEffect(() => {
    if (!float) return

    handleFloatScroller()

    /**
     * Event listener for handling resizing when the floatScroller is enabled.
     */
    window.addEventListener("resize", handleFloatScroller)

    return () => {
      window.removeEventListener("resize", handleFloatScroller)
    }
  }, [float])

  useEffect(() => {
    if (float) handleFloatScroller()
  }, [children])

  return (
    <div
      className="scroll-view"
      ref={scrollRef}
      style={{
        overflowX: scrollX ? "auto" : "hidden",
        overflowY: scrollY ? "auto" : "hidden",
      }}>
      <div
        ref={containerRef}
        className={`scroll-view-container ${className || ""}`}>
        {children}
        {onBottom && <Observer onIntersection={onBottom} />}
      </div>
    </div>
  )
}
