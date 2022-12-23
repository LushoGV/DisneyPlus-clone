import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Grid from "../components/Grid";
import movies from "../api/movies.json";
import { ILocalMovies } from "../interfaces";
import { RiArrowDownSLine } from "react-icons/ri";

interface sortOptions {
  title: string;
  code: number | number[];
}

const CategoryPage = () => {
  const [data, setData] = useState<ILocalMovies[]>();
  const [dropbox, setDropbox] = useState<boolean>(false);
  const [optionSelected, setOptionSelected] = useState<sortOptions>({
    title: "Featured",
    code: 1,
  });
  const { pathname } = useLocation();
  const sortOptions = [
    { title: "Featured", code: 1 },
    { title: "All Movies A-Z", code: 2 },
    { title: "Action/Adventure", code: [28, 12] },
    { title: "Animation", code: 16 },
    { title: "Comedy", code: 35 },
    { title: "Drama", code: 18 },
  ];

  const sortData = (code: any) => {
    switch (code) {
      case 1:
        setTimeout(() => {
          setData(
            movies
              .filter((element) =>
                pathname.includes("movies")
                  ? !element.first_air_date
                  : element.first_air_date
              )
              .slice(0, 22)
              .sort((a, b) => {
                if (a.id > b.id) {
                  return 1;
                }
                if (a.id < b.id) {
                  return -1;
                }
                return 0;
              })
          );
        }, 500);
        return;

      case 2:
        setTimeout(() => {
          let dataSorted = movies.sort((a, b) => {
            if (
              (a.title && b.title && a.title > b.title) ||
              (a.name && b.name && a.name > b.name)
            ) {
              return 1;
            }
            if (
              (a.title && b.title && a.title < b.title) ||
              (a.name && b.name && a.name < b.name)
            ) {
              return -1;
            }
            return 0;
          });

          setData(
            dataSorted
              .filter((element) =>
                pathname.includes("movies")
                  ? !element.first_air_date
                  : element.first_air_date
              )
              .slice(0, 22)
          );
        }, 500);
        break;

      case 16:
        setTimeout(() => {
          setData(
            movies
              .filter((element) =>
                pathname.includes("movies")
                  ? !element.first_air_date && element.genre_ids.includes(code)
                  : element.first_air_date && element.genre_ids.includes(code)
              )
              .slice(0, 22)
          );
        }, 500);
        break;

      case 18:
        setTimeout(() => {
          setData(
            movies
              .filter((element) =>
                pathname.includes("movies")
                  ? !element.first_air_date && element.genre_ids.includes(code)
                  : element.first_air_date && element.genre_ids.includes(code)
              )
              .slice(0, 22)
          );
        }, 500);
        break;

      case 35:
        setTimeout(() => {
          setData(
            movies
              .filter((element) =>
                pathname.includes("movies")
                  ? !element.first_air_date && element.genre_ids.includes(code)
                  : element.first_air_date && element.genre_ids.includes(code)
              )
              .slice(0, 22)
          );
        }, 500);
        break;

      default:
        setTimeout(() => {
          setData(
            movies
              .filter((element) =>
                pathname.includes("movies")
                  ? (!element.first_air_date &&
                      element.genre_ids.includes(code[0])) ||
                    element.genre_ids.includes(code[1])
                  : (element.first_air_date &&
                      element.genre_ids.includes(code[0])) ||
                    element.genre_ids.includes(code[1])
              )
              .slice(0, 22)
          );
        }, 500);
        break;
    }
  };

  useEffect(() => {
    setData([]);
    sortData(1);
    setOptionSelected({
      title: "Featured",
      code: 1,
    });
  }, [pathname]);

  useEffect(() => {
    setData([]);
    sortData(optionSelected.code);
  }, [optionSelected]);

  return (
    <>
      <header className="px-4 lg:pb-6 lg:px-20 lg:pt-[78px] top-0 flex items-end justify-between lg:justify-start fixed z-10 bg-[#1a1d29] w-full">
        <h1 className="text-4xl font-semibold mr-6 pt-6 pb-5 first-letter:uppercase">
          {pathname.substring(1, pathname.length)}
        </h1>
        <div
          className="flex items-center justify-between pt-4 pb-3 relative bg-[#b6b6b633] h-[36px] mb-5 px-3 rounded-[18px] hover:bg-[#00000066] cursor-pointer transition-all duration-300 transform"
          onClick={() => setDropbox(!dropbox)}   
       >
          <span className="pl-[2px] pr-3 pb-[4px] text-sm">
            {optionSelected.title}
          </span>
          <RiArrowDownSLine className="text-2xl pb-[2px]" />
          {dropbox && (
            <div
              className="bg-[#131313] border-[1px] border-[#2a2a2a] absolute top-[45px] right-0 lg:left-[0px] lg:right-auto rounded-[5px]"  
            >
              <ul className="flex flex-col pt-4 pb-9 text-xs">
                {sortOptions.map((element, index) => (
                  <li
                    className={`py-[6px] hover:bg-[#2a2a2a] transition-all duration-300 transform px-[23px] relative uppercase ${
                      element.title === optionSelected.title &&
                      "font-semibold after:absolute after:top-[7px] after:left-[10px] after:inset-1 after:bg-white after:w-[2px] after:rounded-full after:h-3"
                    }`}
                    onClick={() => {
                      setOptionSelected(sortOptions[index]);
                      setTimeout(() => {
                        setDropbox(false);
                      }, 100);
                    }}
                    key={index}
                  >
                    {element.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>
      <div className="bg-[#1a1d29] w-full absolute top-0 h-full"></div>
      <section className="px-4 lg:px-20 mt-[120px]">
        {data && <Grid content={data} />}
      </section>
    </>
  );
};

export default CategoryPage;
