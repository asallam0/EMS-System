import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserShield, FaSignOutAlt, FaHome } from "react-icons/fa";
import "../styles/Header.css";

const Header = () => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/login");
  };

  return (
    <nav className="dash-navbar">
      <div className="nav-container">

        
        <Link className="nav-logo" to="/">
          EMS
        </Link>

        
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        
        {authUser && (
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                <FaHome className="nav-icon" /> Dashboard
              </Link>
            </li>

            {authUser.is_admin && (
              <li>
                <Link to="/admin" onClick={() => setMenuOpen(false)}>
                  <FaUserShield className="nav-icon" /> Admin
                </Link>
              </li>
            )}

            <li>
              <button className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt className="nav-icon" /> Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
