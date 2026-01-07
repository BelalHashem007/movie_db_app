import { useEffect } from "react";
import { useGetMovieListsQuery } from "../../app/apiSlice";
import { useAppSelector } from "../../app/hooks";
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
  const token = useAppSelector((state) => state.auth.token);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || "1";
  const activeCategory: Category =
    (category && CATEGORY_MAP[category]) || "popular";

  const { data, isLoading } = useGetMovieListsQuery(
    { page, category: activeCategory },
    {
      skip: !token,
    }
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
    <div className="mx-2.5 my-5 flex gap-5 flex-col min-[500px]:mx-5 ">
      <section>
        <div className="flex gap-2.5">
          {buttons.map((btn) => (
            <CategoryButton key={btn.path} label={btn.label} path={btn.path} />
          ))}
        </div>
      </section>
      <section>
        <ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,350px))] justify-center">
          {isLoading ? (
            <LoadingMovie />
          ) : (
            data?.results.map((movie) => (
              <li key={movie.id}>
                <Movie movie={movie} />
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
    <li className="skeleton-card">
    </li>
    <li className="skeleton-card">
    </li>
    <li className="skeleton-card">
    </li>
    <li className="skeleton-card">
    </li>
    <li className="skeleton-card">
    </li>
    <li className="skeleton-card">
    </li>
    </>
  );
}

function CategoryButton({ label, path }: { label: string; path: string }) {
  return (
    <NavLink
      to={`/${path}?page=1`}
      className={({ isActive }) =>
        `${isActive ? "bg-black dark:bg-gray-700" : "bg-red-400"} 
         text-white p-2 rounded-lg transition-colors hover:bg-black dark:hover:bg-gray-700`
      }
    >
      {label}
    </NavLink>
  );
}
