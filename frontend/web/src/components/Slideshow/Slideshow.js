/**
 * Slideshow.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  isValidElement,
  useMemo,
} from "react"

import "./Slideshow.css"

/**
 * @typedef {Object} SlideshowSectionProps
 * @property {React.ReactNode} [children]
 * @property {string} [bgImage] - The background image for the section (optional).
 * @property {string} [className] - Additional CSS class for the section or background image (optional).
 *
 * @typedef {Object} Carousel
 * @property {(startSection: number, sectionsCount: number) => void} start
 * @property {() => void} stop
 * @property {NodeJS.Timeout?} _intervalId
 * @property {number} _activeSection
 *
 * @typedef {Object} Sections
 * @property {(sectionNumber: number) => HTMLElement | undefined} get
 * @property {(element: HTMLElement) => void} add
 * @property {() => number} size
 * @property {Array<HTMLElement>} _sections
 */

/**
 * Parses the section number from the URL hash.
 *
 * @returns {number | undefined} The section number parsed from the URL hash, or undefined if not found or invalid.
 */
const getSectionNumberFromUrl = () => {
  const sectionStr = window.location.hash.slice(9)
  const sectionNumber = parseInt(sectionStr, 10)

  if (!isNaN(sectionNumber)) {
    return sectionNumber
  }

  return undefined
}

/**
 * Slideshow Section Component
 *
 * Represents a section within a slideshow.
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.bgImage] - The background image for the section (optional).
 * @param {string} [props.className] - Additional CSS class for the section or background image (optional).
 * @returns {JSX.Element}
 */
export const SlideshowSection = ({ children, bgImage, className }) => null

/**
 * Slideshow Component
 *
 * Represents a slideshow with multiple sections.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - An array of `SlideshowSection` components representing the slideshow sections.
 * @returns {JSX.Element}
 */
const Slideshow = ({ children }) => {
  /**
   * Store the interval ID for the automatic slideshow section
   *
   * @type {Sections}
   */
  const sections = useMemo(
    () => ({
      get: function (sectionNumber) {
        return this._sections[sectionNumber]
      },
      add: function (element) {
        return this._sections.push(element)
      },
      size: function () {
        return React.Children.count(children)
      },
      _sections: [],
    }),
    [children]
  )

  /**
   * Store the interval ID for the automatic slideshow section
   *
   * @type {[number, React.Dispatch<React.SetStateAction<number>>]}
   */
  const [activeSection, setActiveSection] = useState(0)

  /**
   * Store the interval ID for the automatic slideshow section
   *
   * @type {React.MutableRefObject<Carousel>}
   */
  const carousel = useRef({
    start: function (startSection, sectionsCount) {
      if (this._intervalId) {
        this.stop()
      }

      this._activeSection = startSection

      // Change to the start section
      changeSection(this._activeSection)

      // Create an interval that advances to the next section every 10 seconds
      this._intervalId = setInterval(() => {
        this._activeSection = this._activeSection + 1

        if (this._activeSection >= sectionsCount) {
          this._activeSection = 0
        }

        changeSection(this._activeSection)
      }, 10000)
    },
    stop: function () {
      if (this._intervalId !== null) {
        clearInterval(this._intervalId)
        this._intervalId = null
      }
    },
    _intervalId: null,
    _activeSection: 0,
  })

  const changeSection = useCallback(
    /**
     * Function to change the active section
     *
     * @param {number} sectionNumber
     */
    (sectionNumber) => {
      // Update the active section in the state
      setActiveSection(sectionNumber)

      // Get section element
      const element = sections.get(sectionNumber)

      // Scroll smoothly to the selected section
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    },
    [sections]
  )

  const onPaginationClick = useCallback(
    /**
     * Callback function to handle pagination click events.
     * It stops the carousel and changes the section.
     *
     * @param {React.MouseEvent} event
     * @param {number} section
     */
    (event, section) => {
      event.preventDefault()
      carousel.current.stop()
      changeSection(section)
    },
    [changeSection, carousel]
  )

  const onWheel = useCallback(
    /**
     * Callback function to handle wheel events.
     * It stops the carousel and changes the section based on the wheel direction.
     *
     * @param {WheelEvent} event
     */
    (event) => {
      carousel.current.stop()

      let sectionNumber = activeSection + (event.deltaY > 0 ? 1 : -1)

      if (sectionNumber >= sections.size()) {
        sectionNumber = 0
      } else if (sectionNumber < 0) {
        sectionNumber = sections.size() - 1
      }

      changeSection(sectionNumber)
    },
    [sections, activeSection, changeSection, carousel]
  )

  const loadUrl = useCallback(
    /**
     * Loads the section specified in the URL hash, if valid.
     * Stops the carousel and changes the section if the section number is within the valid range.
     *
     * @returns {boolean} - Returns true if the section was changed, otherwise false.
     */
    () => {
      const sectionNumber = getSectionNumberFromUrl()
      if (sectionNumber >= 0 && sectionNumber < sections.size()) {
        carousel.current.stop()

        changeSection(sectionNumber)
        return true
      }

      return false
    },
    [sections, changeSection, carousel]
  )

  useEffect(
    () => {
      if (!loadUrl()) {
        const carouselRef = carousel.current

        carouselRef.start(activeSection, sections.size())

        return () => carouselRef.stop()
      }
    },
    // eslint-disable-next-line
    []
  )

  useEffect(() => {
    document.addEventListener("wheel", onWheel)
    window.addEventListener("hashchange", loadUrl)

    return () => {
      document.removeEventListener("wheel", onWheel)
      window.removeEventListener("hashchange", loadUrl)
    }
  }, [onWheel, loadUrl])

  return (
    <div id="slideshow">
      <div id="slideshow-sections">
        {React.Children.map(children, (child, index) => {
          if (isValidElement(child)) {
            const { children, bgImage, className } = child.props
            return (
              <section
                key={index}
                ref={(element) => sections.add(element)}
                className={`slideshow-section ${
                  bgImage && "slideshow-bg-image"
                } ${className}`}
                style={bgImage && { backgroundImage: `url(${bgImage})` }}
              >
                <div className="slideshow-section-container">{children}</div>
              </section>
            )
          }
        })}
      </div>
      <div id="slideshow-pagination-overlay">
        <nav id="slideshow-pagination">
          {Array.from({ length: sections.size() }, (_, index) => (
            <a
              key={index}
              href={`#section-${index}`}
              className={activeSection === index ? "active" : ""}
              onClick={(event) => onPaginationClick(event, index)}
            >
              {""}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Slideshow
