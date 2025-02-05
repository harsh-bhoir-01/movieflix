import { useState } from "react";
import { Route, Routes } from "react-router";
import PopularMovie from "./components/PopularMovie";
import TopRatedMovie from "./components/TopRatedMovie";
import UpcomingMovie from "./components/UpcomingMovie";
import Navbar from "./components/Navbar";
import MovieDetail from "./components/MovieDetail";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <main>
      <Navbar setSearchResults={setSearchResults} />

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 px-6 gap-4 lg:ml-0 w-full sm:grid-cols-2 md:grid-cols-3 md:ml-4 lg:grid-cols-4 lg:gap-16 lg:px-32">
          {searchResults.map((movie) => (
            <div key={movie.id} className="text-white text-center">
              <div
                onClick={() => (window.location.href = `/movie/${movie.id}`)}
                className="cursor-pointer mt-5"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="h-96 rounded"
                />
                <h3 className="text-lg font-semibold mt-2 ">{movie.title}</h3>
                <p>Rating: {movie.vote_average}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<PopularMovie />} />
          <Route path="/top-rated" element={<TopRatedMovie />} />
          <Route path="/upcoming" element={<UpcomingMovie />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      )}
    </main>
  );
};

export default App;
