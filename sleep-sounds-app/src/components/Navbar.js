import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export function Navbar() {
  return (
    <div className="App-header">
      <h1>Sleep Sounds Player</h1>
      <nav>
        <Link to="/custom-player"><div className="nav-link"> Custom Player </div></Link>
        <div className="nav-link"><Link to="/custom-player"> Custom Player </Link></div>
        <div className="nav-link"><Link to="/"> Home </Link></div>
        <Link to="/"> Home </Link>
      </nav>
    </div>
  );
}