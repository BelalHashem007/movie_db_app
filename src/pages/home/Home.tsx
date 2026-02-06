import { useEffect } from "react";
import {
  useGetMovieListsQuery,
  useGetMoviesWithGenreQuery,
} from "../../app/apiSlice";
import Movie from "../../components/Movie";
import { useSearchParams, useParams, NavLink,useNavigate } from "react-router";
import Pagination from "../../components/Pagination";
import type { Category } from "../../app/apiSlice";
import HomeFilter from "../../components/HomeFilter";


const CATEGORY_MAP: Record<string, Category> = {
  popular: "popular",
  "now-playing": "now_playing",
  "top-rated": "top_rated",
  upcoming: "upcoming",
};

export default function Home() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const genres = searchParams.get("with_genres");
  const page = searchParams.get("page") || "1";
  const {data:genresMovies, isFetching:isLoadingGenres} =
    useGetMoviesWithGenreQuery({genres:genres?.split(",") as string[],page},{skip:!genres});
  
  const activeCategory: Category =
    (category && CATEGORY_MAP[category]) || "popular";

  const { data, isFetching:isLoadingNormal } = useGetMovieListsQuery({
    page,
    category: activeCategory,
  },{skip:!!genres});

  const movies = genres ? genresMovies : data;
  const isDataLoading = genres ? isLoadingGenres : isLoadingNormal

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
    const currentParams = Object.fromEntries([...searchParams])
    setSearchParams({...currentParams,page:page.toString()})
  }

  //Filter movies
  function handleFiltering(genres:number[]) {
    navigate(`/discover/movie?page=1&with_genres=${genres.join(',')}`)
  }

  return (
    <div className="my-5 gap-5 flex flex-col sm:flex-row min-[500px]:px-5 container mx-auto px-2.5 sm:relative">
      <HomeFilter handleFiltering={handleFiltering}/>
      <div className="flex flex-col justify-center grow gap-5">
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
            {isDataLoading ? (
              <LoadingMovie />
            ) : (
              movies?.results.map((movie) => (
                <li key={movie.id}>
                  <Movie movie={movie} place="home" />
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
