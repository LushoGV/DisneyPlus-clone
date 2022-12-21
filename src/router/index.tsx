import { createBrowserRouter, RouteObject } from "react-router-dom";
import Profile from "../pages/Profile";
import Layout from "../layout/Layout";
import ProfileLayout from "../layout/ProfileLayout";
import Avatars from "../pages/Avatars";
import CategoryPage from "../pages/CategoryPage";
import CompaniesPage from "../pages/CompaniesPage";
import HomePage from "../pages/HomePage";
import ListPage from "../pages/ListPage";
import OriginalsPage from "../pages/OriginalsPage";
import SearchPage from "../pages/SearchPage";
import { UserProvider } from "../context/userContext";
import MoviePage from "../pages/MoviePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/originals",
        element: <OriginalsPage />,
      },
      {
        path: "/movies",
        element: <CategoryPage />,
      },
      {
        path: "/series",
        element: <CategoryPage />,
      },
      {
        path: "/list",
        element: <ListPage />,
      },
      {
        path: "/brand/:company",
        element: <CompaniesPage />,
      },
      {
        path: "/:type/:id",
        element: <MoviePage />,
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <UserProvider>
        <ProfileLayout />
      </UserProvider>
    ),
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile/select-avatar",
        element: <Avatars />,
      },
    ],
  },
] as RouteObject[]);

export default router;
