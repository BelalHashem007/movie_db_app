import { useAppSelector } from "../../app/hooks";
import WatchList from "./WatchList";
import { selectCurrentUser } from "../../app/authSlice/authSlice";

export default function WatchListPage() {
  const user = useAppSelector(selectCurrentUser);
  const watchlist = useAppSelector((state) => state.watchlist);

  return (
    <>
      {user ? (
        <ul className="grid grid-cols-1 p-4 md:p-8 gap-4 md:gap-6 mb-8">
          {watchlist.ids.map((id) => (
            <li key={id}>
              <WatchList watchlist={watchlist.map[id.toString()]} />
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="text-center mt-5">Please login to view watchlist</h2>
      )}
    </>
  );
}
