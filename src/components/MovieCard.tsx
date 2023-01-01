import { Link } from "react-router-dom";
import { IoIosPlay } from "react-icons/io";
import "../styles/MovieCard.css";

interface Props {
  id?: number;
  title?: string;
  type?: string;
  special?: boolean;
  imageMobile?: string;
  imageLG?: string;
  logo?: string;
  typeLink?: string;
  company?: string
}

const MovieCard = ({type,company,title,special,imageMobile,imageLG,id,logo,typeLink,}: Props) => {
  if (type === "slider")
    return (
      <Link to={`/${typeLink}/${id}&${company}`}>
        <div className="relative w-auto md:h-auto md:w-[234px] cursor-pointer lg:w-full xl:w-[95%] flex mr-[5px] lg:mx-[10px] rounded-md hover:scale-105 transition duration-[400ms] shadow-disney transform">
          <div className="absolute z-10 top-0 left-0 w-full h-full rounded-md hover:border-[3px] border-white border-opacity-10 hover:border-opacity-80"></div>
          <div className="bg-gradient-to-tl from-[#1e1f2a] to-[#30323e] rounded-md w-full">
            <picture>
              {!special && (
                <source
                  media="(min-width: 1022px)"
                  srcSet={`https://image.tmdb.org/t/p/w500/${imageLG}`}
                ></source>
              )}
              <img
                className={`rounded-md w-full animation-opacity`}
                src={
                  imageMobile &&
                  `https://image.tmdb.org/t/p/w500/${imageMobile}`
                }
                alt=""
              />
            </picture>
          </div>
        </div>
      </Link>
    );

  if (type === "grid")
    return (
      <Link to={`/${typeLink}/${id}&${company}`}>
        <div className=".load-image relative cursor-pointer flex rounded-md hover:scale-105 transition duration-[400ms] shadow-disney transform bg-gradient-to-tl from-[#1e1f2a] to-[#30323e]">
          <div className="absolute z-10 top-0 left-0 w-full h-full rounded-md hover:border-[3px] border-white border-opacity-10 hover:border-opacity-80"></div>
          <div className="bg-gradient-to-tl from-[#1e1f2a] to-[#30323e] rounded-md w-full animation-opacity transition-all duration-[10ms]">
            <picture>
              <source
                media="(min-width: 1022px)"
                srcSet={`https://image.tmdb.org/t/p/w500/${imageLG}`}
              ></source>
              <img
                className="rounded-md w-full object-cover animation-opacity"
                src={
                  imageMobile &&
                  `https://image.tmdb.org/t/p/w500/${imageMobile}`
                }
                alt=""
              />
            </picture>
          </div>
        </div>
      </Link>
    );

  if (type === "bigSlide")
    return (
      <Link to={`/${typeLink}/${id}&${company}`}>
        <div className="md:my-4 px-4 md:p-[10px] rounded-lg relative flex items-center h-60 md:h-auto cursor-pointer">
          <div className="relative w-full bg-gradient-to-tl from-[#1e1f2a] to-[#30323e] rounded-md shadow-disney">
            <div className="absolute z-10 top-0 left-0 w-full h-full rounded-md hover:border-[3px] border-white border-opacity-10 hover:border-opacity-80 transition duration-[200ms] transform"></div>
            <picture className="animation-opacity transition-all duration-[10ms]">
              <source media="(min-width: 768px)" srcSet={imageLG}></source>
              <img
                src={`https://image.tmdb.org/t/p/w500/${imageMobile}`}
                className="animation-opacity bg-gradient-to-tl from-[#1e1f2a] to-[#30323e] rounded-md w-full h-[230px] md:h-full object-cover object-center md:object-container"
                alt=""
              />
            </picture>
          </div>
          <img
            src={logo}
            alt=""
            className="logo-slider absolute md:h-[200px] md:left-16 md:object-cover hidden lg:block animation-opacity transition-all duration-[10ms]"
          />
        </div>
      </Link>
    );

  if (type === "trailer")
    return (
      <div className="md:w-[293px] hover:scale-105 transition duration-[400ms] transform card-trailer cursor-pointer">
        <div className="relative w-auto md:h-auto cursor-pointer lg:w-full xl:w-[95%] flex rounded-md shadow-disney">
          <div className="border-card absolute z-10 top-0 left-0 w-full h-full rounded-md border-[3px] border-transparent"></div>
          <IoIosPlay className="card-icon text-white absolute bottom-3 left-3 w-6 h-6 px-1 bg-black bg-opacity-50 border-[1px] rounded-full border-white z-30 hover:scale-105 transition transform lg:invisible" />
          <div className="bg-gradient-to-tl from-[#1e1f2a] to-[#30323e] rounded-md w-full">
            <img
              className="rounded-md w-full animation-opacity"
              src={`https://image.tmdb.org/t/p/w500/${imageLG}`}
              alt=""
            />
          </div>
        </div>
        <h3 className="pt-3 pl-2 text-sm font-semibold">{title}</h3>
        <span className="py-2 pl-2 text-xs text-[#cacaca]">
          View a promo of this release.
        </span>
      </div>
    );

  return <h1>a</h1>;
};

export default MovieCard;
