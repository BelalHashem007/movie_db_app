import { useEffect } from "react";
import { useGetMovieListsQuery } from "../../app/apiSlice";
import Movie from "../../components/Movie";
import { useSearchParams, useParams, NavLink } from "react-router";
import Pagination from "../../components/Pagination";
import type { Category } from "../../app/apiSlice";


const CATEGORY_MAP: Record<string, Category> = {
  popular: "popular",
  "now-playing": "now_playing",
  "top-rated": "top_rated",
  upcoming: "upcoming",
};

export default function Home() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || "1";
  const activeCategory: Category =
    (category && CATEGORY_MAP[category]) || "popular";

  const { data, isLoading } = useGetMovieListsQuery(
    { page, category: activeCategory },
  );

  const buttons = [
    { label: "Popular", path: "" },
    { label: "Now Playing", path: "now-playing" },
    { label: "Top Rated", path: "top-rated" },
    { label: "Upcoming", path: "upcoming" },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [page]);

  function handlePagination(page: number) {
    setSearchParams(`?page=${page}`);
  }

  return (
    <div className=" my-5 flex gap-5 flex-col min-[500px]:px-5 container mx-auto px-2.5 justify-center">
      <section className="mx-auto">
        <nav aria-label="Movie Category">
          <ul className="flex gap-2.5 flex-wrap justify-center">
            {buttons.map((btn) => (
              <li key={btn.label} className="my-2">
                <CategoryButton
                  key={btn.path}
                  label={btn.label}
                  path={btn.path}
                />
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <section>
        <ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,350px))] justify-center">
          {isLoading ? (
            <LoadingMovie />
          ) : (
            data?.results.map((movie) => (
              <li key={movie.id}>
                <Movie movie={movie} place="home"/>
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="self-center">
        <Pagination
          handlePagination={handlePagination}
          numPage={Number(page)}
        />
      </section>
    </div>
  );
}

function LoadingMovie() {
  return (
    <>
      <li className="skeleton-card"></li>
      <li className="skeleton-card"></li>
      <li className="skeleton-card"></li>
      <li className="skeleton-card"></li>
      <li className="skeleton-card"></li>
      <li className="skeleton-card"></li>
    </>
  );
}

function CategoryButton({ label, path }: { label: string; path: string }) {
  return (
    <NavLink
      to={`/${path}?page=1`}
      className={({ isActive }) =>
        `${isActive ? "bg-black dark:bg-gray-700" : "bg-red-600"} 
         text-white p-2 rounded-lg transition-colors hover:bg-black dark:hover:bg-gray-700`
      }
    >
      {label}
    </NavLink>
  );
}
