import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import "../styles/components/ScrollableView.css";

/**
 * Scrollable View Component
 *
 * This component creates a scrollable container for its children with horizontal and vertical scrolling.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content or components to be displayed inside the scrollable container.
 * @param {boolean} [props.scrollX] - Enable horizontal scrolling (default: false).
 * @param {boolean} [props.scrollY] - Enable vertical scrolling (default: true).
 * @param {() => boolean} [props.onPageLoad] - Add callback function to handle loading the next page when scrolling to the bottom.
 * @returns {JSX.Element}
 */
export default function ScrollableView({
  children,
  scrollX = false,
  scrollY = true,
  onPageLoad,
}) {
  const observerElement = useRef(null);
  const [observe, setObserve] = useState(onPageLoad ? true : false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (observe) {
      const observer = new IntersectionObserver(
        (entries) => {
          setIsIntersecting(entries[0].isIntersecting);
        },
        { threshold: 1 },
      );

      if (observerElement.current) {
        observer.observe(observerElement.current);
      }
      return () => {
        if (observerElement.current) {
          observer.unobserve(observerElement.current);
        }
      };
    }
  }, [observerElement]);

  useEffect(() => {
    if (isIntersecting && observe) {
      setIsIntersecting(false);
      setObserve(onPageLoad());
    }
  }, [isIntersecting, onPageLoad]);

  return (
    <div
      className="scroll-view"
      style={{
        overflowX: scrollX ? "auto" : "hidden",
        overflowY: scrollY ? "auto" : "hidden",
      }}
    >
      <div className="scroll-view-container">
        {children}
        {observe && (
          <div ref={observerElement} className="scroll-view-observer"></div>
        )}
      </div>
    </div>
  );
}

ScrollableView.propTypes = {
  children: PropTypes.node.isRequired,
  scrollX: PropTypes.bool,
  scrollY: PropTypes.bool,
  onPageLoad: PropTypes.func,
};
