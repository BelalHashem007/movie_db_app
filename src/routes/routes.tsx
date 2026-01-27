import App from "../App";
import Login from "../pages/auth/LogIn";
import SignUp from "../pages/auth/SignUp";
import Home from "../pages/home/Home";
import MovieDetails from "../pages/movie/MovieDetailsPage";
import WatchListPage from "../pages/watchlist/WatchListPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ":category",
        element: <Home />,
      },
      {
        path: "movie/:movieid",
        element: <MovieDetails />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      { path: "watchlist", element: <WatchListPage /> },
    ],
  },
];

export default routes;
