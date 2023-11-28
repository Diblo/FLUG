import React from "react";
import "../../styles/components/Footer.css";

/**
 * Footer Component (Frontend)
 *
 * This component represents the footer section of the webpage.
 */
function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        <nav className="left">
          <h2>Navigation</h2>
          <ul>
            <li>
              <a href="/">FLUG</a>
            </li>
            <li>
              <a href="/arrangementer">Arrangementer</a>
            </li>
            <li>
              <a href="/blogs">Blog</a>
            </li>
            <li>
              <a href="/vedtægter">Vedtægter</a>
            </li>
            <li>
              <a href="/om">Hvem er FLUG?</a>
            </li>
          </ul>
        </nav>
        <div className="right">
          <h2>Find os</h2>
          <ul>
            <li>
              <a href="https://www.facebook.com/groups/flug.dk" target="_blank" rel="noreferrer">
                <img
                  height="30"
                  src="/images/fb_icon.png"
                  alt="Facebook Icon"
                />
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
