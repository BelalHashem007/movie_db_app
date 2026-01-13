import { useGetMovieReviewsByIdQuery, type Review } from "../../app/apiSlice";
import Icon from "@mdi/react";
import { mdiStar } from "@mdi/js";
import { getDateFromIso } from "../../utility/helperFunctions";
import { useState } from "react";

export default function MovieReviews({ id }: { id: string | number }) {
  const { data } = useGetMovieReviewsByIdQuery(id);
  console.log(data);
  if (!data || data.results.length == 0) {
    return <></>;
  }

  const reviews: Review[] = data.results.slice(0, 5);
  return (
    <section className="flex flex-col gap-5 mb-8">
      <h2>Reviews</h2>
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}

function Review({ review }: { review: Review }) {
  const [showMore, setShowMore] = useState<boolean>(false);
  return (
    <article className="dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-200 rounded-lg p-4 relative">
      <div className="flex gap-4 items-center">
        <h3 className="dark:text-white text-gray-900">{review.author}</h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1 px-1 py-1 rounded-md bg-yellow-500/20">
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
      </div>
      <p
        className={`dark:text-gray-300 text-gray-700 ${
          showMore ? "" : "line-clamp-2"
        } `}
      >
        {review.content}
      </p>
      <div className="absolute top-4 right-4 dark:text-gray-400 text-gray-600 ">
        {getDateFromIso(review.created_at)}
      </div>
      <button
        className="text-blue-400 mt-2"
        onClick={() => {
          setShowMore(!showMore);
        }}
      >
        {showMore ? "Show Less" : "Show More"}
      </button>
    </article>
  );
}
