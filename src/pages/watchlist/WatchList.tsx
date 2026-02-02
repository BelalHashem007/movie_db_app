import { formatRating } from "../../utility/helperFunctions";
import Rating from "../../components/Rating";
import { useDeleteWatchlistItemMutation, type MovieToWatchlist } from "../../app/apiSlice";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUserId } from "../../app/authSlice/authSlice";
import Icon from '@mdi/react';
import { mdiTrashCan } from '@mdi/js';

type Props = { watchlist: MovieToWatchlist };

export default function WatchList({ watchlist }: Props) {
  const userId = useAppSelector(selectCurrentUserId);
  const [deleteItem] = useDeleteWatchlistItemMutation();

  async function handleRemove() {
    try {
      await deleteItem({
        movie_id: watchlist.movie_id,
        user_id: userId as string,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="border rounded-lg p-2 gap-4 dark:bg-gray-800 bg-white border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-[133.33px_1fr]">
      <a href={`/movie/${watchlist.movie_id}`}>
        <img
          src={watchlist.img || ""}
          alt={watchlist.title || ""}
          className="w-full max-w-100 h-auto md:w-[133.33px] md:h-full mx-auto"
        />
      </a>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h2 className="font-bold text-[16px] mb-0">
            <a href={`/movie/${watchlist.movie_id}`}>{watchlist.title}</a>
          </h2>
          <p className="dark:text-gray-400 text-gray-500">{watchlist.date}</p>
        </div>
        <div className=" w-fit *:bg-yellow-700 **:text-yellow-400">
          <Rating rating={formatRating(watchlist.rate || 0)} />
        </div>
        <p>{watchlist.overview}</p>
        <button
          className="w-fit  bg-red-600 hover:bg-red-700  p-1 text-white rounded-lg transition-colors "
          onClick={handleRemove}
        >
          <Icon path={mdiTrashCan} size={1} />
        </button>
      </div>
    </div>
  );
}
