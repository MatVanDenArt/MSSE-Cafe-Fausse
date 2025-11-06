import React, { useState, useEffect } from "react";
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

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [location]);

  // Close menu when clicking outside and prevent body scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".nav")) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent body scroll
    } else {
      document.body.style.overflow = "unset"; // Restore body scroll
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset"; // Cleanup
    };
  }, [isMenuOpen]);

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`nav-overlay ${isMenuOpen ? "nav-overlay-visible" : ""}`}
        onClick={closeMenu}
        aria-label="Close menu"
      />

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
                to="/our-chefs"
                className={`nav-link ${isActive("/our-chefs")}`}
                onClick={closeMenu}
              >
                Our Chefs
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
              className={`nav-toggle ${isMenuOpen ? "open" : ""}`}
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
    </>
  );
};

export default Header;
