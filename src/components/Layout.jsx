import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-fill container-fluid py-4" 
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
