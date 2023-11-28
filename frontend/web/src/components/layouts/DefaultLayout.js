import React from "react";

import Header from "../frontend/Header";
import { Outlet } from "react-router-dom";
import Footer from "../frontend/Footer";

/**
 * Page Layout Component (Frontend)
 *
 * This component represents the layout of a page with a header, content, and footer.
 */
export default function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
