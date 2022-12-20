import { AiFillHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { MdDownload } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const BottomBar = () => {
  const userState = useSelector((state: RootState) => state.user);

  return (
    <ul className="z-50 fixed flex lg:hidden justify-between font-semibold items-center text-3xl px-8 md:px-12 py-3 bottom-0 left-0 bg-[#232635] w-full border-t-[1px] border-t-slate-700">
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "text-white" : "text-gray-400"
          }
        >
          <AiFillHome />
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/search"}
          className={({ isActive }) =>
            isActive ? "text-white" : "text-gray-400"
          }
        >
          <BiSearch />
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/list"}
          className={({ isActive }) =>
            isActive ? "text-white" : "text-gray-400"
          }
        >
          <MdDownload />
        </NavLink>
      </li>
      <li className="relative w-9 h-8">
        <NavLink
          to={"/profile"}
          className={({ isActive }) =>
            isActive
              ? "absolute border-[2px] border-white top-0 rounded-full"
              : "border-[2px] border-gray-500 absolute top-0 rounded-full"
          }
        >
          <img src={userState.image} className="w-8 h-8 rounded-full"></img>
        </NavLink>
      </li>
    </ul>
  );
};

export default BottomBar;
