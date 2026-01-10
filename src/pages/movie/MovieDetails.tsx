import { useParams, useLocation, useNavigate } from "react-router";
import { useGetMovieByIdQuery } from "../../app/apiSlice";
import { useAppSelector } from "../../app/hooks";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";
import MovieInfo from "./MovieInfo";
import MovieCast from "./MovieCast";

export default function MovieDetails() {
  const token = useAppSelector((state) => state.auth.token);
  const { movieid } = useParams();
  const location = useLocation();
  const naviagte = useNavigate();

  const { data: movieData } = useGetMovieByIdQuery(movieid as string, {
    skip: !token,
  });

  function handleBack() {
    if (location.key !== "default") {
      naviagte(-1);
    } else {
      naviagte("/");
    }
  }
  if (!movieData) return;

  console.log(movieData);
  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleBack}
        className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 
          `}
      >
        <Icon path={mdiArrowLeft} size={1} />
        Back to Movies
      </button>
      <MovieInfo movieData={movieData} />
      <MovieCast credits={movieData.credits} />
    </div>
  );
}
