import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

interface NavbarProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleChange }) => {
  return (
    <nav className="navbar">
      <img src={logo} alt="News" />
      <div className="search">
        <input type="text" placeholder="Search News" onChange={handleChange} />
      </div>
      <ul>
        <li>
          <Link to="/">All News</Link>
        </li>
        <li>
          <Link to="/trending">Trending</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
