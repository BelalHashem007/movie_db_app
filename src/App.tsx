import Header from "./components/Header";
import Home from "./pages/home/Home";
import { initializeToken } from "./app/authSlice/authSlice.ts";
import { useAppDispatch,useAppSelector } from "./app/hooks.ts";
import { useEffect } from "react";
import { useGetAuthenticationQuery } from "./app/apiSlice.ts";

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
      <main>
        <Home />
      </main>
    </>
  );
}

export default App;
