import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home({ presentOptions = {} }) {
  // FIXME add test data (remove once data passed from parent)
  // const presents = presentOptions;
  // console.log(presents);

  // const testData = {
  //   "groovy-sounds": {
  //     "name": "Groovy sounds",
  //     "sounds": [],
  //     "id": 100
  //   }
  // }
  // Object.assign(presents, testData);
  // FIXME end test data (remove once data passed from parent)

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
      {/* TODO make each button a link that takes use to a detail page w/ id */}
      {Object.values(displayedPresets).map((present, i) => (
        <div key={i} >
          <Link to={"/player/" + present.id}><p>{present.name}</p></Link>
        </div>
      ))}
      {/* link to the custom player page */}
      <button><Link to="custom-player" >Make custom player</Link></button>
    </div>
  );
}