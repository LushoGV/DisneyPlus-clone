import { Link } from "react-router-dom";
import {useEffect} from 'react'
import Footer from "../../components/Footer";

export const AuthHomePage = () => {

  useEffect(()=>{
    document.title = "Disney+ Clone | The Best Stories in One Place"
  },[])

  return (
    <>
      <div className="flex flex-col items-stretch bg-[#040814] pb-10 overflow-x-hidden">
        <header className="fixed top-0 left-0 z-30 flex w-full px-5 lg:px-0 lg:bg-[#040814]">
            <div className="relative ml-6 mr-auto mt-1 hidden lg:block">
            <img
            src="https://static-assets.bamgrid.com/product/disneyplus/images/logo.1a56f51c764022ee769c91d894d44326.svg"
            className="w-[79px] h-[48px]"
            alt=""
          />
          <span className="absolute top-[36px] left-6 text-[10px] font-disney">Clone</span>
            </div>
          
          <Link
            to={"/auth/signUp"}
            className="hidden lg:block uppercase my-3 mr-4 px-6 py-3 bg-[#0063e5] border-[1px] border-[#0063e5] rounded-[4px] hover:bg-[#147aff] transition-all duration-[400ms] transform"
          >
            sign up now
          </Link>
          <Link
            to={"/auth/login"}
            className="hidden lg:block uppercase my-3 mr-8 px-6 py-3 bg-black bg-opacity-80 border-[1px] border-white rounded-[4px] hover:text-black hover:bg-white hover:bg-opacity-100 transition-all duration-[400ms] transform"
          >
            log in
          </Link>
        </header>

        <section className="relative flex min-h-[75vh] lg:h-screen xs:mb-0 sm:mb-20 lg:mb-0 lg:pb-20">
          <div className="relative overflow-hidden flex w-full ">
            <picture>
              <source
                media="(max-width: 1022px)"
                srcSet="https://cnbl-cdn.bamgrid.com/assets/b19a3f859be0f202bf3f87228aee3f4b3f9a099c8af2cf87b8456f6e0c3d4b75/original"
              ></source>
              <img
                src="https://cnbl-cdn.bamgrid.com/assets/17bd102c2cc8d0312a874c7281f913edb0fe5b8a08fa7f1d6bb57c5a2efcb20b/original"
                alt=""
                className="w-full absolute"
              />
            </picture>
          </div>
          <section className="absolute w-full pt-20 lg:pl-10 flex">
            <div className="w-full px-7 lg:w-[45%] mt-[45%] sm:mt-[45%] lg:mt-[5%] flex flex-col items-center">
              <div className="relative">
              <img
                src="https://cnbl-cdn.bamgrid.com/assets/7ecc8bcb60ad77193058d63e321bd21cbac2fc67281dbd9927676ea4a4c83594/original"
                alt=""
                className="w-[180px] lg:w-[320px]"
              />
              <span className="absolute top-20 left-16 lg:top-auto lg:bottom-0 lg:left-36 text-lg font-disney">Clone</span>
              </div>
             
              <span className="my-5 font-bold text-sm sm:text-lg lg:text-xl">
                Enjoy the greatest stories, all in one place.{" "}
              </span>
              <img  src="https://cnbl-cdn.bamgrid.com/assets/6d0514420af1aa17883ea433aeab05eeefb1ea60fdc9185c2c182d0c92273435/original" className="h-16 mt-6 hidden lg:block" />
              <Link
                to="/auth/signUp"
                className="bg-[#6421ff] hover:bg-[#7828ff] uppercase py-[14px] w-full max-w-[360px] rounded-[4px] mt-[10%] md:mt-2 text-center transition-all duration-[400ms] transform"
              >
                Sign up now
              </Link>
              <Link
                to={"/auth/login"}
                className="lg:hidden mt-2 uppercase py-[14px] w-full max-w-[360px] rounded-[4px] text-center transition-all duration-[400ms] transform bg-[#1f1f1f]"
              >
                Log In
              </Link>
            </div>
          </section>
        </section>

        <section className="flex flex-col lg:flex-row bg-[#040814] py-20 px-8 lg:p-20 text-center lg:text-left">
          <div className="flex-[0_0_50%]">
            <img
              src="https://cnbl-cdn.bamgrid.com/assets/f09e9344c17a11eb6aaa054704cdb169ec8c2f9a661a5119994c632c47d72dd1/original"
              alt="w-full"
            />
          </div>
          <div className="flex flex-col justify-center pt-8 lg:pl-4 flex-[0_0_50%]">
            <h2 className="font-bold text-xl lg:text-3xl mb-4 lg:mb-5">
              Watch the way you want
            </h2>
            <p className="text-sm lg:text-xl text-[#c0c0c0]">
              Enjoy the big screen experience on your TV, or watch on your
              tablet, laptop, phone and more. You can watch an ever-growing
              selection of titles in 4K. Plus, you can stream on 4 screens at
              once, so everyone’s happy.
            </p>
          </div>
        </section>

        <section className="flex flex-col lg:flex-row bg-[#040814] py-20 px-8 lg:p-20 text-center lg:text-left relative">
          <picture className="flex">
            <source
              media="(max-width: 1022px)"
              srcSet="https://cnbl-cdn.bamgrid.com/assets/05eaa634ed3345fe39a45aa9e2effddb64ab990b8eeba3c48e59f3d02f9878df/original"
            ></source>
            <img
              src="https://cnbl-cdn.bamgrid.com/assets/bfba981dd774075133f01cb897c280e3616d573e1743f558b417cff2e8b349c0/original"
              alt=""
              className="w-full"
            />
          </picture>
          <div className="relative lg:absolute lg:w-[50%] lg:top-[20%] bottom-[20%] lg:right-[5%] flex items-center lg:pl-0 lg:p-20">
            <div className="flex flex-col justify-center pt-8 lg:pl-4 w-full">
              <h2 className="font-bold text-xl lg:text-3xl mb-4 lg:mb-5">
                Download any series or movie
              </h2>
              <p className="text-sm lg:text-xl text-[#c0c0c0]">
                Download whatever you want and watch whenever you want. Your
                favorites will always stay with you, even if your Wi-Fi won’t.
              </p>
            </div>
          </div>
        </section>

        <Footer activeMobile />
      </div>
    </>
  );
};
