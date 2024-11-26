import { Navigate, useRoutes } from "react-router-dom";
import { Login } from "./pages/login";
import Page404 from "./components/Page404";
// import  Dashboard  from "./pages/Dashboard/Dashboard";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      children: [
        { path: "/", element: <Login /> },
      ],
    },
    {
      path: "/",
      children: [{ path: "404", element: <Page404 /> }],
    },

    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
