import React from "react";

function Navabar({ setQuery, query, Movies }) {
  return (
    <div className="Navbar">
      <p>CineTrack 🎥</p>
      <input
        type="text"
        placeholder="Search for Movies..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <p>Found {Movies?.length} Results</p>
    </div>
  );
}

export default Navabar;
