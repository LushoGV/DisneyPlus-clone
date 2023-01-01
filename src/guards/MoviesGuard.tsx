import { Navigate, Outlet, useParams } from "react-router-dom";
import { companiesCodes, companiesNames } from "../api/companies";
import { useEffect } from "react";

interface Props {
  type: string;
}

export const MoviesGuard = ({ type }: Props) => {
  const { company } = useParams();

  if (
    company !== undefined &&
    !(type === "movie" ? companiesCodes : companiesNames).includes(company)
  )
    return <Navigate replace to={"/"} />;

  return <Outlet />;
};
