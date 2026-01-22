import App from "../App";
import SignUp from "../pages/auth/SignUp";
import Home from "../pages/home/Home";
import MovieDetails from "../pages/movie/MovieDetailsPage";

const routes = [
  {
    path: "/",
    element: <App/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:":category",
        element:<Home/>
      },{
        path:"movie/:movieid",
        element:<MovieDetails/>
      },
      {
        path:"signup",
        element:<SignUp/>
      }
    ]
  },
];


export default routes