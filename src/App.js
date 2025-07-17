import React, { useEffect, useState } from "react";
import Navabar from "./Navabar";
import Box from "./Box";
import "./index.css";

const KEY = "44e94b9";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      } catch (err) {
        if(err.name!=="AbortError"){
        console.log("Fetch Error:",err);
      }
    }
  }
     if (query.length < 3) {
          setMovies([]);
          return;
        }

    fetchMovies();
    return () => {
      controller.abort();
    };
}, [query]);
  return (
    <div className="App">
      <Navabar setQuery={setQuery} query={query} Movies={movies} />
      <Box movies={movies} watched={watched} setWatched={setWatched} />
    </div>
  );
}

export default App;
