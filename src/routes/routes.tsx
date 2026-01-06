import App from "../App";
import Home from "../pages/home/Home";

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
      }
    ]
  },
];


export default routes