import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import { auth } from "../database/firebase";
import { addInitialData } from "../features/user/userSlice";
import { getUser } from "../utils/FirebaseFunctions";

const AuthGuard = () => {
  const [isAuth, setIsAuth] = useState<number>(0);
  const dispatch = useDispatch();

  const saveUser = async (id: string) => {
    const resUser = await getUser(id);
    resUser &&
      dispatch(
        addInitialData({
          id: resUser.id,
          cart: resUser.cart,
          profile: { name: resUser.profile.name, image: resUser.profile.image },
        })
      );
    setIsAuth(2);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      saveUser(user.uid);
    } else {
      setIsAuth(1);
    }
  });

  if (isAuth === 1) return <Navigate to={"/auth"} />;

  if (isAuth === 2) return <Outlet />;

  return <Loader/>;
};

export default AuthGuard;
