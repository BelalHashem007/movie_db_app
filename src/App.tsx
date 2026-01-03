import Header from "./components/Header";
import Home from "./pages/home/Home";
import { initializeToken } from './app/authSlice/authSlice.ts'
import { useAppDispatch } from './app/hooks.ts'
function App() {
  const dispatch = useAppDispatch();
  dispatch(initializeToken())
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
