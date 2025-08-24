import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import { HelloPage } from "./pages/hello";
import { CatalogPage } from "./pages/catalog";
import { FavoritesPage } from "./pages/favorites";
import { ProductPage } from "./pages/catalog/[id]";
import { TryOnPage } from "./pages/try-on";

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
      {
        path: "/catalog/:id",
        element: <ProductPage />,
      },
      {
        path: "/catalog/:id/try-on",
        element: <TryOnPage />,
      },
    ],
  },
]);
