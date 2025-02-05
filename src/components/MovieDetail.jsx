import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MovieDetail = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  const navigate = useNavigate();
  const handleNaviagte = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits`
        );
        setMovie(response.data);
        setCast(response.data.credits.cast);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button
        to="/"
        className="ml-5 font-semibold text-lg mt-2 flex items-center gap-1"
        onClick={handleNaviagte}
      >
        <IoArrowBack />
        Back
      </button>
      <div className="flex flex-col lg:flex-row p-5 overflow-hidden">
        <div className="bg-black text-white p-5 flex-1 w-full lg:w-1/2 flex flex-col rounded-tl-xl rounded-bl-xl">
          <div className="md:flex -mt-3">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="h-60 rounded-lg m-auto lg:m-0"
            />
            <div className="md:ml-4 flex flex-col  gap-4 w-full">
              <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold">
                {movie.title}
              </h2>
              <p className="text-md md:text-xl lg:text-2xl text-blue-300">
                Rating: {movie.vote_average}
              </p>
              <span className="flex gap-3">
                <p className="border w-fit px-0.5 py-1 rounded-md text-xs text-gray-300">
                  {movie.runtime} min
                </p>
                <p className="text-gray-400 text-sm">
                  {movie.genres.map((genre) => genre.name).join(", ")}
                </p>
              </span>

              <p className="text-gray-200 text-sm md:text-lg">
                Release Date: {movie.release_date}
              </p>
            </div>
          </div>
          <div className="w-fit">
            <p className="mt-1 text-lg md:text-xl lg:text-2xl ">Overview </p>
            <p className="text-sm text-gray-400">{movie.overview}</p>
          </div>
        </div>

        <div
          className="flex-1 hidden md:block lg:w-1/2 h-96 bg-cover bg-center rounded-tr-xl rounded-br-xl "
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
          }}
        ></div>
      </div>

      <div className="px-5 overflow-hidden">
        <h3 className="text-xl md:text-2xl text-white font-semibold">Cast</h3>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {cast.map((actor) => (
            <li key={actor.id} className="bg-gray-500 rounded-lg shadow p-2">
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                className="w-full h-auto rounded"
              />
              <p className="font-semibold">{actor.name}</p>
              <p className="text-gray-200">{actor.character}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetail;
