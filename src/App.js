import React, { useEffect, useState } from 'react';
import './App.css';
import { getMovieList, searchMovie } from './api';

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query.trim() === '') {
      fetchMovies();
    } else {
      handleSearch();
    }
  }, [query]);

  const fetchMovies = async () => {
    try {
      const movieList = await getMovieList();
      setMovies(movieList);
    } catch (error) {
      console.error("Error fetching movie list:", error);
    }
  };

  const handleSearch = async () => {
    try {
      if (query.trim() !== '') {
        const searchResults = await searchMovie(query);
        setMovies(searchResults);
      } else {
        fetchMovies(); // Jika query kosong, tampilkan daftar film populer
      }
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <div className="navbar">
        <header className='App-header'>
          <h1>JS Movie</h1>
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search..." 
              className="search-input"
              value={query}
              onChange={handleChange}
            />
          </div>
          
        </header>
      </div>
      <div className="home"></div>
      {!query && (
        <div className="Movie-popular">
          <h1>Now Playing</h1>
        </div>
      )}
      <div className="Movie-container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div className="Movie-wrapper" key={movie.id}>
              <div className="Movie-title">{movie.title}</div>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className='Movie-image' alt={movie.title} />
              <div className="Movie-data">Release Date: {movie.release_date}</div>
              <div className="Movie-rate">Rating: {movie.vote_average}</div>
            </div>
          ))
        ) : (
          <h1>No movies found</h1>
        )}
      </div>
    </div>
  );
}

export default App;
