import React, { useState } from "react";
import { v4 } from "uuid";

export default function Home({ presents = [] }) {
  // FIXME add test data (remove once data passed from parent)
  presents.push({
    id: v4(),
    name: "groovy beach sounds"
  });

  // add search query to state (controlled component)
  const [query, setQuery] = useState("");
  // add the presents currently showing to the state
  const [displayedPresets, setDisplayedPresents] = useState(presents);

  // filter list of all presents for those that resemble the search pattern
  const filterResults = () => {
    // console.log(presents);
    // console.log(query);
    // console.log(presents[0].name.includes(query));
    const queryResults = presents.filter((present) => present.name.includes(query));
    console.log(queryResults);
    setDisplayedPresents(queryResults);
  };

  // // perform initial filtering TODO only if the search parameter is included
  // filterResults();

  return (
    <div className="presents">
      {/* TODO implement search bar */}
      <div>
        <input value={query} type="text" name="present-query" placeholder="Search presents" onChange={event => setQuery(event.target.value)} />
        <button onClick={filterResults}>Search</button>
      </div>
      {/* TODO make each button a link that takes use to a detail page w/ id */}
      {displayedPresets.map((present, i) => (
        <div key={i} >
          <p>{present.name}</p>
        </div>
      ))}
    </div>
  );
}