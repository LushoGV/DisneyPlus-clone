import SectionCard from "../components/SectionCard";
import Slider from "../components/Slider";
import sections from "../api/sections";
import MovieSlider from "../components/MovieSlider";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IMovie, iSlider } from "../interfaces";
import { bigSliderData } from "../api/bigSliderData";
import { filterData } from "../utils/Filter";
import Loader from "../components/Loader";

interface iData {
  title: string;
  content: IMovie[];
}

const HomePage = () => {
  const [data, setData] = useState<iData[]>();
  const [loading, setLoading] = useState<boolean>(true);

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
    setTimeout(() => {
      setLoading(false);
    }, 2000000);
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  return (
    <>
      <nav className="lg:hidden">
        <Link to={"/"}>
          <img
            src="https://static-assets.bamgrid.com/product/disneyplus/images/logo.1a56f51c764022ee769c91d894d44326.svg"
            className="w-24 m-auto pt-4"
            alt=""
          />
        </Link>
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
      {/* {loading && <section className="absolute z-50 top-0 left-0 w-full"><Loader type="principal"/></section>} */}
    </>
  );
};

export default HomePage;
