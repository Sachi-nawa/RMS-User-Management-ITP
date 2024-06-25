import React from "react";
import { Link } from "react-router-dom";
import imagelogo from "../../src/components/imagelogo.jpeg"

function Header() {
  return (
    <div>
      {/* Image above the navigation */}
      
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <img src={imagelogo} alt="Logo" style={{ width: "50px",marginLeft:"10px" , marginRight:"20px" }} />
        <a className="navbar-brand" href="#" style={{ color: "orange" }}>
          Bismilla Bakery & Restaurant
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                Create User
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                <button className="btn btn-reg">Register</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                <button className="btn btn-log">Log in</button>
              </Link>
            </li>
            <li className="nav-item"></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
