import { Link } from "react-router-dom";
import { IoIosPlay } from "react-icons/io";
import "../styles/MovieCard.css";

interface Props {
  id?: number;
  title?: string;
  type?: string;
  imageMobile?: string;
  imageLG?: string;
  linkTrailer?: string
  logo?: string
  typeLink?: string
}

const MovieCard = ({ type, title, imageMobile, imageLG, id, linkTrailer, logo, typeLink }: Props) => {

  if (type === "slider")
    return (
      <Link to={`/${typeLink}/${id}`} >
        <div className="relative w-auto md:h-auto md:w-[234px] cursor-pointer lg:w-full xl:w-[95%] flex mr-[10px] lg:mx-[10px] rounded-md hover:scale-105 transition duration-[400ms] shadow-disney transform">
          <div className="absolute z-10 top-0 left-0 w-full h-full rounded-md hover:border-[3px] border-white border-opacity-10 hover:border-opacity-80"></div>
          <div className="bg-gradient-to-tl from-[#1e1f2a] to-[#30323e] rounded-md w-full">
            <img
              className="rounded-md w-full animation-opacity block lg:hidden"
              src={
                imageMobile && `https://image.tmdb.org/t/p/w500/${imageMobile}`
              }
              alt=""
            />
            <img
              className="rounded-md w-full animation-opacity hidden lg:block"
              src={imageLG && `https://image.tmdb.org/t/p/original/${imageLG}`}
              alt=""
            />
          </div>
        </div>
      </Link>
    );

  if (type === "grid")
    return (
      <Link to={`/${typeLink}/${id}`} >
        <div className=".load-image relative cursor-pointer flex rounded-md hover:scale-105 transition duration-[400ms] shadow-disney transform">
          <div className="absolute z-10 top-0 left-0 w-full h-full rounded-md hover:border-[3px] border-white border-opacity-10 hover:border-opacity-80"></div>
          <div className="bg-gradient-to-tl from-[#1e1f2a] to-[#30323e] rounded-md w-full">
            <img
              className="rounded-md w-full object-cover animation-opacity block lg:hidden"
              src={
                imageMobile && `https://image.tmdb.org/t/p/w500/${imageMobile}`
              }
              alt=""
            />
             <img
              className="rounded-md w-full object-cover animation-opacity lg:block hidden"
              src={imageLG && `https://image.tmdb.org/t/p/original/${imageLG}`}
              alt=""
            />
          </div>
        </div>
      </Link>
    );

  if (type === "bigSlide")
    return (
      <Link to={`/${typeLink}/${id}`} >
        <div className="lg:my-4 px-4 lg:p-[10px] rounded-lg relative flex items-center h-60 lg:h-auto cursor-pointer">
          <div className="relative w-full bg-gradient-to-tl from-[#1e1f2a] to-[#30323e] rounded-md shadow-disney">
            <div className="absolute z-10 top-0 left-0 w-full h-full rounded-md hover:border-[3px] border-white border-opacity-10 hover:border-opacity-80"></div>
            <img
              src={imageLG}   
              className="animation-opacity bg-gradient-to-tl from-[#1e1f2a] to-[#30323e] rounded-md w-full h-[230px] lg:h-full object-cover object-center lg:object-container hidden lg:block"
              alt=""
            />
             <img
              src={`https://image.tmdb.org/t/p/original/${imageMobile}`}  
              className="animation-opacity bg-gradient-to-tl from-[#1e1f2a] to-[#30323e] rounded-md w-full h-[230px] object-cover object-center lg:hidden"
              alt=""
            />
          </div>
          <img src={logo} alt="" className="logo-slider absolute lg:h-[200px] lg:left-16 lg:object-cover hidden lg:block"/>
        </div>
      </Link>
    );

  if (type === "trailer")
    return (
      <Link
        to="/movie/1"
        className="md:w-[293px] hover:scale-105 transition duration-[400ms] transform card-trailer"
      >
        <div className="relative w-auto md:h-auto cursor-pointer lg:w-full xl:w-[95%] flex rounded-md shadow-disney">
          <div className="border-card absolute z-10 top-0 left-0 w-full h-full rounded-md border-[3px] border-transparent"></div>
          <IoIosPlay className="card-icon text-white absolute bottom-3 left-3 w-6 h-6 px-1 bg-black bg-opacity-50 border-[1px] rounded-full border-white z-30 hover:scale-105 transition transform lg:invisible" />
          <div className="bg-gradient-to-tl from-[#1e1f2a] to-[#30323e] rounded-md w-full">
            <img
              className="rounded-md w-full animation-opacity"
              src={`https://image.tmdb.org/t/p/original/${imageLG}`}
              alt=""
            />
            {/* <video src={`https://image.tmdb.org/t/p/original/${imageLG}`} className="rounded-md w-full animation-opacity">
            <source src={linkTrailer} />
            </video> */}
          </div>
        </div>
        <h3 className="pt-3 pl-2 text-sm font-semibold">
          {title}
        </h3>
        <span className="py-2 pl-2 text-xs">View a promo of this release.</span>
      </Link>
    );

  return <h1>a</h1>;
};

export default MovieCard;
