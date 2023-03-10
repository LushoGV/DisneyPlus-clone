import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdDownload } from "react-icons/md";
import moviesData from "../api/movies.json";
import MovieCard from "../components/MovieCard";
import { IMovie } from "../interfaces";
import type { RootState } from "../app/store";

const ListPage = () => {
  const [list, setList] = useState<IMovie[] | undefined>();
  const userState = useSelector((state: RootState) => state.user);

  const loadData = () => {
    setList(
      userState.cart
        .map((element) => {
          return moviesData.filter((item) => item.id === element);
        })
        .flat()
    );
  };

  useEffect(() => {
    document.title = "Watchlist | Disney+ Clone"
    setList([]);
    loadData();
  }, [userState.cart]);

  if (list && !list.length)
    return (
      <>
        <header className="p-4">
          <h1 className="font-semibold text-lg lg:hidden">Downloads</h1>
        </header>
        <section className="w-full flex justify-center px-4 min-h-[80vh] lg:min-h-0">
          <div className="text-center mt-20 xl:mt-28 m-auto mb-2 flex flex-col items-center">
            <div className="w-[120px] h-[120px] border-4 border-[#4e515e] flex items-center rounded-full lg:hidden">
              <MdDownload className="text-[#4e515e] text-7xl m-auto" />
            </div>
            <img
              className="m-auto mb-2 hidden lg:block"
              src="https://static-assets.bamgrid.com/product/disneyplus/images/empty-watchlist-icon.4b3acd54b63178bd38f31ea3b9d6526d.svg"
              alt=""
            />
            <h2 className="py-4 font-semibold text-2xl hidden lg:block">
              Your watchlist is empty
            </h2>
            <h2 className="pt-4 py-3 font-semibold text-lg lg:hidden">
              You have no downloads
            </h2>
            <span className="hidden lg:block">
              Content you add to your watchlist will appear here.
            </span>
            <span className="lg:hidden text-sm">
              Movies and series you download will appear here.
            </span>
          </div>
        </section>
      </>
    );

  return (
    <>
      <header className="p-4 lg:px-20">
        <h1 className="font-semibold text-lg lg:hidden">Downloads</h1>
        <h1 className="font-semibold text-4xl hidden lg:block pb-2">
          Watchlist
        </h1>
      </header>
      <section className="w-full px-4 min-h-[80vh] lg:px-20 pb-20 lg:min-h-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {list &&
          list.flat().map((element, index) => (
            <div key={index}>
              <MovieCard
                type="grid"
                id={element.id}
                typeLink={element.first_air_date ? "tv" : "movie"}
                imageLG={element.backdrop_path}
                imageMobile={element.poster_path}
                company={element.company}
              />
            </div>
          ))}
      </section>
    </>
  );
};

export default ListPage;
