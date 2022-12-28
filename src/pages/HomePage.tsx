import SectionCard from "../components/SectionCard";
import Slider from "../components/Slider";
import sections from "../api/sections";
import MovieSlider from "../components/MovieSlider";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IMovie, iSlider } from "../interfaces";
import { bigSliderData } from "../api/bigSliderData";
import { filterData } from "../utils/Filter";

interface iData {
  title: string;
  content: IMovie[];
}

const HomePage = () => {
  const [data, setData] = useState<iData[]>();

  const getData = async () => {
    // const res1 = await axios.get(
    //   "https://api.themoviedb.org/3/discover/movie?api_key=779b195bed29319f74d486e3c7b2af1e&language=en-US&language=en-US&sort_by=popularity.desc&with_companies=3"
    // );
    // const res2 = await axios.get(
    //   "https://api.themoviedb.org/3/discover/movie?api_key=779b195bed29319f74d486e3c7b2af1e&language=en-US&language=en-US&sort_by=popularity.desc&genre=35&with_companies=2"
    // );
    // const res3 = await axios.get(
    //   "https://api.themoviedb.org/3/discover/movie?api_key=779b195bed29319f74d486e3c7b2af1e&language=en-US&language=en-US&sort_by=popularity.desc&with_companies=1|420"
    // );
    // const res4 = await axios.get(
    //   "https://api.themoviedb.org/3/tv/popular?api_key=779b195bed29319f74d486e3c7b2af1e&language=en-US&page=1&with_companies=3"
    // );

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
                special = {index === 2}
                id={index}
              />
            </div>
          ))}
      </section>
    </>
  );
};

export default HomePage;
