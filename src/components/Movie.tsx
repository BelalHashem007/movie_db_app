import { format } from "date-fns";
import { Link } from "react-router";
import ImageWithFallback from "./ImgWithFallback";

export interface Movie {
  id: string;
  title: string;
  vote_average: number;
  release_date: string;
  img_url: string;
}

export default function Movie({ movie,place="home" }: { movie: Movie,place: "home" | "recommendation" }) {
  
  const imgSrc = "https://image.tmdb.org/t/p/w342" + movie.img_url;
  const vote = Number(movie.vote_average).toFixed(1);
  const dateFormatted = movie.release_date ? format(movie.release_date, "MMM dd yyyy") : 'Unknown';

  return (
    <div>
      <Link  to={`/movie/${movie.id}`} className="aspect-2/3 block">
        <ImageWithFallback src={imgSrc} alt={`Movie poster of ${movie.title}`} className="object-contain w-full h-full"/>
      </Link>
      <div className="relative">
        <Link to={`/movie/${movie.id}`} title={movie.title}>
          <h3 className={`font-bold ${place== "home" ? "text-2xl": "text-[16px]" }`}>{movie.title}</h3>
        </Link>
        <div
          aria-label="Movie Rating"
          className={`w-8.75 absolute top-0 left-1 rounded-[50%] bg-emerald-600 text-white border p-1 -translate-y-10 text-center`}
        >
          {vote}
        </div>
        <div className={`text-gray-500 ${place== "home" ? "text-[14px]": "" }`}>{dateFormatted}</div>
      </div>
    </div>
  );
}
