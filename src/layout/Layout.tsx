import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import BottomBar from "../components/BottomBar";

const Layout = () => {
  const getData = async () => {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/774752?api_key=779b195bed29319f74d486e3c7b2af1e"
    );
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <main
        className={` w-full lg:py-20 relative after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1] min-h-full lg:min-h-[75vh] pb-10`}
      >
        <Outlet />
      </main>
      <Footer />
      <BottomBar />
    </>
  );
};

export default Layout;
