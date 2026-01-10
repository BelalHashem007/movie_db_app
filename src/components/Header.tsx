import Icon from "@mdi/react";
import { mdiFilmstrip, mdiMagnify } from "@mdi/js";
import { Link } from "react-router";

export default function Header() {
  const linksStyle =
    "p-2 rounded-lg dark:text-gray-300 dark:hover:bg-gray-800 text-gray-700 hover:bg-gray-100";
  return (
    <header className="h-20 shrink-0  bg-white border-b border-b-gray-200 dark:bg-gray-900 dark:border-gray-800  ">
      <div className="flex h-full items-center gap-5 justify-between container mx-auto">
        <div className="flex gap-5 ">
          <h1 className=" font-bold text-2xl  text-gray-900 dark:text-white">
            <Link to="/" className="flex items-center">
              <Icon
                path={mdiFilmstrip}
                size={1.875}
                className="text-red-600 dark:text-red-500"
              />{" "}
              MovieDB
            </Link>
          </h1>
          <div className="relative">
            <Icon
              path={mdiMagnify}
              size={1}
              className="absolute top-2.5 left-2.5 dark:text-gray-400 text-gray-500"
            />
            <input
              type="search"
              name="searchMovie"
              id="searchMovie"
              className="border p-2.5 pl-10 rounded-lg w-75 focus:outline-none focus:ring-2 focus:ring-red-500/20
            bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-600
            dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500
            focus:outline"
              placeholder="Search"
            />
          </div>
        </div>
        <nav>
          <ul className="flex gap-5 items-center">
            <li>
              <Link to="movies/genre" className={linksStyle}>
                Genres
              </Link>
            </li>
            <li>
              <Link to="watchlist" className={linksStyle}>
                My Watchlist
              </Link>
            </li>
            <li>
              <Link to="login" className={linksStyle}>
                Log in
              </Link>
            </li>
            <li>
              <Link
                to="signup"
                className="bg-red-600 text-white hover:cursor-pointer hover:bg-red-700 px-4 py-2 rounded-lg"
              >
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
