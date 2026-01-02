import Icon from "@mdi/react";
import { mdiFilmstrip, mdiMagnify } from "@mdi/js";

export default function Header() {
  return (
    <header className="h-20 flex  items-center bg-white border-b border-b-gray-200 gap-5 justify-around">
      <div className="flex gap-5">
        <a href="/">
          <h1 className="flex font-bold text-2xl items-center">
            <Icon path={mdiFilmstrip} size={1.875} className="text-red-600" />{" "}
            MovieDB
          </h1>
        </a>
        <div className="relative">
          <Icon
            path={mdiMagnify}
            size={1}
            className="absolute top-2.5 left-2.5"
          />
          <input
            type="text"
            name="searchMovie"
            id="searchMovie"
            className="border p-2.5 pl-10 rounded-lg bg-white w-75 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline"
            placeholder="Search"
          />
        </div>
      </div>
      <nav>
        <ul className="flex gap-5 items-center">
          <li>
            <a href="movies/genre">Genres</a>
          </li>
          <li>
            <a href="watchlist">My Watchlist</a>
          </li>
          <li>
            <a href="login">Log in</a>
          </li>
          <li>
            <a href="signup">
              <button className="bg-red-600 text-white hover:cursor-pointer hover:bg-red-700 px-4 py-2 rounded-lg">Signup</button>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
