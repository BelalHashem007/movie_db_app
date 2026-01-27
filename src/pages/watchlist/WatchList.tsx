import { type WatchlistPayloadItem } from "../../app/watchListSlice/watchListSlice";
import { formatRating } from "../../utility/helperFunctions";
import Rating from "../../components/Rating";

type Props = { watchlist: WatchlistPayloadItem };

export default function WatchList({ watchlist }: Props) {
  return (
    <div className="border rounded-lg p-2 flex gap-4 dark:bg-gray-800 bg-white border-gray-200 dark:border-gray-700">
      <img
        src={watchlist.img || ""}
        alt={watchlist.title || ""}
        className="object-contain aspect-auto h-50"
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h2 className="font-bold text-[16px] mb-0">{watchlist.title}</h2>
          <p className="dark:text-gray-400 text-gray-500">{watchlist.date}</p>
        </div>
        <div className=" w-fit">
          <Rating rating={formatRating(watchlist.rate || 0)} />
        </div>
        <p>{watchlist.overview}</p>
      </div>
    </div>
  );
}
