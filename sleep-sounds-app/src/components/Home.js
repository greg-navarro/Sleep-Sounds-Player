import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

export default function Home({ data = {} }) {
  const presents = Object.keys(data).includes("presents") ? data.presents : [];
  console.log(presents);
  // FIXME add test data (remove once data passed from parent)
  const testData = {
    "groovy-sounds": {
      "name": "Groovy sounds",
      "sounds": []
    }
  }
  Object.assign(presents, testData);
  // presents.push({
  //   id: v4(),
  //   name: "groovy beach sounds"
  // });
  const fullPresents = presents;
  // add search query to state (controlled component)
  const [query, setQuery] = useState("");
  // add the presents currently showing to the state
  const [displayedPresets, setDisplayedPresents] = useState(presents);

  // filter list of all presents for those that resemble the search pattern
  const filterResults = () => {
    // console.log(query);
    const queryResults = Object.values(fullPresents).filter((present) => present.name.includes(query));
    // console.log(queryResults);
    setDisplayedPresents(queryResults);
  };

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
            // console.log(event.target.value);
            setQuery(event.target.value);
            // console.log(query);
          }}
        />
        <button onClick={filterResults}>Search</button>
      </div>
      {/* TODO make each button a link that takes use to a detail page w/ id */}
      {Object.values(displayedPresets).map((present, i) => (
        <div key={i} >
          <p>{present.name}</p>
        </div>
      ))}
      {/* TODO link to the custom player page */}
      <button><Link to="custom-player" >Make custom player</Link></button>
    </div>
  );
}