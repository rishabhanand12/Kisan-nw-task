import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="header container">
      <nav className="flex space-between align-center">
        <Link to="/">
          <h1 className="logo">TrackOTP</h1>
        </Link>
        <ul className="flex nav-list">
          <li>
            <NavLink activeClassName="active-btn" to="/">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active-btn" to="/message">
              Messages
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
