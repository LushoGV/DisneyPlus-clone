import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import Profile from "../pages/profile/Profile";
import Layout from "../layout/Layout";
import ProfileLayout from "../layout/ProfileLayout";
import Avatars from "../pages/profile/Avatars";
import CategoryPage from "../pages/CategoryPage";
import CompaniesPage from "../pages/CompaniesPage";
import HomePage from "../pages/HomePage";
import ListPage from "../pages/ListPage";
import OriginalsPage from "../pages/OriginalsPage";
import SearchPage from "../pages/SearchPage";
import { UserProvider } from "../context/userContext";
import MoviePage from "../pages/MoviePage";
import AuthLayout from "../layout/AuthLayout";
import AuthForm from "../pages/auth/AuthForm";
import AuthGuard from "../guards/AuthGuard";
import Trailer from "../components/Trailer";
import { AuthHomePage } from "../pages/auth/AuthHomePage";
import { MoviesGuard } from "../guards/MoviesGuard";

const router = createBrowserRouter([
  {
    path: "/auth",
    children: [
      {
        index: true,
        element: <AuthHomePage />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/auth/:section",
            element: <AuthForm />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <AuthGuard />,
    errorElement: <Navigate to={"/"} />,
    children: [
      {
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
            element: <MoviesGuard type={"companies"}/>,
            children: [
              {
                index: true,
                element: <CompaniesPage />,
              },
            ],
          },
          {
            path: "/:type/:id&:company",
            element: <MoviesGuard type={"movie"}/>,
            children: [
              {
                index: true,
                element: <MoviePage />,
              },
            ],
          },
        ],
      },
      {
        path: "/trailer/:id/:trailer/:type&:company",
        element: <Trailer />,
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
    ],
  },
] as RouteObject[]);

export default router;
