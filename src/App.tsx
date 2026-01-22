import Header from "./components/Header";
import { initializeToken } from "./app/authSlice/authSlice.ts";
import { useAppDispatch } from "./app/hooks.ts";
import { useEffect } from "react";
import Footer from "./components/Footer.tsx";
import { Outlet } from "react-router";
import ScrollToTop from "./components/ScrollToTop.tsx";

function App() {
  const dispatch = useAppDispatch();

  //get token
  useEffect(() => {
    dispatch(initializeToken());
  }, [dispatch]);

 
  return (
    <>
        <ScrollToTop/>
          <Header />

          <main className="grow">
            <Outlet />
          </main>
          <Footer />
    </>
  );
}

export default App;
