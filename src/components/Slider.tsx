import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "../styles/Slider.css";
import "swiper/css";
import MovieCard from "./MovieCard";
import { iMovieCard } from "../interfaces";

interface Props {
  content: {
    id: number;
    backdrop_path: string;
    logo: string;
    imageMobile: string
    type: string
  }[];
}

const Slider = ({ content }: Props) => {
  return (
    <div className="banner-slider relative lg:px-20 mt-4 lg:m-0">
      <div className="swiperContainer ">
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          loop
          autoplay={{
            delay: 130000000,
            disableOnInteraction: false,
          }}
          pagination={{
            el: ".pagination",
            clickable: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          slidesPerView={1}
        >
          {content &&
            content.map((element, index) => (
              <div key={index}>
                <SwiperSlide key={index}>
                  <MovieCard
                    type="bigSlide"
                    id={element.id}
                    imageLG={element.backdrop_path}
                    logo={element.logo}
                    imageMobile={element.imageMobile}
                    typeLink={element.type}
                  />
                </SwiperSlide>
              </div>
            ))}
        </Swiper>
      </div>
      <div className="pagination h-12 hidden lg:flex justify-end items-end absolute z-20" />
      <div className="swiper-button-prev w-20 hidden lg:flex items-center justify-center text-white h-full absolute top-0 left-0 z-20 opacity-0 hover:transition-opacity hover:opacity-100  cursor-pointer text-4xl">
        <IoIosArrowBack />
      </div>
      <div className="swiper-button-next w-20 hidden lg:flex items-center justify-center text-white h-full absolute top-0 right-0 z-20 opacity-0 hover:transition-opacity hover:opacity-100 cursor-pointer text-4xl">
        <IoIosArrowForward />
      </div>
    </div>
  );
};

export default Slider;
