import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PopularMovie = () => {
  const [pmovies, setPmovies] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order is ascending

  useEffect(() => {
    const fetchPopMovies = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        setPmovies(response.data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };
    fetchPopMovies();
  }, []);

  // Sort movies based on the release date
  const handleSortChange = (order) => {
    setSortOrder(order);
    const sortedMovies = [...pmovies].sort((a, b) => {
      if (order === "asc") {
        return new Date(a.release_date) - new Date(b.release_date);
      } else {
        return new Date(b.release_date) - new Date(a.release_date);
      }
    });
    setPmovies(sortedMovies);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-white font-bold text-lg md:text-xl lg:text-2xl py-2">
        Popular Movies
      </h2>

      {/* Sorting Dropdown */}
      <div className="mb-4">
        <label htmlFor="sort" className="text-white font-semibold">
          Sort by Release Date:
        </label>
        <select
          id="sort"
          className="ml-2 p-2 bg-gray-800 text-white rounded-md"
          onChange={(e) => handleSortChange(e.target.value)}
          value={sortOrder}
        >
          <option value="asc">Sort by Release Date: Ascending</option>
          <option value="desc">Sort by Release Date: Descending</option>
        </select>
      </div>

      {/* Movies Table */}
      <ul className="grid grid-cols-1 px-6 gap-4 lg:ml-0 w-full sm:grid-cols-2 md:grid-cols-3 md:ml-4 lg:grid-cols-4 lg:gap-16 lg:px-32">
        {pmovies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-auto h-auto rounded-lg"
              />
              <span className="text-center text-white text-lg font-semibold">
                <p>{movie.title}</p>
                <p>Rating: {movie.vote_average}</p>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularMovie;
