import { format } from "date-fns";
import { Link } from "react-router";
import ImageWithFallback from "./ImgWithFallback";
import { useAppSelector } from "../app/hooks";
import { formatRating } from "../utility/helperFunctions";
import Rating from "./Rating";

//TODO: try to change the date format to intl
export interface Movie {
  id: string;
  title: string;
  vote_average: number;
  release_date: string;
  img_url: string;
}

export default function Movie({
  movie,
  place = "home",
}: {
  movie: Movie;
  place: "home" | "recommendation";
}) {
  const baseURL = useAppSelector((state) => state.img.url);
  const imgSrc = `${baseURL}w342` + movie.img_url;
  const dateFormatted = movie.release_date
    ? format(movie.release_date, "MMM dd yyyy")
    : "Unknown";

  return (
    <div className="relative">
      <Link to={`/movie/${movie.id}`} className="aspect-2/3 block">
        <ImageWithFallback
          src={imgSrc}
          alt={`Movie poster of ${movie.title}`}
          className="object-cover w-full h-full"
        />
      </Link>
      <div
        aria-label="Movie Rating"
        className={` absolute top-1 right-1`}
      >
        <Rating rating={formatRating(movie.vote_average)} />
      </div>
      <div className="relative">
        <Link to={`/movie/${movie.id}`} title={movie.title}>
          <h3
            className={`font-bold ${place == "home" ? "text-2xl" : "text-[16px]"}`}
          >
            {movie.title}
          </h3>
        </Link>

        <div
          className={`text-gray-500 ${place == "home" ? "text-[14px]" : ""}`}
        >
          {dateFormatted}
        </div>
      </div>
    </div>
  );
}
