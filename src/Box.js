import React, { useState } from "react";
import MovieDesc from "./MovieDesc";
const Average=(arr)=>{
    return arr.reduce((acc,curr,i,arr)=>acc+curr/arr.length,0)
}
function Box({ movies, watched, setWatched }) {
  const [selectedId, setSelectedId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  function HandleSelectId(id) {
    setSelectedId((previd) => (previd === id ? null : id));
    setIsOpen(true);
  }
  function HandleDelete(id) {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  }
  const AverageImdb=Average(watched.map((movie)=>movie.imdbRating));
  const AverageUserRating=Average(watched.map((movie)=>movie.userRating));
  const AverageRuntime=Average(watched.map((movie)=>movie.runtime));
  return (
    <div className="box">
      <div className="grid-box">
        <div className="box1">
          {movies?.map((movie) => (
            <div
              key={movie.imdbID}
              className="movies-list"
              onClick={() => HandleSelectId(movie.imdbID)}
            >
              <img src={movie.Poster} alt={movie.Title} />
              <div>
                <p>
                  <strong>{movie.Title}</strong>
                </p>
                <p>① {movie.Year}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="box1">
          {isOpen && selectedId ? (
            <MovieDesc
              selectedId={selectedId}
              setWatched={setWatched}
              setIsOpen={setIsOpen}
              watched={watched}
            />
          ) : (
            <>
              <div className="Movies-Watched-Details">
                <p>Movies You Watched</p>
                <div className="Movies-Average">
                  <div>
                    <p>▶️</p>
                    <p>{watched.length}</p>
                  </div>
                  <div>
                    <p>⭐️</p>
                    <p>{AverageImdb.toFixed(2)}</p>
                  </div>
                  <div>
                    <p>🌟</p>
                    <p>{AverageUserRating.toFixed(2)}</p>
                  </div>
                  <div>
                    <p>⏱️</p>
                    <p>{AverageRuntime.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div>
                {watched.map((movie) => (
                  <div className="Movies-Watched" key={movie.imdbID}>
                    <img src={movie.Poster} alt={movie.Title} />
                    <div className="Movies-List-Details">
                      <div className="Movies-Watched-list">
                        <p>{movie.Title}</p>
                        <p>⭐️ {movie.imdbRating}</p>
                        <p>🌟 {movie.userRating}</p>
                        <p>⏱️ {movie.runtime} min</p>
                      </div>
                      <button
                        className="btn"
                        onClick={() => HandleDelete(movie.imdbID)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Box;
