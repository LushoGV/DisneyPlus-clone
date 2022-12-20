import { useState } from "react";
import movies from "../api/movies";
import MovieSlider from "../components/MovieSlider";

const OriginalsPage = () => {

  const [changeHeader, setChangeHeader] = useState<boolean>(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 30) {
      setChangeHeader(true);
    } else {
      setChangeHeader(false);
    }
  });

  return (
    <>
      <header className="flex pt-2 lg:pt-10 lg:pb-4 fixed w-full z-10 bg-[#1a1d29] top-0">
        <div className="flex items-center justify-center lg:h-[189px] w-full">
          <img
            src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/637FCA57F24297B0A2E1845AA039B641CCE21719E3A98DDDF5F3EB690AE39394/scale?width=600&aspectRatio=2.00&format=png"
            alt=""
            className={`${changeHeader ? "h-[60px] lg:h-[123px]" : "h-[90px] lg:h-[189px]"} lg:mt-9 lg:transition-all lg:duration-[250ms]`}
          />
        </div>
      </header>
      <div className="bg-[#1a1d29] w-full absolute top-0 h-full"></div>
      <section className="px-4 lg:px-20 pt-16 lg:pt-32 pb-20 lg:pb-0">
        <MovieSlider title="Featured" movies={movies} id={1} />
        <MovieSlider title="Series" movies={movies} id={2} />
        <MovieSlider title="movies" movies={movies} id={3} />
        <MovieSlider title="movies" movies={movies} id={4} />
        <MovieSlider title="movies" movies={movies} id={5} />

      </section>
    </>
  );
};

export default OriginalsPage;
