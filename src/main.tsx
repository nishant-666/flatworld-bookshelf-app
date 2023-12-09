import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./pages/Admin";
import ShowAdmin from "./pages/ShowAdmin";
import ShowBook from "./pages/ShowBook";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Admin />,
  },
  {
    path: "/show-admin",
    element: <ShowAdmin />,
  },
  {
    path: "/show-book",
    element: <ShowBook />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
