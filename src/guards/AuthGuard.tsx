import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../database/firebase";

const AuthGuard = () => {
  const [isAuth, setIsAuth] = useState<number>(0);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAuth(2);
    } else {
      setIsAuth(1);
    }
  });

  if (isAuth === 1) return <Navigate to={"/auth/login"} />;

  if (isAuth === 2) return <Outlet />;

  return <h1>Loading...</h1>;
};

export default AuthGuard;
