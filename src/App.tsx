import Header from "./components/Header";
import {
  selectCurrentUserId,
} from "./app/authSlice/authSlice.ts";
import { useAppSelector } from "./app/hooks.ts";
import Footer from "./components/Footer.tsx";
import { Outlet } from "react-router";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { Toaster } from "react-hot-toast";
import { useGetAllWatchlistQuery } from "./app/apiSlice.ts";
import { skipToken } from "@reduxjs/toolkit/query";

function App() {
  const userId = useAppSelector(selectCurrentUserId);
  //get watchlist if user is logged in
  useGetAllWatchlistQuery(userId ?? skipToken);

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
