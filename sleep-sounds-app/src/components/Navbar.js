import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export function Navbar() {
  return (
    <div className="App-header">
      <h1>Sleep Sounds Player</h1>
      <nav>
        <Link to="/custom-player"><div className="nav-link"> Custom Player </div></Link>
        <Link to="/"><div className="nav-link"> Home </div></Link>


      </nav>
    </div>
  );
}