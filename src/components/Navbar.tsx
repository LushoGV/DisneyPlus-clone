import { useState } from "react";
import { AiFillHome, AiFillStar } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../app/store";
import { signOut } from "firebase/auth";
import { auth } from "../database/firebase";
import { useSelector } from "react-redux";
import "../styles/Profile.css";

const Navbar = () => {
  const [changeBackground, setChangeBackground] = useState<boolean>(false);
  const userState = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 30) {
      setChangeBackground(true);
    } else {
      setChangeBackground(false);
    }
  });

  const logOut = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  return (
    <header className="hidden lg:block  w-full fixed top-0 z-50">
      <nav
        className={`hidden lg:flex items-center h-[72px] ${
          changeBackground ? "bg-[#0e0b14]" : "bg-transparent"
        } after:inset-0 after:h-[170px] after:top-0 after:left-0 after:right-0 after:absolute after:z-[-1] after:bg-nav after:pointer-events-none transition-all duration-[400ms] transform`}
      >
        <ul className="flex items-center m-auto mt-1 ml-0 pl-9 relative">
          <li className="pr-9">
            <Link to={"/"}>
              <div className="relative">
                <img
                  src="https://static-assets.bamgrid.com/product/disneyplus/images/logo.1a56f51c764022ee769c91d894d44326.svg"
                  className="w-[79px] h-[48px]"
                  alt=""
                />
                <span className="absolute top-[36px] left-6 text-[11px] font-disney">
                  Clone
                </span>
              </div>
            </Link>
          </li>
          <li className="link">
            <Link
              to={"/"}
              className="py-4 px-[18px] flex items-center leading-[1.07px] text-[13px] tracking-[1.42px] prueba"
            >
              <AiFillHome className="mr-3 text-base" />
              <span>home</span>
            </Link>
          </li>
          <li className="link">
            <Link
              to={"/search"}
              className="py-4 px-[18px] flex items-center leading-[1.07px] text-[13px] tracking-[1.42px]"
            >
              <BiSearch className="mr-3 text-lg" />
              <span>search</span>
            </Link>
          </li>
          <li className="link">
            <Link
              to={"/list"}
              className="py-4 px-[18px] flex items-center leading-[1.07px] text-[13px] tracking-[1.42px]"
            >
              <MdAdd className="mr-[11px] text-xl" />
              <span>watchlist</span>
            </Link>
          </li>
          <li className="link">
            <Link
              to={"/originals"}
              className="py-4 px-[18px] flex items-center leading-[1.07px] text-[13px] tracking-[1.42px]"
            >
              <AiFillStar className="mr-3 text-base" />
              <span>originals</span>
            </Link>
          </li>
          <li className="link">
            <Link
              to={"/movies"}
              className="py-4 px-[18px] flex items-center leading-[1.07px] text-[13px] tracking-[1.42px]"
            >
              <img
                src="../movie-icon.svg"
                className="w-[24px] h-[20px] mr-[10px]"
              />
              <span>movies</span>
            </Link>
          </li>
          <li className="link">
            <Link
              to={"/series"}
              className="py-4 px-[18px] flex items-center leading-[1.07px] text-[13px] tracking-[1.42px]"
            >
              <img
                src="../series-icon.svg"
                className="w-[24px] h-[20px] mr-[8px]"
              />
              <span>series</span>
            </Link>
          </li>
        </ul>
        <div className="profile px-4 flex items-center relative pr-5 text-[15px]">
          <header className="flex items-center z-10">
            <span className="hidden xl:block absolute w-[100px] right-8 title cursor-pointer mr-12 max-w-[70px] max-h-[20px] overflow-hidden text-ellipsis text-right">
              {userState.profile.name}
            </span>
            <img
              src={userState.profile.image}
              className="w-12 h-12 rounded-full cursor-pointer"
            ></img>
          </header>
          <div className="profile-active shadow-md">
            <header className="flex items-center mt-[85px] border-t-[1px] border-[#97979757] pr-4 w-full">
              <ul className="mt-6">
                <li className="my-[18px] text-[#b9b9b9] font-medium hover:text-white cursor-pointer">
                  <Link to={"/profile"}>Edit Profile</Link>
                </li>
                <li
                  className="my-[18px] text-[#cacaca] font-medium hover:text-white cursor-pointer"
                  onClick={logOut}
                >
                  Log Out
                </li>
              </ul>
            </header>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
