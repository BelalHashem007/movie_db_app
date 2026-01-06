import Icon from "@mdi/react";
import { mdiFilmstrip } from "@mdi/js";

export default function Footer() {
    const linksStyle = 'hover:text-red-600 w-fit block'
  return (
    <footer className="text-gray-500 border-t border-gray-200">
      <div className="grid grid-cols-3 p-10">
        <div>
          <div className="flex font-bold text-xl items-center  text-black ">
            <Icon path={mdiFilmstrip} size={1.5} className="text-red-600" />{" "}
            MovieDB
          </div>
          <p className="mt-5">Your ultimate destination for discovering movies and TV shows.</p>
        </div>
        <div className="flex flex-col">
          <p className="text-black mb-2.5">Movies</p>
          <a href="/" className={linksStyle}>Popular</a>
          <a href="/now-playing" className={linksStyle}>Now Playing</a>
          <a href="/top-rated" className={linksStyle}>Top Rated</a>
          <a href="upcoming" className={linksStyle}>Upcoming</a>
        </div>
        <div className="flex flex-col">
          <p className="text-black mb-2.5">About</p>
          <a href="/#" className={linksStyle}>About Us</a>
          <a href="/#" className={linksStyle}>Contact</a>
          <a href="/#" className={linksStyle}>Terms of Service</a>
          <a href="/#" className={linksStyle}>Privacy Policy</a>
        </div>
      </div>
      <div className="border-t border-gray-200 text-center p-10">
        © 2026 MovieDB. All rights reserved.
      </div>
    </footer>
  );
}
