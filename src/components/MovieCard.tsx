import { Link } from "react-router-dom";
import {IoIosPlay} from 'react-icons/io'
import '../styles/MovieCard.css'

interface Props {
  type: string;
  content?: {
    image: string;
  };
}

const MovieCard = ({ type, content }: Props) => {
  if (type === "slider")
    return (
      <Link to="/movie/1">
        <div className="relative w-auto h-32 md:h-auto md:w-[234px] cursor-pointer lg:w-full xl:w-[95%] flex mr-[10px] lg:mx-[10px] rounded-md hover:scale-105 transition duration-[400ms] shadow-disney transform">
          <div className="absolute z-10 top-0 left-0 w-full h-full rounded-md hover:border-[3px] border-white border-opacity-10 hover:border-opacity-80"></div>
          <div className="bg-gradient-to-tl from-[#1e1f2a] to-[#30323e] rounded-md w-full">
            <img
              className="rounded-md w-full animation-opacity"
              src={content && content.image}
              alt=""
            />
          </div>
        </div>
      </Link>
    );

  if (type === "grid")
    return (
      <Link to="/movie/1">
        <div className=".load-image relative cursor-pointer flex rounded-md hover:scale-105 transition duration-[400ms] shadow-disney transform">
          <div className="absolute z-10 top-0 left-0 w-full h-full rounded-md hover:border-[3px] border-white border-opacity-10 hover:border-opacity-80"></div>
          <div className="bg-gradient-to-tl from-[#1e1f2a] to-[#30323e] rounded-md w-full">
            <img
              className="rounded-md w-full object-cover animation-opacity"
              src={
                "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/6044C0A16A54D237390BA98F9941E006B1CB1F53F002451ACC3CDD1BDCB78235/scale?width=400&aspectRatio=1.78&format=jpeg"
              }
              alt=""
            />
          </div>
        </div>
      </Link>
    );

  if (type === "bigSlide")
    return (
      <Link to="/movie/1">
        <div className="lg:my-4 px-4 lg:p-[10px] rounded-lg relative flex items-center h-60 lg:h-auto cursor-pointer">
          <div className="relative w-full bg-gradient-to-tl from-[#1e1f2a] to-[#30323e] rounded-md shadow-disney">
            <div className="absolute z-10 top-0 left-0 w-full h-full rounded-md hover:border-[3px] border-white border-opacity-10 hover:border-opacity-80"></div>
            <img
              src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/C8999751A052803B64615E87FC803FDB164399D74A35FDCC35BC8D5B3CF35918/compose?width=1440&aspectRatio=3.91&format=jpeg&label=disneyplusoriginal_391"
              className="animation-opacity bg-gradient-to-tl from-[#1e1f2a] to-[#30323e] rounded-md w-full h-[230px] lg:h-full object-cover lg:object-contain"
              alt=""
            />
          </div>
          <h1 className="absolute ">Una noche en el museo</h1>
        </div>
      </Link>
    );

    if(type === "trailer")  return (
      <Link to="/movie/1" className="md:w-[293px] hover:scale-105 transition duration-[400ms] transform card-trailer">
      <div className="relative w-auto md:h-auto cursor-pointer lg:w-full xl:w-[95%] flex rounded-md shadow-disney">
        <div className="border-card absolute z-10 top-0 left-0 w-full h-full rounded-md border-[3px] border-transparent"></div>
        <IoIosPlay className="card-icon text-white absolute bottom-3 left-3 w-6 h-6 px-1 bg-black bg-opacity-50 border-[1px] rounded-full border-white z-30 hover:scale-105 transition transform lg:invisible"/>
        <div className="bg-gradient-to-tl from-[#1e1f2a] to-[#30323e] rounded-md w-full">
          <img
            className="rounded-md w-full animation-opacity"
            src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/6044C0A16A54D237390BA98F9941E006B1CB1F53F002451ACC3CDD1BDCB78235/scale?width=400&aspectRatio=1.78&format=jpeg"
            alt=""
          />
        </div>
      </div>
      <h3 className="pt-3 pl-2 text-sm font-semibold">Diary of a Wimpy Kid 2: Rodrick Rules</h3>
      <span className="py-2 pl-2 text-xs">View a promo of this release.</span>
    </Link>
    );

    return <h1>a</h1>
};

export default MovieCard;
