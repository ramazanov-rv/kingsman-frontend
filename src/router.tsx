import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import { HelloPage } from "./pages/hello";
import { CatalogPage } from "./pages/catalog";
import { FavoritesPage } from "./pages/favorites";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HelloPage />,
      },
      {
        path: "/catalog",
        element: <CatalogPage />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
    ],
  },
]);
