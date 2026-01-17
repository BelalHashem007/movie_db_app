import Icon from "@mdi/react";
import { mdiFilmstrip } from "@mdi/js";
import { useEffect, useState } from "react";

export default function Footer() {
  const [selectValue, setSelectValue] = useState<string>(
    localStorage.getItem("theme") || "system"
  );

  useEffect(() => {
    const html = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      if (selectValue == "system")
        localStorage.setItem("theme", mediaQuery.matches ? "dark" : "light");
      else localStorage.setItem("theme", selectValue);

      if (localStorage.getItem("theme") === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    };

    applyTheme();

    mediaQuery.addEventListener("change", applyTheme);

    return () => {
      mediaQuery.removeEventListener("change", applyTheme);
    };
  }, [selectValue]);

  const linksStyle =
    "dark:text-gray-400 dark:hover:text-red-500 text-gray-600 hover:text-red-600 w-fit block";
  const paragaphsStyle = "dark:text-white text-gray-900 mb-2.5";

  return (
    <footer className=" bg-gray-50 border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800 w-full shrink-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-20 p-10">
          <div>
            <div className="flex font-bold text-xl items-center dark:text-white text-gray-900 ">
              <Icon
                path={mdiFilmstrip}
                size={1.5}
                className="dark:text-red-500 text-red-600"
              />{" "}
              MovieDB
            </div>
            <p className="mt-5 dark:text-gray-400 text-gray-600">
              Your ultimate destination for discovering movies and TV shows.
            </p>
          </div>
          <div className="flex justify-around gap-5 ">
            <div className="flex flex-col">
              <p className={paragaphsStyle}>Movies</p>
              <a href="/" className={linksStyle}>
                Popular
              </a>
              <a href="/now-playing" className={linksStyle}>
                Now Playing
              </a>
              <a href="/top-rated" className={linksStyle}>
                Top Rated
              </a>
              <a href="upcoming" className={linksStyle}>
                Upcoming
              </a>
            </div>
            <div>
              <label htmlFor="theme" className={`${paragaphsStyle} block`}>
                Light/Dark
              </label>
              <select
                name="theme"
                id="theme"
                className="border p-1 dark:bg-gray-900 dark:border-gray-500"
                value={selectValue}
                onChange={(e) => {
                  setSelectValue(e.target.value);
                }}
              >
                <option value="system">System</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
            <div className="flex flex-col">
              <p className={paragaphsStyle}>About</p>
              <a href="/#" className={linksStyle}>
                About Us
              </a>
              <a href="/#" className={linksStyle}>
                Contact
              </a>
              <a href="/#" className={linksStyle}>
                Terms of Service
              </a>
              <a href="/#" className={linksStyle}>
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 text-gray-600 text-center dark:text-gray-400 dark:border-gray-800 p-10">
          © 2026 MovieDB. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
