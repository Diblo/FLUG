import React from "react";
import config from "../../config";
import getText from "../../utils/text";

import "../../styles/components/Header.css";

/**
 * Header Component (Frontend)
 *
 * This component represents the header section of the webpage.
 */
export default function Header() {
  return (
    <header id="header">
      <div className="container">
        <a href="/" className="title">
          {config.siteTitle}
        </a>
        <nav>
          <a href="/arrangementer">{getText("events")}</a>
          <a href="/blogs#">{getText("blogs")}</a>
          <a href="/vedtægter">Vedtægter</a>
          <a href="/om">Hvem er FLUG?</a>
        </nav>
      </div>
    </header>
  );
}
