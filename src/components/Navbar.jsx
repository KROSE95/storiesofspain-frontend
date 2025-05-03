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
    <nav
      className="navbar navbar-expand-lg px-3"
      style={{
        backgroundColor: "var(--color-parchment)",
        borderBottom: "2px solid var(--color-burnt-orange)",
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Hamburger (left) */}
        <button className="btn btn-link text-dark p-0 border-0 me-2">
          <BsList size={28} /> {/* Bookshelf ladder icon could go here */}
        </button>

        {/* Centered brand/title */}
        <div className="position-absolute start-50 translate-middle-x">
          <Link className="navbar-brand text-dark fw-bold" to="/">
            BookExplorer
          </Link>
        </div>

        {/* <Link className="nav-link text-dark" to="/books">
          Books
        </Link> */}

        {/* Right: Logout or login links */}
        <div className="d-flex align-items-center">
          {user ? (
            <>
              <span className="me-3 text-muted small">
                Hi, {user.username || user.email} ({user.role})
              </span>
              <button onClick={handleLogout} className="btn btn-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-sm  me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-sm" to="/register">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
