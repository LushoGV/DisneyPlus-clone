import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Grid from "../components/Grid";
import { ILocalMovies } from "../interfaces";
import movies from "../api/movies.json";

const SearchPage = () => {
  const [inputContent, setInputContent] = useState<string>();
  const [defaultData, setDefaultData] = useState<ILocalMovies[] | undefined>();
  const [data, setData] = useState<ILocalMovies[] | undefined>();

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setData([]);
    setInputContent(target.value);
    if (target.value.length > 0) searchData(target.value);
    else setData(defaultData);
  };

  const searchData = async (query: String) => {
    setData([]);
    let dataFiltered = movies.filter((element) =>
      element.title?.toLocaleLowerCase().startsWith(query.toLocaleLowerCase())
    );
    if (!dataFiltered.length)
      dataFiltered = movies.filter(
        (element) =>
          element.title
            ?.toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()) ||
          element.overview
            ?.toLocaleLowerCase()
            .includes(query.toLocaleLowerCase())
      );
    
    setTimeout(() => {
      setData(dataFiltered.slice(0, 32));
    },1000)
    
  };

  useEffect(() => {
    setData(movies.slice(0, 32));
    setDefaultData(movies.slice(0, 32));
  }, []);

  return (
    <>
      <header className="relative pt-[2px]">
        <div className="lg:w-full flex bg-white lg:bg-[#4b4e5a] lg:h-[100px] pl-4 lg:pl-[70px] pr-4 lg:pr-6 lg:fixed lg:top-[72px] z-10 mx-4 my-4 lg:m-0 transition-all duration-[0.3s] focus-within:lg:bg-[#626676]">
          <input
            type="text"
            className="ml-0 m-auto lg:text-5xl bg-transparent h-auto outline-0 py-3 lg:py-0 w-full transition-all text-[#a8a9ad] placeholder:text-[#a8a9ad] focus:lg:text-[#f9f9f9] focus:placeholder:lg:text-[#f9f9f9] placeholder:transition-all placeholder:duration-[0.3s]"
            placeholder="Search by title, character, or genre"
            onChange={handleChange}
            value={inputContent || ''}
            onBlur={() => !inputContent && setData(defaultData)}
          />
          <button
            className={`${
              inputContent ? "block" : "hidden"
            } text-gray-800 lg:text-white animation-opacity transition-all duration-[0.3s]`}
            onClick={() => setInputContent("")}
          >
            <IoCloseOutline className="text-3xl lg:text-5xl " />
          </button>
        </div>
      </header>
      <section className="py-4 lg:px-20 flex lg:hidden">
        <div className="mx-3 w-full bg-gray-900 rounded-md flex">
          <Link
            to={"/originals"}
            className="w-full h-full flex flex-col justify-center items-center"
          >
            <AiFillStar className="text-2xl mb-1" />
            <span className="text-[#888888]">Originals</span>
          </Link>
        </div>
        <div className="w-full bg-gray-900 rounded-md flex py-5">
          <Link
            to={"/movies"}
            className="w-full h-full flex flex-col justify-center items-center"
          >
            <img src="./movie-icon.svg" className="w-[32px] h-[32px] mb-1" />
            <span className="text-[#797979]">Movies</span>
          </Link>
        </div>
        <div className="mx-3 w-full bg-gray-900 rounded-md flex">
          <Link
            to={"/series"}
            className="w-full h-full flex flex-col justify-center items-center"
          >
            <img src="../series-icon.svg" className="w-[32px] h-[32px] mb-1" />
            <span className="text-[#888888]">Series</span>
          </Link>
        </div>
      </section>
      <section className="lg:mt-[145px] px-4 lg:px-20">
        <h2
          className={`mb-5 text-xl font-semibold ${
            inputContent !== "" ? "hidden" : "block"
          }`}
        >
          Explore
        </h2>
        {data && <Grid content={data} />}
      </section>
    </>
  );
};

export default SearchPage;
