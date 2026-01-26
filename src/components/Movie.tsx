import { format } from "date-fns";
import { Link } from "react-router";
import ImageWithFallback from "./ImgWithFallback";
import { useAppSelector } from "../app/hooks";

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
  // const [openOptions, setOpenOptions] = useState<boolean>(false);
  // const buttonRef = useRef<HTMLButtonElement | null>(null);
  // useClickOutside(buttonRef, setOpenOptions);
  const baseURL = useAppSelector((state) => state.img.url);
  const imgSrc = `${baseURL}w342` + movie.img_url;
  const vote = Number(movie.vote_average).toFixed(1);
  const dateFormatted = movie.release_date
    ? format(movie.release_date, "MMM dd yyyy")
    : "Unknown";


  return (
    <div className="relative">
      {/*Was thinking of adding watchlist in the homepage*/}
      {/* <div className="relative">
        <button
          ref={buttonRef}
          className="absolute bg-gray-400 top-2 right-2 hover:bg-blue-300 rounded-full"
          onClick={() => setOpenOptions(!openOptions)}
        >
          <Icon path={mdiDotsHorizontal} size={1} className="text-black" />
        </button>
        {openOptions && (
          <div className="absolute bg-white p-2 top-9 right-4 translate-x-[50%] z-1 shadow border border-gray-300">
            <button onClick={() => } className="px-2 flex gap-1 hover:bg-gray-300">
              <Icon path={mdiBookmark} size={1} />
              Watchlist
            </button>
          </div>
        )}
      </div> */}
      <Link to={`/movie/${movie.id}`} className="aspect-2/3 block">
        <ImageWithFallback
          src={imgSrc}
          alt={`Movie poster of ${movie.title}`}
          className="object-cover w-full h-full"
        />
      </Link>
      <div className="relative">
        <Link to={`/movie/${movie.id}`} title={movie.title}>
          <h3
            className={`font-bold ${place == "home" ? "text-2xl" : "text-[16px]"}`}
          >
            {movie.title}
          </h3>
        </Link>
        <div
          aria-label="Movie Rating"
          className={`w-8.75 absolute top-0 left-1 rounded-[50%] bg-emerald-600 text-white border p-1 -translate-y-10 text-center`}
        >
          {vote}
        </div>
        <div
          className={`text-gray-500 ${place == "home" ? "text-[14px]" : ""}`}
        >
          {dateFormatted}
        </div>
      </div>
    </div>
  );
}
