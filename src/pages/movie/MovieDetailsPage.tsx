import { useParams, useLocation, useNavigate } from "react-router";
import { useGetMovieByIdQuery } from "../../app/apiSlice";
import { useAppSelector } from "../../app/hooks";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";
import MovieInfo from "./MovieInfo";
import MovieCast from "./MovieCast";
import MovieGallery from "./MovieGallery";
import { lazy, useEffect, useRef, useState } from "react";

const MovieReviews = lazy(() => import("./MovieReviews"));

export default function MovieDetails() {
  const [showReviews, setShowReviews] = useState<boolean>(false);
  const movieReviewsPlaceholderRef = useRef<HTMLDivElement>(null);

  const token = useAppSelector((state) => state.auth.token);
  const params = useParams();
  const movieid = params.movieid as string;
  const location = useLocation();
  const navigate = useNavigate();

  const { data: movieData } = useGetMovieByIdQuery(movieid, {
    skip: !token,
  });

  useEffect(() => {
    if (!movieData || showReviews) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio <= 0) return;
        setShowReviews(true);
      },
      { rootMargin: "200px" }
    );

    observer.observe(movieReviewsPlaceholderRef.current as HTMLDivElement);

    return () => observer.disconnect();
  }, [movieData, showReviews]);

  function handleBack(): void {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/");
    }
  }
  if (!movieData) return;

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
      {movieData.images.backdrops.length > 0 && (
        <MovieGallery images={movieData.images} title={movieData.title} />
      )}
      <div id="MovieReviewsPlaceHolder" ref={movieReviewsPlaceholderRef}></div>
      {showReviews && <MovieReviews id={movieid} />}
    </div>
  );
}
