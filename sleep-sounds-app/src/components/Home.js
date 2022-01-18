import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home({ presentOptions = {} }) {
  // SEARCH BAR DATA/FUNCTIONALITY
  const fullPresents = presentOptions;
  // add search query to state (controlled component)
  const [query, setQuery] = useState("");
  // add the presents currently showing to the state
  const [displayedPresets, setDisplayedPresents] = useState(fullPresents);

  // filter list of all presents for those that resemble the search pattern
  const filterResults = () => {
    const queryResults = Object.values(fullPresents).filter((present) => present.name.includes(query));
    setDisplayedPresents(queryResults);
  };
  // END SEARCH BAR DATA/FUNCTIONALITY

  return (
    <div className="presents">
      {/* search bar */}
      <div className="search-bar">
        <input
          value={query}
          type="text"
          name="present-query"
          placeholder="Search presents"
          onChange={event => {
            setQuery(event.target.value);
          }}
        />
        <button onClick={filterResults}>Search</button>
      </div>
      {/* each button links to a player page w/ id */}
      <div class="present-list">
        {Object.values(displayedPresets).map((present, i) => (
          <div className="present-option" key={i} >
            <Link to={"/player/" + present.id}><p>{present.name}</p></Link>
          </div>
        ))}
      </div>
      {/* link to the custom player page */}
      <button><Link to="custom-player" >Make custom player</Link></button>
    </div>
  );
}