import React from "react";
import { Link } from "react-router-dom";

export default function footer(_props) {
  return (
    <>
      <footer className="footer">
        <div className="flex justify-center nav">
          <Link to="/dashboard">
            <p>Dashboard</p>
          </Link>
          <Link to="/message">
            <p>Message</p>
          </Link>
        </div>
        <small>&copy; Rishabh Anand 2020</small>
      </footer>
    </>
  );
}
