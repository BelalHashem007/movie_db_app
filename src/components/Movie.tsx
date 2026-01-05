import { format } from "date-fns";

export interface Movie {
  id: string;
  title: string;
  vote_average: number;
  release_date: string;
  img_url: string;
}

export default function Movie({ movie }: { movie: Movie }) {
  const imgSrc = "https://image.tmdb.org/t/p/w342" + movie.img_url;
  const vote = Number(movie.vote_average).toFixed(1);
  const dateFormatted = format(movie.release_date, "MMM dd yyyy");

  return (
    <div>
      <a href="" className="aspect-2/3 block">
        <img
          src={imgSrc}
          loading="lazy"
          alt={`Movie poster of ${movie.title}`}
          className="object-contain w-full h-full"
        />
      </a>
      <div className="relative">
        <a href="" title={movie.title}>
          <h3 className="font-bold text-2xl">{movie.title}</h3>
        </a>
        <div
          aria-label="Movie Rating"
          className="w-8.75 absolute top-0 left-1 rounded-[50%] bg-emerald-600 text-white border p-1 -translate-y-10 text-center"
        >
          {vote}
        </div>
        <div className="text-gray-500">{dateFormatted}</div>
      </div>
    </div>
  );
}
