import SectionCard from "../components/SectionCard";
import Slider from "../components/Slider";
import sections from "../api/sections";
import MovieSlider from "../components/MovieSlider";
import movies from "../api/movies";
import {Link} from 'react-router-dom'

const HomePage = () => {
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
      <Slider />
      <section className="px-4 lg:px-20 mt-6 lg:mt-3">
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
        <MovieSlider title="Recommended For You" movies={movies} id={1} />
        <MovieSlider title="Recommended For You" movies={movies} id={2} />
        <MovieSlider title="Recommended For You" movies={movies} id={3} />
      </section>
    </>
  );
};

export default HomePage;
