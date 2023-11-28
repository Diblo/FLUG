import React from "react";
import config from "../../config";
import getText from "../../utils/text";

import "../../styles/components/AdminHeader.css";

/**
 * Header Component (Admin)
 *
 * This component represents the header section of the admin page.
 */
export default function Header() {
  return (
    <header id="header-admin">
      <div className="container">
        <a href="/admin" className="title">
          {config.siteTitle} {getText("backendHeadTitle")}
        </a>
        <nav>
          <a href="/admin/events">{getText("events")}</a>
          <a href="/admin/blogs">{getText("blogs")}</a>
          <a href="/admin/users">{getText("users")}</a>
          <a href="/">{getText("frontend")}</a>
        </nav>
      </div>
    </header>
  );
}
