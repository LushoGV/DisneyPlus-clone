import { useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { updateUserData } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useUserContext } from "../context/userContext";
import { updateUser } from "../utils/FirebaseFunctions";
import BottomBar from "../components/BottomBar";
import type { RootState } from "../app/store";

const ProfileLayout = () => {
  const userState = useSelector((state: RootState) => state.user);
  const { pathname } = useLocation();
  const { newUserData, setNewUserData, error } = useUserContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveData = async () => {
    if (!error) {
      dispatch(updateUserData(newUserData));
      await updateUser(newUserData.id, newUserData);
      navigate(pathname.includes("select-avatar") ? "/profile" : "/");
    }
  };

  useEffect(() => {
    document.title = "Edit Profile | Disney+ Clone"
    setNewUserData(userState);
  }, []);

  return (
    <>
      <header className="flex w-full px-4 lg:px-9 py-3 fixed lg:relative z-50 bg-[#1a1d29] shadow-xl lg:shadow-none">
        <h1 className="font-semibold text-xl lg:hidden  m-auto ml-0">
          {pathname.includes("select-avatar")
            ? "Choose avatar"
            : "Edit profile"}
        </h1>
        <Link to={"/"} className="m-auto ml-0">
          <img
            src="https://static-assets.bamgrid.com/product/disneyplus/images/logo.1a56f51c764022ee769c91d894d44326.svg"
            className="w-[79px] h-[48px]  hidden lg:block"
            alt=""
          />
        </Link>
        <button
          className="lg:uppercase lg:bg-[#40424a] rounded-md text-sm lg:text-base font-semibold lg:py-4 lg:px-7 disabled:bg-opacity-50 hover:bg-[#4f515a] transition-all duration-[400ms] transform"
          disabled={error || newUserData.profile.name === ""}
          onClick={saveData}
        >
          {pathname.includes("select-avatar") ? "Cancel" : "Done"}
        </button>
      </header>
      <main className="mt-[56px] lg:mt-0 bg-[#1a1d29] w-full relative after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1] min-h-screen lg:min-h-[75vh]">
        <Outlet />
      </main>
      <BottomBar />
    </>
  );
};

export default ProfileLayout;
