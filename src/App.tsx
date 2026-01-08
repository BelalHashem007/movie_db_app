import Header from "./components/Header";
import { initializeToken } from "./app/authSlice/authSlice.ts";
import { useAppDispatch,useAppSelector } from "./app/hooks.ts";
import { useEffect } from "react";
import { useGetAuthenticationQuery } from "./app/apiSlice.ts";
import Footer from "./components/Footer.tsx";
import { Outlet } from "react-router";

function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state)=> state.auth.token)
  useGetAuthenticationQuery(undefined,{skip: !token});

  useEffect(() => {
    dispatch(initializeToken());
  }, [dispatch]);


  return (
    <>
      <Header />
      
      <main className="grow">
        <Outlet/>
      </main>
      <Footer/>
      </>
  );
}

export default App;
