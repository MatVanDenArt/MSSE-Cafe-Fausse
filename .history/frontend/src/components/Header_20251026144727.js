import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <img
              src="/images/Logo - Cafe Fausse.png"
              alt="Café Fausse Logo"
              className="nav-logo-img"
            />
            <span className="nav-logo-text">Café Fausse</span>
          </Link>

          <div className={`nav-menu ${isMenuOpen ? "nav-menu-open" : ""}`}>
            <Link
              to="/"
              className={`nav-link ${isActive("/")}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`nav-link ${isActive("/menu")}`}
              onClick={closeMenu}
            >
              Menu
            </Link>
            <Link
              to="/reservations"
              className={`nav-link ${isActive("/reservations")}`}
              onClick={closeMenu}
            >
              Reservations
            </Link>
            <Link
              to="/about"
              className={`nav-link ${isActive("/about")}`}
              onClick={closeMenu}
            >
              About Us
            </Link>
            <Link
              to="/gallery"
              className={`nav-link ${isActive("/gallery")}`}
              onClick={closeMenu}
            >
              Gallery
            </Link>
          </div>

          <button
            className="nav-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span className="nav-toggle-line"></span>
            <span className="nav-toggle-line"></span>
            <span className="nav-toggle-line"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
