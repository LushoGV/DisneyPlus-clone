import { useLocation } from "react-router-dom";
import Grid from "../components/Grid";

const CategoryPage = () => {
  const { pathname } = useLocation();

  return (
    <>
      <header className="px-4 lg:pb-6 lg:px-20 lg:pt-[78px] top-0 flex justify-between lg:justify-start fixed z-10 bg-[#1a1d29] w-full">
        <h1 className="text-4xl font-semibold mr-6 pt-6 pb-5 first-letter:uppercase">
          {pathname.substring(1, pathname.length)}
        </h1>
        <div className="flex items-center pt-4 pb-3">
          <span>Featured</span>
        </div>
      </header>
      <div className="bg-[#1a1d29] w-full absolute top-0 h-full"></div>
      <section className="px-4 lg:px-20 mt-[120px]">
        <Grid />
      </section>
    </>
  );
};

export default CategoryPage;
