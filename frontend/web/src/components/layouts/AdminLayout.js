import React from "react";
import { Outlet } from "react-router-dom";

import AdminHeader from "../backend/AdminHeader";

/**
 * Page Layout Component (Admin)
 *
 * This component represents the layout of admin page with a header and content.
 */
export default function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
}
