import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import { auth } from "../database/firebase";
import { addInitialData } from "../features/user/userSlice";
import { getUser } from "../utils/FirebaseFunctions";

const AuthGuard = () => {
  const [userAuth, setUserAuth] = useState<string>();
  const dispatch = useDispatch();

  const saveUser = async (id: string) => {
    const resUser = await getUser(id);
    resUser &&
      dispatch(
        addInitialData({
          id: resUser.id,
          cart: resUser.cart,
          profile: {
            name: resUser.profile ? resUser.profile.name : resUser.name,
            image: resUser.profile ? resUser.profile.image : resUser.image,
          },
        })
      );
    setUserAuth("authorized");
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      saveUser(user.uid);
    } else {
      setUserAuth("unauthorized");
    }
  });

  if (userAuth === "unauthorized") return <Navigate to={"/auth"} />;

  if (userAuth === "authorized") return <Outlet />;

  return <Loader type="principal" />;
};

export default AuthGuard;
