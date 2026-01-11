import App from "../App";
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
      }
    ]
  },
];


export default routes