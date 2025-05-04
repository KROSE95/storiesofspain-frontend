import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Sidebar/>
      <main className="flex-fill container-fluid py-4" 
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
