import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1>SurvYAY</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/survey1">Survey1</Link>
        <Link to="/survey2">Survey2</Link>
        <Link to="#about">About</Link>
        <Link to="#help">Help</Link>
      </nav>
    </header>
  );
}

export default Header;
