import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BsList } from "react-icons/bs"; // Bs = Bootstrap //  can swap with custom SVG

const Navbar = () => {
  const { user, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg px-3 custom-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Hamburger (left) */}
        <button
          className="btn btn-link text-dark p-0 border-0 me-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
        >
          <BsList size={28} />
        </button>

        {/* Centered brand/title */}
        <div className="position-absolute start-50 translate-middle-x">
          <Link className="navbar-brand text-dark fw-bold" to="/">
            BookExplorer
          </Link>
        </div>

        {/* Right: Logout or login links */}
        <div className="d-flex align-items-center">
          <Link to="/books" className="text-dark text-decoration-none me-3 browse-link">
             Browse
          </Link>

          {user ? (
            <>
              <span className="me-3 text-muted small d-none d-md-inline">
                Hi, {user.username || user.email} ({user.role})
              </span>
              <button onClick={handleLogout} className="btn btn-sm">
                Logout
              </button>
            </>
          ) : (
            <div className="d-flex align-items-center gap-3">
              <Link to="/login" className="text-dark text-decoration-none">
                Login
              </Link>
              <Link to="/register" className="text-dark text-decoration-none">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
