import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const AuthLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <nav className="w-full flex justify-between items-center bg-[#1a1d29] border-b-[1px] px-4 lg:px-10 pt-2 pb-3 border-[#f9f9f94d]">
        <div className="relative">
          <img
            src="https://static-assets.bamgrid.com/product/disneyplus/images/logo.1a56f51c764022ee769c91d894d44326.svg"
            className="w-[79px] h-[48px]"
            alt=""
          />
          <span className="absolute top-[36px] left-6 text-[10px] font-disney">
            Clone
          </span>
        </div>
        {!pathname.includes("login") && (
          <Link to={"/auth/login"} className="font-semibold cursor-pointer mt-1">
            Log In
          </Link>
        )}
      </nav>
      <main className="w-full flex bg-[#1a1d29] px-8 lg:px-20 min-h-[70vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AuthLayout;
