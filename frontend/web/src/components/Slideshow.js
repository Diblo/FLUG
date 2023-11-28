import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import "../styles/components/Slideshow.css";

/**
 * Slideshow Section Component
 *
 * This component represents a section within a slideshow.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content or components to be displayed within the section.
 * @param {string} [props.bgImage] - The background image for the section (optional).
 * @param {string} [props.sectionClass] - Additional CSS class for the section or background image (optional).
 * @returns {React.ReactNode}
 */
export const SlideshowSection = ({ children, bgImage, sectionClass }) => {
  return children; // Return the children as is
};

SlideshowSection.propTypes = {
  children: PropTypes.node.isRequired,
  bgImage: PropTypes.string,
  sectionClass: PropTypes.string,
};

/**
 * Slideshow Component
 *
 * This component represents a slideshow with multiple sections.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactElement<SlideshowSection>[]} props.children - An array of `SlideshowSection` components representing the slideshow sections.
 * @returns {JSX.Element}
 */
export default function Slideshow({ children }) {
  // Determine the number of child sections
  const sectionCount = React.Children.count(children);

  // State to track the currently active section
  const [activeSection, setActiveSection] = useState(0);

  // Use useRef to store the interval ID for the automatic slideshow section
  const intervalId = useRef();
  // Use useRef to store the automatic slideshow currently active section
  const autoSection = useRef();

  // Function to handle section boundary
  function handleSectionBoundary(sectionNumber) {
    // Handle cases where the section number exceeds the section count or is not a valid number
    if (sectionNumber >= sectionCount) {
      return 0;
    } else if (sectionNumber < 0) {
      return sectionCount - 1;
    }
    return sectionNumber;
  }

  // Function to change the active section
  function changeSection(sectionNumber) {
    // Handle cases where the section number is not valid
    if (sectionNumber >= sectionCount || sectionNumber < 0) {
      return false;
    }

    // Get section
    const element = document.getElementById(`section-${sectionNumber}`);
    if (!element) {
      return false;
    }

    // Update the active section in the state
    setActiveSection(sectionNumber);

    // Scroll smoothly to the selected section
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }

  // Start the automatic slideshow
  useEffect(() => {
    // Create an interval that advances to the next section every 10 seconds
    // @ts-ignore
    intervalId.current = setInterval(() => {
      // Increment the current auto section and handle boundary cases
      // @ts-ignore
      autoSection.current = handleSectionBoundary(autoSection.current + 1);
      // Change to the next section based on the auto section
      changeSection(autoSection.current);
    }, 10000);

    // Initialize the current auto section with the current active section
    // @ts-ignore
    autoSection.current = activeSection;

    // Clear the interval when the component is unmounted to prevent memory leaks
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  // Handle pagination click events
  useEffect(() => {
    const handlePaginationClick = (event) => {
      event.preventDefault();
      clearInterval(intervalId.current);
      // Extract the section number from the href attribute and change the section
      changeSection(
        parseInt(event.target.getAttribute("href").substring(9), 10)
      );
    };

    // Attach a single event listener to the parent container for event delegation
    const paginationContainer = document.getElementById("slideshow-pagination");
    paginationContainer.addEventListener("click", handlePaginationClick);

    return () => {
      // Remove the event listener and clear the interval when the component unmounts
      paginationContainer.removeEventListener("click", handlePaginationClick);
    };
  }, []);

  // Handle mouse wheel navigation
  useEffect(() => {
    const handleWheel = (event) => {
      clearInterval(intervalId.current);
      // Change the section based on the direction of the wheel scroll
      changeSection(
        handleSectionBoundary(activeSection + (event.deltaY > 0 ? 1 : -1))
      );
    };

    document.addEventListener("wheel", handleWheel);

    return () => {
      // Remove the event listener and clear the interval when the component unmounts
      document.removeEventListener("wheel", handleWheel);
    };
  }, [activeSection]);

  // Handle URL hash
  useEffect(() => {
    // Change the section based on the initial URL hash
    if (changeSection(parseInt(window.location.hash.slice(9), 10))) {
      clearInterval(intervalId.current);
    }

    const handleHashChange = () => {
      clearInterval(intervalId.current);
      // Change the section when the URL hash changes
      changeSection(parseInt(window.location.hash.slice(9), 10));
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div id="slideshow">
      <div id="slideshow-sections">
        {React.Children.map(children, (child, index) => (
          <section
            key={index}
            id={`section-${index}`}
            className={`slideshow-section ${
              // @ts-ignore
              child.props.bgImage ? "background-image" : ""
            } ${
              // @ts-ignore
              child.props.sectionClass ? child.props.sectionClass : ""
            }`}
            style={
              // @ts-ignore
              child.props.bgImage
                ? {
                    // @ts-ignore
                    backgroundImage: `url(${child.props.bgImage})`,
                  }
                : {}
            }
          >
            <div className="slideshow-section-container">{child}</div>
          </section>
        ))}
      </div>
      <div id="slideshow-pagination-overlay">
        <nav id="slideshow-pagination">
          {Array.from({ length: sectionCount }, (_, index) => (
            // Generate pagination links for each section
            <a
              href={`#section-${index}`}
              className={activeSection === index ? "active" : ""}
              key={index}
            ></a>
          ))}
        </nav>
      </div>
    </div>
  );
}

Slideshow.propTypes = {
  children: PropTypes.node.isRequired,
};
