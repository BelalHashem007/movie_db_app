import Icon from "@mdi/react";
import { mdiFilterOutline } from "@mdi/js";
import { useRef, useState } from "react";
import { useGetMovieGenresQuery } from "../app/apiSlice";
import useClickOutside from "../utility/useClickOutside";

export default function HomeFilter({
  handleFiltering,
}: {
  handleFiltering: (genres: number[]) => void;
}) {
  const { data: genresData } = useGetMovieGenresQuery();
  const [genres, setGenres] = useState<number[]>([]);
  const [showFilterMobile, setShowFilterMobile] = useState<boolean>(false);
  const asideRef = useRef(null);
  //Update state on click outside for mobile
  useClickOutside(asideRef, setShowFilterMobile);
  return (
    <>
      <button
        onClick={() => setShowFilterMobile(true)}
        className=" sm:hidden flex text-xl px-4 py-2 gap-2 align-middle border bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-700"
      >
        <Icon path={mdiFilterOutline} size={1} className="mt-1" /> Filter by
        Genre
      </button>
      <div
        className={`${showFilterMobile ? "fixed top-0 right-0 w-full h-full bg-gray-900/65 z-50 flex justify-center items-center" : ""} `}
      >
        <aside
          ref={asideRef}
          className={`${showFilterMobile ? "fixed z-10 w-[90%] mx-auto" : `hidden`} sm:block sm:sticky top-5 rounded-lg p-6 border max-h-max bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-800`}
        >
          <button
            onClick={() => setShowFilterMobile(false)}
            className="sm:hidden absolute right-6 p-1 rounded-lg dark:text-gray-300 dark:hover:bg-gray-800 text-gray-700 hover:bg-gray-100"
          >
            X
          </button>
          <h3 className="flex text-xl font-bold align-middle ">
            <Icon path={mdiFilterOutline} size={1} className="mt-1" /> Filter by
            Genre
          </h3>
          <ul className="pl-2 mt-2 mb-4">
            {genresData &&
              genresData.genres.map((genre) => (
                <li key={genre.id}>
                  <input
                    type="checkbox"
                    name={genre.name}
                    id={genre.name}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setGenres([...genres, genre.id]);
                      } else {
                        setGenres(genres.filter((g) => g != genre.id));
                      }
                    }}
                  />{" "}
                  <label htmlFor={genre.name}>{genre.name}</label>
                </li>
              ))}
          </ul>
          <button
            onClick={() => {
              handleFiltering(genres);
              setShowFilterMobile(false);
            }}
            className="w-full py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Apply Filters
          </button>
          {genres.length > 0 && (
            <p className="mt-5 text-sm dark:text-gray-400 text-gray-600">
              Selected Genres: {genres.length}
            </p>
          )}
        </aside>
      </div>
    </>
  );
}
