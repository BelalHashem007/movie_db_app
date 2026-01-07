import Header from "./components/Header";
import Home from "./pages/home/Home";
import { initializeToken } from "./app/authSlice/authSlice.ts";
import { useAppDispatch,useAppSelector } from "./app/hooks.ts";
import { useEffect } from "react";
import { useGetAuthenticationQuery } from "./app/apiSlice.ts";
import Footer from "./components/Footer.tsx";

function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state)=> state.auth.token)
  useGetAuthenticationQuery(undefined,{skip: !token});

  useEffect(() => {
    dispatch(initializeToken());
  }, [dispatch]);


  return (
    <div className="dark:text-white dark:bg-black">
      <Header />
      
      <main className="">
        <Home />
      </main>
      <Footer/>
    </div>
  );
}

export default App;
