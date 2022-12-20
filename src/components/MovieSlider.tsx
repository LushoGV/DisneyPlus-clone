import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Navigation, Pagination } from "swiper";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import MovieCard from "./MovieCard";

type movie = {
  id: number;
  image: string;
  link?: string;
};

interface Props {
  title: string;
  movies: movie[];
  id: number;
}

const MovieSlider = ({ title, movies, id }: Props) => {
  const [sliderCount, setSliderCount] = useState<number>(0);

  return (
    <section className={`swiper${id}`}>
      <h2 className="mb-3 mt-6 lg:px-4 font-bold text-slate-200 lg:text-xl">
        {title}
      </h2>
      <div className={`movie-slider relative`}>
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={2}
          slidesPerGroup={1}
          centeredSlides
          navigation={{
            nextEl: `#swiper-button-next-${id}`,
            prevEl: `#swiper-button-prev-${id}`,
          }}
          id={`Swiper-${id}`}
          className={`mySwiper flex items-stretch`}
          breakpoints={{
            100: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              centeredSlides: false,
            },
            1032: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              centeredSlides: false,
            },
            1400: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              spaceBetween: 10,
              centeredSlides: false,
            },
            1500: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              centeredSlides: false,
              spaceBetween: 10,
            },
          }}
        >
          {movies &&
            movies.map((element, index) => (
              <div key={element.id}>
                <SwiperSlide>
                  <MovieCard type="slider" content={element} />
                </SwiperSlide>
              </div>
            ))}
        </Swiper>
        <div
          id={`swiper-button-prev-${id}`}
          onClick={() => setSliderCount(sliderCount - 1)}
          className={`.swiper-button-prev swiper-button-prev-${id} hidden ${
            sliderCount ? "lg:flex" : "lg:hidden"
          } items-center justify-center text-white h-full absolute cursor-pointer w-20 top-0 left-[-80px] z-20 text-4xl`}
        >
          <IoIosArrowBack className="arrow-prev hover:opacity-100 cursor-pointer opacity-0 hover:transition-opacity" />
        </div>
        <div
          id={`swiper-button-next-${id}`}
          onClick={() => setSliderCount(sliderCount + 1)}
          className={`.swiper-button-next swiper-button-next-${id} w-20 rounded-sm bg-gray-900 bg-opacity-80 hidden lg:flex items-center justify-center text-white h-full absolute top-0 right-[-80px] z-20 hover:transition-opacity cursor-pointer text-4xl`}
        >
          <IoIosArrowForward className="arrow-next hover:opacity-100 cursor-pointer opacity-0 hover:transition-opacity" />
        </div>
      </div>
    </section>
  );
};
export default MovieSlider;
