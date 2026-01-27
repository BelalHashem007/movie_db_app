import Header from "./components/Header";
import {
  initializeToken,
  selectCurrentUser,
} from "./app/authSlice/authSlice.ts";
import { useAppDispatch, useAppSelector } from "./app/hooks.ts";
import { initializeWatchListState } from "./app/watchListSlice/watchListSlice.ts";
import { useEffect } from "react";
import Footer from "./components/Footer.tsx";
import { Outlet } from "react-router";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { Toaster,toast } from "react-hot-toast";
import { getAllWatchlistMovieId } from "./supabase/db.ts";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  //get token
  useEffect(() => {
    dispatch(initializeToken());
  }, [dispatch]);

  //get watchlist
  useEffect(() => {
    const setWatchlist = async () => {
      if (user) {
        const { data, error } = await getAllWatchlistMovieId(user.id);
        if (data && !error) dispatch(initializeWatchListState(data));
        else if (error) toast.error("Failed to fetch watchlist items");
      }
    };
    setWatchlist();
  });

  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: "var(--bg-toaster)",
            color: "var(--color-toaster)",
          },
        }}
      />
    </>
  );
}

export default App;
