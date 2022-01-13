import React from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div>
      <h1>Sleep Sounds Player</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/custom-player">Custom Player</Link>
        <Link to="/oldeplayer">Olde Player</Link>
      </nav>
    </div>
  );
}