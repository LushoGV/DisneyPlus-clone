import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import Footer from "../components/Footer";
import { auth, provider } from "../database/firebase";

const AuthLayout = () => {
  const [stepAuth, setStepAuth] = useState<number>(1);
  const handleAuth = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };

  return (
    <>
      <nav className="w-full bg-[#1a1d29] border-b-[1px] px-4 lg:px-10 pt-3 pb-3 border-[#f9f9f94d]">
          <img
            src="https://static-assets.bamgrid.com/product/disneyplus/images/logo.1a56f51c764022ee769c91d894d44326.svg"
            className="w-[79px] h-[48px] text-base"
            alt=""
          />
      </nav>
      <main className="w-full flex bg-[#1a1d29] px-8 lg:px-20 min-h-[70vh]">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default AuthLayout;
