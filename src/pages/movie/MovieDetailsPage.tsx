import { useParams, useLocation, useNavigate } from "react-router";
import { useGetMovieByIdQuery } from "../../app/apiSlice";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";
import MovieInfo from "./components/MovieInfo";
import MovieCast from "./components/MovieCast";
import MovieGallery from "./components/MovieGallery";
import { lazy, useRef, useState } from "react";
import MovieDetailsSkeleton from "./components/MovieDetailsSkeleton";
import useIntersection from "../../utility/useIntersection";

const MovieReviews = lazy(() => import("./components/MovieReviews"));
const MovieRecommendation = lazy(() => import("./components/MovieRecommendations"));

export default function MovieDetails() {
  const [showReviews, setShowReviews] = useState<boolean>(false);
  const [showRecommendations, setShowRecommendations] = useState<boolean>(false);
  const movieReviewsPlaceholderRef = useRef<HTMLDivElement>(null);
  const movieRecommendationPlaceholderRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const movieid = params.movieid as string;
  const location = useLocation();
  const navigate = useNavigate();

  const { data: movieData, isLoading } = useGetMovieByIdQuery(movieid);

  //intersections
  useIntersection({
    target: movieReviewsPlaceholderRef,
    isLoading: isLoading,
    show: showReviews,
    setShow: setShowReviews,
  });
  useIntersection({
    target: movieRecommendationPlaceholderRef,
    isLoading: isLoading,
    show: showRecommendations,
    setShow: setShowRecommendations,
  });
 
  //handlers
  function handleBack(): void {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

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
      {isLoading || !movieData ? (
        <MovieDetailsSkeleton />
      ) : (
        <div className="">
          <MovieInfo movieData={movieData} />
          <MovieCast credits={movieData.credits} />
          {movieData.images.backdrops.length > 0 && (
            <MovieGallery images={movieData.images} title={movieData.title} />
          )}
          <div
            id="MovieReviewsPlaceHolder"
            ref={movieReviewsPlaceholderRef}
          ></div>
          {showReviews && <MovieReviews id={movieid} />}
          <div
            id="MovieRecommendationPlaceHolder"
            ref={movieRecommendationPlaceholderRef}
          ></div>
          {showRecommendations && <MovieRecommendation id={movieid} />}
        </div>
      )}
    </div>
  );
}
