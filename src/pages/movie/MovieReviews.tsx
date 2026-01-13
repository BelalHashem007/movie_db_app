import { useGetMovieReviewsByIdQuery } from "../../app/apiSlice";
import Icon from "@mdi/react";
import { mdiStar } from "@mdi/js";
import { getDateFromIso } from "../../utility/helperFunctions";

export default function MovieReviews({ id }: { id: string | number }) {
  const { data } = useGetMovieReviewsByIdQuery(id);
  console.log(data);
  if ( !data || data.results.length == 0) {
    return <></>;
  }
  return (
    <section>
      <h2>Reviews</h2>
      {data.results.map((review) => (
        <article>
          <h3>{review.author}</h3>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 px-3 py-1 rounded-md bg-yellow-500/20">
              <Icon
                path={mdiStar}
                size={"20px"}
                className="text-yellow-400 fill-yellow-400"
              />
              <span className={`text-xl dark:text-yellow-400 text-yellow-600`}>
                {Number(review.author_details.rating).toFixed(1)}
              </span>
            </div>
          </div>
          <p>{review.content}</p>
          <div>{getDateFromIso(review.created_at)}</div>
        </article>
      ))}
    </section>
  );
}
