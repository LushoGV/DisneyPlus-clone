import { useState, useEffect } from "react";
import { IMovie } from "../interfaces";
import { filterData } from "../utils/Filter";
import MovieSlider from "../components/MovieSlider";

interface iData {
  title: string;
  content: IMovie[];
}

const OriginalsPage = () => {
  const [changeHeader, setChangeHeader] = useState<boolean>(false);
  const [data, setData] = useState<iData[]>();

  const getData = async () => {
    setData([
      {
        title: "Featured",
        content: filterData({ filter: "featured", companyCode: "2" }),
      },
      {
        title: "Movies",
        content: filterData({ type: "movie", filter: "popularity" }),
      },
      {
        title: "Series",
        content: filterData({ type: "tv", filter: "popularity" }),
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
