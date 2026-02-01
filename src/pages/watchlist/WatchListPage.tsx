import { useAppSelector } from "../../app/hooks";
import WatchList from "./WatchList";
import { selectCurrentUserId } from "../../app/authSlice/authSlice";
import { useGetAllWatchlistQuery } from "../../app/apiSlice";
import { skipToken } from "@reduxjs/toolkit/query";

export default function WatchListPage() {
  const userId = useAppSelector(selectCurrentUserId);
  const {data} = useGetAllWatchlistQuery(userId ?? skipToken)

  return (
    <>
    
      {userId && data ? (
        <div>
          <h2 className="text-center mb-0 mt-4 md:mt-8">My Watchlist</h2>
        <ul className="grid grid-cols-1 p-4 md:p-8 gap-4 md:gap-6 mb-8">
          {data.map((watchlistItem) => (
            <li key={watchlistItem.movie_id}>
              <WatchList watchlist={watchlistItem} />
            </li>
          ))}
        </ul>
        </div>
      ) : (
        <h2 className="text-center mt-5">Please login to view watchlist</h2>
      )}
    </>
  );
}
