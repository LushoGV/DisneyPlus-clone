import { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { RiAddLine, RiFilmFill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { MdDownload } from "react-icons/md";
import { BsCheck2 } from "react-icons/bs";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ILocalMovies, iMoviePage } from "../interfaces";
import { toHoursAndMinutes } from "../utils/dateParse";
import Tabs from "../components/Tabs";
import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeToCart } from "../features/cart/cartSlice";
import movies from '../api/movies.json'

const MoviePage = () => {
  const [cart, setCart] = useState<string[]>([]);
  const [data, setData] = useState<iMoviePage>();
  const [recommended, setRecommended] = useState<ILocalMovies[]>();
  const cartState: string[] = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const { id, type } = useParams();

  const getData = async () => {
    const res = await axios.get(`
      https://api.themoviedb.org/3/${type}/${id}?api_key=779b195bed29319f74d486e3c7b2af1e&language=en-US&video=true&append_to_response=videos,credits
      `);

    const movieFounded = movies.filter(element => (element.id).toString() === id)

    const resRecommended = movies.filter(element => element.company === movieFounded[0].company).slice(0, 15)

    setData(res.data);
    setRecommended(resRecommended)
  };

  const handleCart = (movie: string) => {
    if (cart.includes(movie)) {
      dispatch(removeToCart(movie));
      setCart(cart.filter(element => element !== movie));
    } else {
      dispatch(addToCart(movie));
      setCart([...cart, movie]);
    }
  };

  useEffect(() => {
    getData();
    setCart(cartState);
  }, [id]);

  return (
    <div className="min-h-screen lg:min-h-0 w-full lg:relative pb-12">
      <div className="w-full h-full absolute top-0 left-0 ">
        <div
          className={`top-0 left-0 w-full bg-[#1a1d29] h-full lg:fixed z-[0] lg:opacity-[0.2] transition-all duration-300 transform`}
        >
          <div className={`relative`}>
            <img
              src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
              alt=""
              className="w-full"
            />
            <div className="absolute top-36 lg:top-0 inset-0 bg-bottomCompanyPage lg:bg-movieBack"></div>
          </div>
        </div>
      </div>
      <section className="z-10 top-0 relative px-4 lg:px-20 pt-56 lg:pt-20 w-full">
        <h1 className="text-5xl text-center lg:text-left">
          {data?.title || data?.original_name}
        </h1>
        <span className="w-full flex justify-center lg:justify-start mt-4 lg:mt-7 text-[#888888] lg:text-white text-sm h-5 lg:h-6">
          <img src="../add.png" alt="" className="mr-2" />
          <img src="../cc.png" alt="" />
        </span>
        <span className="w-full flex justify-center lg:justify-start mt-1 lg:mt-2 text-[#888888] lg:text-white text-sm">
          <span className="min-w-[32px]">
            {data?.release_date?.toString().substring(0, 4) ||
              `${data?.first_air_date
                ?.toString()
                .substring(0, 4)} - ${data?.last_air_date
                ?.toString()
                .substring(0, 4)}`}
          </span>
          <span className="mx-1">•</span>
          {data && (
            <span className="min-w-[47px]">
              {type === "movie"
                ? toHoursAndMinutes(data?.runtime)
                : `${data?.seasons.length} ${
                    data?.seasons.length > 1 ? "seasons" : "season"
                  }`}
            </span>
          )}
          <span className="mx-1">•</span>
          <ul className="flex flex-wrap max-w-[230px] lg:max-w-none max-h-[20px] mb-3">
            {data?.genres &&
              data?.genres.map((element, index) => {
                return (
                  <li className={`${index === 0 && "ml-1"} mr-1`} key={index}>
                    {element.name}
                    {data?.genres && index < data?.genres.length - 1 && ", "}
                  </li>
                );
              })}
          </ul>
        </span>
        <div className="max-w-[874px]">
          <div className="flex items-center justify-center lg:justify-start flex-wrap lg:flex-row mt-4 lg:mt-6">
            <button className="flex items-center uppercase py-[10px] lg:py-[14px] px-8 bg-white hover:bg-opacity-75 text-black transition-all duration-[400ms] transform rounded-[5px] text-lg w-full lg:w-auto justify-center mb-4 lg:mb-0">
              <FaPlay className="mr-4 text-base" />
              play
            </button>
            <button className="hidden lg:flex items-center uppercase py-[14px] px-8 bg-black text-white border-[1px] hover:bg-white hover:text-black transition-all duration-[400ms] transform border-white rounded-[5px] text-lg mx-5">
              trailer
            </button>
            {id && (
              <button
                className="lg:flex flex-col items-center lg:w-11 lg:h-11 lg:border-[2px] lg:border-white lg:bg-black lg:text-white lg:rounded-full hover:bg-white hover:text-black transition-all duration-[400ms] transform hidden"
                onClick={() => handleCart(id)}
              >
                {id && cart.includes(id) ? (
                  <BsCheck2 className="text-[1.6rem] my-auto text-[#005bd2]" />
                ) : (
                  <RiAddLine className="text-xl m-auto" />
                )}
              </button>
            )}
            <button className="flex flex-col items-center mx-3 lg:block lg:w-11 lg:h-11 lg:border-[2px] lg:border-white lg:bg-black lg:text-white lg:rounded-full lg:mx-4 hover:bg-white hover:text-black transition-all duration-[400ms] transform">
              <HiUserGroup className="text-[1.6rem] lg:text-3xl rounded-full lg:m-auto lg:pt-1" />
              <p className="text-[11px] lg:text-[11px] mt-1 text-[#888888] lg:hidden">
                GroupWatch
              </p>
            </button>
            <button className="flex flex-col items-center lg:hidden mx-3 lg:w-11 lg:h-11 lg:border-[2px] lg:border-white lg:bg-black lg:text-white lg:rounded-full">
              <RiFilmFill className="text-[1.6rem]" />
              <p className="text-[11px] mt-1 text-[#888888]">Trailer</p>
            </button>
            {id && (
              <button
                className="flex flex-col items-center lg:hidden mx-3 lg:w-11 lg:h-11 lg:border-[2px] lg:border-white lg:bg-black lg:text-white lg:rounded-full"
                onClick={() => handleCart(id)}
              >
                {id && cart.includes(id) ? (
                  <BsCheck2 className="text-[1.6rem] my-auto text-[#005bd2]" />
                ) : (
                  <MdDownload className="text-[1.6rem]" />
                )}
                <p className="text-[11px] mt-1 text-[#888888]">Download</p>
              </button>
            )}
          </div>
          <p className="py-6 lg:py-4 text-lg lg:text-xl">{data?.overview}</p>
        </div>
        {data && recommended && type && (
          <Tabs data={data} recommended={recommended} type={type} />
        )}
      </section>
    </div>
  );
};

export default MoviePage;
