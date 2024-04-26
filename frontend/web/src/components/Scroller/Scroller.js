/**
 * Scroller.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */

import React, { useCallback, useEffect, useRef } from "react"

import HorizontalSpacing from "../HorizontalSpacing/HorizontalSpacing"

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
        observer.disconnect()

        // Handle callback
        onIntersection()
      }
    })

    observer.observe(observerElement.current)

    return () => {
      observer.disconnect()
    }
  }, [onIntersection, observerElement])

  return (
    onIntersection && (
      <div ref={observerElement} className="scroll-view-observer" />
    )
  )
}

const SpinActivityIndicator = () => (
  <div className="scroll-activity-indicator">
    <div className="scroll-activity-indicator-spinner"></div>
  </div>
)

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
 * @param {boolean} [props.loading]
 * @param {() => void} [props.onBottom] - Callback function to be executed when the bottom is reached.
 * @param {string} [props.className]
 * @returns {JSX.Element}
 */
const Scroller = ({
  children,
  overflow,
  float,
  loading,
  onBottom,
  className,
}) => {
  /**
   * Reference to the scroll container element.
   */
  const scrollRef = useRef(null)
  const containerRef = useRef(null)

  const { scrollX = false, scrollY = true } = overflow || {}

  const handleFloatScroller = useCallback(() => {
    if (!scrollRef.current) return

    containerRef.current.style.marginRight = `${
      scrollRef.current.clientWidth - scrollRef.current.offsetWidth
    }px`
  }, [scrollRef, containerRef])

  useEffect(() => {
    if (!float) return

    window.addEventListener("resize", handleFloatScroller)

    return () => {
      window.removeEventListener("resize", handleFloatScroller)
    }
  }, [float, handleFloatScroller])

  useEffect(() => {
    if (!float) return

    handleFloatScroller()
  }, [children, float, handleFloatScroller])

  return (
    <div
      className="scroll-view"
      ref={scrollRef}
      style={{
        overflowX: scrollX ? "auto" : "hidden",
        overflowY: scrollY ? "auto" : "hidden",
      }}
    >
      <div
        ref={containerRef}
        className={`scroll-view-container ${className || ""}`}
      >
        {children}
        {loading && (
          <>
            <SpinActivityIndicator />
            <HorizontalSpacing />
          </>
        )}
        {!loading && <Observer onIntersection={onBottom} />}
      </div>
    </div>
  )
}

export default Scroller
