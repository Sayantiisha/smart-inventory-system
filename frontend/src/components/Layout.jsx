
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

import "../styles/layout.css";

function Layout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">

      <Sidebar
        open={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <div className="main-content">

        <Navbar
          toggleSidebar={() => setSidebarOpen(true)}
        />

        <div className="page-content">
          <Outlet />
        </div>

        <Footer />

      </div>

    </div>
  );
}

export default Layout;