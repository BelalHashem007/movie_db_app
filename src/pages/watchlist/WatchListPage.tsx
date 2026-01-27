import { useAppSelector } from "../../app/hooks";
import WatchList from "./WatchList";

export default function WatchListPage() {
  const watchlist = useAppSelector((state) => state.watchlist);

  return (
    <ul className= "grid grid-cols-1 auto-rows-[220px] p-4 gap-4 mb-8">
      {watchlist.ids.map((id) => (
        <li key={id} >
          <WatchList watchlist={watchlist.map[id.toString()]} />
        </li>
      ))}
    </ul>
  );
}
