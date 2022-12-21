import axios from "axios";
import { useState, useEffect } from "react";
import MovieSlider from "../components/MovieSlider";
import { iSlider } from "../interfaces";

const OriginalsPage = () => {
  const [changeHeader, setChangeHeader] = useState<boolean>(false);
  const [data, setData] = useState<iSlider[]>();

  const getData = async () => {
    const resFeatured = await axios.get(
      "https://api.themoviedb.org/3/discover/movie?api_key=779b195bed29319f74d486e3c7b2af1e&language=en-US&language=en-US&sort_by=popularity.desc&with_companies=3|2|420"
    );
    const resSeries = await axios.get(
      "https://api.themoviedb.org/3/discover/tv?api_key=779b195bed29319f74d486e3c7b2af1e&language=en-US&language=en-US&sort_by=popularity.desc&genre=35&with_companies=3|2|420"
    );
    const resMovies = await axios.get(
      "https://api.themoviedb.org/3/discover/movie?api_key=779b195bed29319f74d486e3c7b2af1e&language=en-US&language=en-US&sort_by=popularity.desc&with_companies=1|420&page=2"
    );

    setData([
      {
        title: "Featured",
        content: resFeatured.data.results,
      },
      {
        title: "Movies",
        content: resMovies.data.results,
      },
      {
        title: "Series",
        content: resSeries.data.results,
      },
    ]);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 30) {
      setChangeHeader(true);
    } else {
      setChangeHeader(false);
    }
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <header className="flex pt-2 lg:pt-10 lg:pb-4 fixed w-full z-10 bg-[#1a1d29] top-0">
        <div className="flex items-center justify-center lg:h-[189px] w-full">
          <img
            src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/637FCA57F24297B0A2E1845AA039B641CCE21719E3A98DDDF5F3EB690AE39394/scale?width=600&aspectRatio=2.00&format=png"
            alt=""
            className={`${
              changeHeader ? "h-[60px] lg:h-[123px]" : "h-[90px] lg:h-[189px]"
            } lg:mt-9 lg:transition-all lg:duration-[250ms]`}
          />
        </div>
      </header>
      <div className="bg-[#1a1d29] w-full absolute top-0 h-full"></div>
      <section className="px-4 lg:px-20 pt-20 lg:pt-36 pb-20 lg:pb-0 relative">
        {data &&
          data.map((element, index) => {
            return (
              <div key={index}>
                <MovieSlider
                  title={element.title}
                  movies={element.content}
                  id={index}
                />
              </div>
            );
          })}
      </section>
    </>
  );
};

export default OriginalsPage;
