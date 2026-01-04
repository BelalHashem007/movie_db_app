import { useState } from "react";
import { useGetPopularMoviesQuery } from "../../app/apiSlice";
import { useAppSelector } from "../../app/hooks";
import Movie from "../../components/Movie";

type FilterMovies = "Popular" | "Now Playing" | "Top Rated" | "Upcoming";

export default function Home() {
  const [filterMovies, setFilterMovies] = useState<FilterMovies>("Popular");
  const token = useAppSelector((state) => state.auth.token);
  const { data } = useGetPopularMoviesQuery(undefined, { skip: !token });

  return (
    <div className="mx-2.5 my-5 flex gap-5 flex-col min-[500px]:mx-5">
      <section>
        <div className="flex gap-2.5">
          <Button name="Popular" filter={filterMovies} set={setFilterMovies} />
          <Button
            name="Now Playing"
            filter={filterMovies}
            set={setFilterMovies}
          />
          <Button
            name="Top Rated"
            filter={filterMovies}
            set={setFilterMovies}
          />
          <Button name="Upcoming" filter={filterMovies} set={setFilterMovies} />
        </div>
      </section>
        <section>
          <ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,350px))] justify-center">
            {data?.map((movie) => (
              <li key={movie.id}>
                <Movie movie={movie} />
              </li>
            ))}
          </ul>
        </section>
    </div>
  );
}

function Button({
  name,
  filter,
  set,
}: {
  name: FilterMovies;
  filter: FilterMovies;
  set: React.Dispatch<React.SetStateAction<FilterMovies>>;
}) {
  function handleFilterUpdate() {
    set(name);
  }
  return (
    <button
      onClick={handleFilterUpdate}
      className={`${
        filter === name && "bg-black!"
      } bg-red-400 text-white p-2 rounded-lg hover:cursor-pointer transition-colors hover:bg-black `}
    >
      {name}
    </button>
  );
}
