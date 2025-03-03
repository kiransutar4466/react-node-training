import React from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import About from "../pages/About";

const Navbar = ({ handleChange }) => {
  return (
    <nav className="navbar">
      <img src={logo} alt="News" />
      <div className="search">
        <input type="text" placeholder="Search News" onChange={handleChange} />
      </div>
      <ul>
        <li>
          <Link>All News</Link>
        </li>
        <li>
          <Link>Trending</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link>Contact us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
