import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import routes from "./routes/routes.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Authentication from "./utility/Authentication.tsx";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Authentication>
        <RouterProvider router={router} />
      </Authentication>
    </Provider>
  </StrictMode>,
);
