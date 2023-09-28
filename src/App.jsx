import React, { useEffect, useState } from "react";
import "./App.css";
import { getMovieList, searchMovie } from "./api";

const Movie = ({ title, poster_path, release_date, vote_average }) => (
  <div className="Movie-wrapper">
    <div className="Movie-title">
      <h2>{title}</h2>
      </div>
    <img
      className="Movie-image"
      src={`${import.meta.env.VITE_REACT_APP_BASEIMGURl}${poster_path}`}
      alt={title}
    />
    <div className="Movie-date">Release: {release_date}</div>
    <div className="Movie-rate">Rating: {vote_average}</div>
  </div>
);

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const result = await getMovieList();
      setPopularMovies(result);
    };
    fetchPopularMovies();
  }, []);

  const handleSearch = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Izan{"'s"} Film Fest: Showcasing the Best of Cinema</h1>
        <input
          placeholder="Cari film kesayangan..."
          className="Movie-search"
          onChange={({ target }) => handleSearch(target.value)}
        />
        <div className="Movie-container">
          {popularMovies.map((movie, i) => (
            <Movie key={i} {...movie} />
          ))}
        </div>
      </header>
    </div>
  );
};

export default App;