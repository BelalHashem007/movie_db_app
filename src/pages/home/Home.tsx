import { useEffect, useState } from "react";
import { useGetPopularMoviesQuery } from "../../app/apiSlice";
import { useAppSelector } from "../../app/hooks";
import Movie from "../../components/Movie";
import { useSearchParams } from "react-router";

type FilterMovies = "Popular" | "Now Playing" | "Top Rated" | "Upcoming";

export default function Home() {
  const [filterMovies, setFilterMovies] = useState<FilterMovies>("Popular");
  const token = useAppSelector((state) => state.auth.token);
  const [searchParams,setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || '1'
  const { data,isFetching,isLoading } = useGetPopularMoviesQuery(page, { skip: !token });

  useEffect(()=>{
    window.scrollTo({top:0,left:0,behavior:'instant'})
  },[page])

  if(isLoading) return <p className="text-3xl font-bold">Loading...</p>

  function handlePagination(page:number){
    if(!isFetching){
      setSearchParams(`?page=${page}`)
    }
    
  }

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
            {data?.results.map((movie) => (
              <li key={movie.id}>
                <Movie movie={movie} />
              </li>
            ))}
          </ul>
        </section>

        <section className="self-center">
          <ul className="flex gap-3">
            <li><button onClick={()=>handlePagination(1)} className="p-2 bg-gray-300 text-2xl w-10 h-13 hover:bg-gray-200 hover:cursor-pointer">1</button></li>
            <li><button onClick={()=>handlePagination(2)} className="p-2 bg-gray-300 text-2xl w-10 h-13 hover:bg-gray-200 hover:cursor-pointer">2</button></li>
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
