// src/components/Sidebar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { user, isAdmin } = useContext(AuthContext);

  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="sidebarMenu"
      aria-labelledby="sidebarMenuLabel"
      style={{ backgroundColor: "var(--color-parchment)" }}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="sidebarMenuLabel">
           Book Explorer
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div className="offcanvas-body d-flex flex-column gap-2">
        <Link to="/books" className="sidebar-link">
           All Books
        </Link>

        {user && (
          <Link to="/mybooks" className="sidebar-link">
             My Books
          </Link>
        )}

        <Link to="/discover" className="sidebar-link">
          🎲 Random Recommendation
        </Link>

        {isAdmin && (
          <>
            <hr />
            <h6 className="fw-bold">Admin Tools</h6>
            <Link to="/admin" className="sidebar-link">
               Admin Dashboard
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

