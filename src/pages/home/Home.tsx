import { useState } from "react";

type FilterMovies = "Popular" | "Now Playing" | "Top Rated" | "Upcoming";

export default function Home() {
  const [filterMovies, setFilterMovies] = useState<FilterMovies>("Popular");

  return (
    <section>
      <div className="flex gap-2.5 m-5">
        <Button name="Popular" filter={filterMovies} set={setFilterMovies} />
        <Button
          name="Now Playing"
          filter={filterMovies}
          set={setFilterMovies}
        />
        <Button name="Top Rated" filter={filterMovies} set={setFilterMovies} />
        <Button name="Upcoming" filter={filterMovies} set={setFilterMovies} />
      </div>
    </section>
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
