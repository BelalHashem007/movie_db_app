import Header from "./components/Header";
import {
  initializeToken,
  selectCurrentUser,
} from "./app/authSlice/authSlice.ts";
import { useAppDispatch, useAppSelector } from "./app/hooks.ts";
import { useEffect } from "react";
import Footer from "./components/Footer.tsx";
import { Outlet } from "react-router";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { Toaster } from "react-hot-toast";
import { useGetAllWatchlistQuery } from "./app/apiSlice.ts";
import { skipToken } from "@reduxjs/toolkit/query";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  useGetAllWatchlistQuery(user?.id ?? skipToken);
  //get token
  useEffect(() => {
    dispatch(initializeToken());
  }, [dispatch]);

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
