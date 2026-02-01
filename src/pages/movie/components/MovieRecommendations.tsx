import { useGetMovieRecommendationQuery } from "../../../app/apiSlice";
import Movie from "../../../components/Movie";

export default function MovieRecommendation({ id }: { id: number | string }) {
  const { data: movieRecommendation } = useGetMovieRecommendationQuery(id);

  if (!movieRecommendation || movieRecommendation.results.length === 0) return <></>;

  return (
    <section>
      <h2>Recommendations</h2>
      <ul className="flex gap-4 overflow-x-auto pb-2">
        {movieRecommendation.results.map((movie) => (
          <li key={movie.id} className="w-25 md:w-50 shrink-0">
            <Movie movie={movie} place="recommendation"/>
          </li>
        ))}
      </ul>
    </section>
  );
}
