import type { MovieById } from "../../app/apiSlice";
import Icon from "@mdi/react";
import {
  mdiStar,
  mdiCalendarBlank,
  mdiClockOutline,
  mdiCurrencyUsd,
} from "@mdi/js";
import ImageWithFallback from "../../components/ImgWithFallback";
import { getDuration } from "../../utility/helperFunctions";

export default function MovieInfo({ movieData }: { movieData: MovieById }) {

  const poster:string = "https://image.tmdb.org/t/p/w780" + movieData.poster_path;
  const duration:string = movieData.runtime
    ? getDuration(movieData.runtime)
    : "Unknown";
  const budget:string = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(movieData.budget);

  return (
    <section
      className={`rounded-lg border p-6 mb-8  bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="rounded-lg overflow-hidden aspect-2/3">
            <ImageWithFallback src={poster} alt={movieData.title} className="w-full h-full object-fill"/>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className={`text-4xl mb-4 dark:text-white text-gray-900`}>
            {movieData.title}
          </h2>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 px-3 py-1 rounded-md bg-yellow-500/20">
              <Icon
                path={mdiStar}
                size={"20px"}
                className="text-yellow-400 fill-yellow-400"
              />
              <span className={`text-xl dark:text-yellow-400 text-yellow-600`}>
                {Number(movieData.vote_average).toFixed(1)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {movieData.genres.map((genre) => (
              <span
                key={genre.id}
                className={`px-3 py-1 rounded-full border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300`}
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p
            className={`text-lg mb-6 leading-relaxed dark:text-gray-300 text-gray-700`}
          >
            {movieData.overview}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Icon
                path={mdiCalendarBlank}
                size={"20px"}
                className="dark:text-red-500 text-red-600"
              />
              <div>
                <p className={`dark:text-gray-400 text-gray-600`}>
                  Release Date
                </p>
                <p className={`dark:text-white text-gray-900`}>
                  {movieData.release_date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Icon
                path={mdiClockOutline}
                size={"20px"}
                className="dark:text-red-500 text-red-600"
              />
              <div>
                <p className={`dark:text-gray-400 text-gray-600`}>Duration</p>
                <p className={`dark:text-white text-gray-900`}>{duration}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Icon
                path={mdiCurrencyUsd}
                size={"20px"}
                className="dark:text-red-500 text-red-600"
              />
              <div>
                <p className={`dark:text-gray-400 text-gray-600`}>Budget</p>
                <p className={`dark:text-white text-gray-900`}>{budget}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

