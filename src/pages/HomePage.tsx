import SectionCard from "../components/SectionCard";
import Slider from "../components/Slider";
import sections from "../api/sections";
import MovieSlider from "../components/MovieSlider";
import { useState, useEffect } from "react";
import { IMovie } from "../interfaces";
import { bigSliderData } from "../api/bigSliderData";
import { filterData } from "../utils/Filter";

interface iData {
  title: string;
  content: IMovie[];
}

const HomePage = () => {
  const [data, setData] = useState<iData[]>();

  const getData = async () => {
    setData([
      {
        title: "New to Disney+",
        content: filterData({ filter: "featured" }),
      },
      {
        title: "Recommended For You",
        content: filterData({ filter: "popularity", companyCode: "2" }),
      },
      {
        title: "Action and Adventure",
        content: filterData({ filter: "action/adventure", companyCode: "2" }),
      },
      {
        title: "Series and Specials",
        content: filterData({ type: "tv" }),
      },
      {
        title: "Pixar Animation",
        content: filterData({ filter: "comedy", companyCode: "3" }),
      },
      {
        title: "Featured Marvel",
        content: filterData({ companyCode: "420" }),
      },
      {
        title: "Star Wars",
        content: filterData({ companyCode: "1" }),
      },
    ]);
  };

  useEffect(() => {
    document.title = "Disney+ Clone | Movies and Shows"
    getData();
  }, []);

  return (
    <>
      <nav className="lg:hidden flex pt-1">
           <div className="relative pt-1 mx-auto">
                <img
                  src="https://static-assets.bamgrid.com/product/disneyplus/images/logo.1a56f51c764022ee769c91d894d44326.svg"
                  className="w-24 pb-[1px]"
                  alt=""
                />
                <span className="absolute bottom-0 left-8 text-xs font-disney">
                  Clone
                </span>
              </div>
      </nav>
      <Slider content={bigSliderData} />
      <section className="px-4 lg:px-20 mt-6 lg:mt-3 pb-20">
        <ul className="w-full flex items-stretch">
          {sections.map((element, index) => {
            return (
              <li className="mx-[2px] lg:mx-[10px] w-1/5" key={index}>
                <SectionCard
                  logo={element.logo}
                  backdrop={element.backdrop}
                  link={element.link}
                />
              </li>
            );
          })}
        </ul>
        {data &&
          data.map((element, index) => (
            <div key={index}>
              <MovieSlider
                title={element.title}
                movies={element.content}
                special={index === 2}
                id={index}
              />
            </div>
          ))}
      </section>
    </>
  );
};

export default HomePage;
