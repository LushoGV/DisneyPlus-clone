import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Navigation, Pagination } from "swiper";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { IMovie } from "../interfaces";
import "swiper/css";
import "swiper/css/pagination";

interface Props {
  title: string;
  movies: IMovie[];
  id: number;
  special?: boolean;
}

const MovieSlider = ({ title, movies, id, special }: Props) => {
  const [sliderCount, setSliderCount] = useState<number>(0);
  const [content, setContent] = useState<IMovie[]>();

  useEffect(() => {
    setContent(
      movies.filter(
        (element: any) =>
          element.backdrop_path !== null && element.poster_path !== null
      )
    );
  }, [movies]);

  return (
    <section className={`swiper${id} animation-opacity transition-all duration-[10ms]`}>
      <h2 className="mb-3 mt-6 lg:px-3 font-bold text-slate-200 lg:text-xl">
        {title}
      </h2>
      <div className={`movie-slider relative`}>
        <Swiper
          modules={[Pagination, Navigation]}
          watchSlidesProgress
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
            },
            1032: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            1400: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              spaceBetween: 10,
            },
            1500: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              spaceBetween: 10,
            },
          }}
        >
          {content &&
            content.map((element, index) => (
              <div key={index}>
                <SwiperSlide key={element.id}>
                  <MovieCard
                    special={special}
                    type="slider"
                    imageMobile={element.poster_path}
                    imageLG={element.backdrop_path}
                    id={element.id}
                    typeLink={element.first_air_date ? "tv" : "movie"}
                    company={element.company}
                  />
                </SwiperSlide>
              </div>
            ))}
        </Swiper>
        <div
          id={`swiper-button-prev-${id}`}
          onClick={() => setSliderCount(sliderCount - 1)}
          className={`swiper-button-prev swiper-button-prev-${id} hidden ${
            sliderCount ? "lg:flex" : "lg:hidden"
          } items-center justify-center text-white h-full absolute cursor-pointer w-20 top-0 left-[-80px] z-20 text-4xl`}
        >
          <IoIosArrowBack className="arrow-prev hover:opacity-100 cursor-pointer opacity-0 hover:transition-opacity" />
        </div>
        <div
          id={`swiper-button-next-${id}`}
          onClick={() => setSliderCount(sliderCount + 1)}
          className={`swiper-button-next swiper-button-next-${id} opacity-0 w-20 rounded-sm hidden lg:flex items-center justify-center text-white h-full absolute top-0 right-[-80px] z-30 hover:transition-opacity hover:opacity-100 cursor-pointer text-4xl transition-all duration-200 transform`}
        >
          <IoIosArrowForward className="arrow-next hover:opacity-100 cursor-pointer opacity-0 hover:transition-opacity" />
        </div>
      </div>
    </section>
  );
};
export default MovieSlider;
