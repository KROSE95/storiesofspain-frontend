import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// link component behaves like a <a> tag but doesnt reload the page
const Navbar = () => {
  const { user, isAdmin, logout } = useContext(AuthContext);
  // const claims = getTokenClaims();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">
        BookExplorer
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/books">
              Books
            </Link>
          </li>
          {user && (
            <li className="nav-item">
              <Link className="nav-link" to="/mybooks">
                My Books
              </Link>
            </li>
          )}

          {isAdmin && (
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
            </li>
          )}
        </ul>
        <ul className="navbar-nav ms-auto">
          {user ? (
            <>
              <li className="nav-item">
                <span className="navbar-text me-3">
                  Hi, {user.username || user.email} ({user.role})
                </span>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
