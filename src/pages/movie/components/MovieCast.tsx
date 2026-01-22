import type { Credits } from "../../../app/apiSlice";
import ImageWithFallback from "../../../components/ImgWithFallback";
import { useAppSelector } from "../../../app/hooks";

export default function MovieCast({credits}:{credits:Credits}) {

  const baseURL = useAppSelector((state)=>state.img.url);

    const url = `${baseURL}w185`
    const top_five_actors = credits.cast.slice(0,5);
  return (
    <section className="mb-8">
      <h2
      >
        Cast
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {top_five_actors.map((actor) => (
          <div
            key={actor.id}
            className={`rounded-lg border overflow-hidden dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-200`}
          >
            <div className="aspect-3/4 overflow-hidden">
              <ImageWithFallback src={url + actor.profile_path} alt={actor.name} className="w-full h-full object-fill"/>
            </div>
            <div className="p-3">
              <p
                className={`mb-1 dark:text-white text-gray-900`}
              >
                {actor.name}
              </p>
              <p
                className={`dark:text-gray-400 text-gray-600`}
              >
                {actor.character}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
