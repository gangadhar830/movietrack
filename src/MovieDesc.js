import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
const KEY = "44e94b9";
function MovieDesc({ selectedId, setWatched, watched, setIsOpen }) {
  const [rating, setRating] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState({});
  const isWatched = watched?.map((movie) => movie.imdbID).includes(selectedId);
  const ratedMovie = watched?.find((movie) => movie.imdbID === selectedId);
  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setSelectedMovie(data);
    }
    if (selectedId) {
      fetchMovies();
    }
  }, [selectedId]);
  const {
    Title: title,
    Poster: poster,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Genre: genre,
  } = selectedMovie;
  function handleAddToWatched() {
    setWatched((prev) => [
      ...prev,
      {
        ...selectedMovie,
        userRating: rating,
        runtime: Number(selectedMovie.Runtime.split(" ")[0]),
      },
    ]);
    setIsOpen((f) => !f);
  }

  return (
    <div className="selected-movie-container">
      <button className="add" onClick={() => setIsOpen((f) => !f)}>
        Back
      </button>
      <div className="selected-movie">
        <img src={poster} alt={title} />
        <div className="selected-movie-info">
          <h1>{title}</h1>
          <h3>
            {year} . {runtime}
          </h3>
          <p>{genre}</p>
          <p>⭐ {imdbRating}/10</p>
        </div>
      </div>
      {isWatched ? (
        <p>You have watched this movie {ratedMovie.userRating}</p>
      ) : (
        <div className="Stars">
          <StarRating maxRating={10} size={24} onSetRating={setRating} />
          <button className="add" onClick={handleAddToWatched}>
            Add to list
          </button>
        </div>
      )}

      <div className="selected-movie-overview">
        <p>Description:</p>
        <p>
          <strong>{plot}</strong>
        </p>
        <p>{released}</p>
        <p>
          <strong>Actors:</strong>
        </p>
        <p>{actors}</p>
      </div>
    </div>
  );
}

export default MovieDesc;
