import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

import "../styles/components/Content.css";

/**
 * Content Title Component
 *
 * This component represents a title for the content.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content or components to be displayed as the title.
 * @param {React.ReactNode} [props.buttonTitle]
 * @param {() => void} [props.buttonClick]
 * @returns {JSX.Element}
 */
export const ContentTitle = ({ children, buttonTitle, buttonClick }) => {
  if (buttonTitle) {
    return (
      <div id="page-title">
        <h1>{children}</h1>
        <Button onPress={buttonClick} buttonStyle="add">
          {buttonTitle}
        </Button>
      </div>
    );
  }
  return (
    <div id="page-title">
      <h1>{children}</h1>
    </div>
  );
};

ContentTitle.propTypes = {
  children: PropTypes.node.isRequired,
  buttonTitle: PropTypes.node,
  buttonClick: PropTypes.func,
};

/**
 * Content Component
 *
 * This component represents a content section with default styles and behavior.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content or components to be displayed within the content section.
 * @param {string} [props.pageTitle]
 * @param {boolean} [props.fixedTitlePos]
 * @param {string} [props.buttonTitle]
 * @param {() => void} [props.buttonPress]
 * @param {string} [props.bgImage] - The URL of the background image (optional).
 * @param {() => boolean} [props.onPageLoad] - Add callback function to handle loading the next page when scrolling to the bottom.
 * @param {string} [props.contentClass] - Additional CSS class for styling the content section or background image (optional).
 * @param {string} [props.containerClass] - Additional CSS class for styling the content container (optional).
 * @returns {JSX.Element}
 */
export default function Content({
  children,
  pageTitle,
  fixedTitlePos,
  buttonTitle,
  buttonPress,
  bgImage,
  onPageLoad,
  contentClass,
  containerClass,
}) {
  // Handle background image
  const wrapperClassNames = bgImage ? "background-image" : null;

  /** @type {import("react").CSSProperties} */
  const wrapperStyle = {
    backgroundImage: bgImage ? `url(${bgImage})` : "none",
  };

  // Handle onPageLoad
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

  // Handle scrollbar space
  const contentRef = useRef(null);
  const initPaddingRight = useRef(null);
  const paddingRight = useRef(null);

  const calculatePaddingRight = () => {
    if (contentRef.current) {
      if (initPaddingRight.current === null) {
        initPaddingRight.current =
          parseInt(
            window
              .getComputedStyle(contentRef.current)
              .getPropertyValue("padding-right"),
            10,
          ) || 0;
      }

      const newPadding =
        initPaddingRight.current -
          (contentRef.current.offsetWidth - contentRef.current.clientWidth) ||
        0;
      paddingRight.current = `${newPadding}px`;
    }
  };

  useEffect(() => {
    calculatePaddingRight();

    window.addEventListener("resize", calculatePaddingRight);

    return () => {
      window.removeEventListener("resize", calculatePaddingRight);
    };
  }, []);

  useEffect(() => {
    calculatePaddingRight();
  }, [children]);

  return (
    <div
      id="content-wrapper"
      className={wrapperClassNames}
      style={wrapperStyle}
    >
      {fixedTitlePos && pageTitle && (
        <div id="content-fixed-title">
          <ContentTitle buttonTitle={buttonTitle} buttonClick={buttonPress}>
            {pageTitle}
          </ContentTitle>
        </div>
      )}
      <div
        id="content"
        ref={contentRef}
        className={(fixedTitlePos && "fixed-title ") + (contentClass || "")}
        style={{
          paddingRight: paddingRight.current,
        }}
      >
        <div id="content-container" className={containerClass}>
          {!fixedTitlePos && pageTitle && (
            <ContentTitle buttonTitle={buttonTitle} buttonClick={buttonPress}>
              {pageTitle}
            </ContentTitle>
          )}
          {children}
          {observe && (
            <div ref={observerElement} id="scroll-view-observer"></div>
          )}
        </div>
      </div>
    </div>
  );
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string,
  fixedTitlePos: PropTypes.bool,
  buttonTitle: PropTypes.string,
  buttonPress: PropTypes.func,
  bgImage: PropTypes.string,
  contentClass: PropTypes.string,
  containerClass: PropTypes.string,
};
