import { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { RiAddLine, RiFilmFill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { MdDownload } from "react-icons/md";
import { BsCheck2 } from "react-icons/bs";
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import { IMovie, iMoviePage } from "../interfaces";
import { toHoursAndMinutes } from "../utils/dateParse";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeToCart } from "../features/user/userSlice";
import { filterData } from "../utils/Filter";
import { iUserState } from "../features/user/userSlice";
import { updateCart } from "../utils/FirebaseFunctions";
import type { RootState } from "../app/store";
import Tabs from "../components/Tabs";
import axios from "axios";
import Loader from "../components/Loader";

const MoviePage = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [data, setData] = useState<iMoviePage>();
  const [loading, setLoading] = useState<boolean>(true);
  const [recommended, setRecommended] = useState<IMovie[]>();
  const [backgroundOpacity, setBackgroundOpacity] = useState(1)
  const userState: iUserState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { id, type, company } = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get(`
      https://api.themoviedb.org/3/${type}/${id}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&video=true&append_to_response=videos,credits,${
        type === "movie" ? "release_dates" : "content_ratings"
      }
      `);
      const resRecommendations = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );

      const resRecommended = filterData({
        filter: "recommended",
        companyCode: company,
        recommendations: resRecommendations.data.results,
        id: Number(id),
        quantity: 8,
      });

      setData(res.data);
      setRecommended(resRecommended);
      setTimeout(() => setLoading(false), 100);
    } catch (error) {
      navigate("/");
    }
  };

  const handleCart = async (movie: string) => {
    if (cart.includes(Number(movie))) {
      dispatch(removeToCart(movie));
      await updateCart(
        userState.id,
        cart.filter((element) => element !== Number(movie))
      );
      setCart(cart.filter((element) => element !== Number(movie)));
    } else {
      dispatch(addToCart(movie));
      await updateCart(userState.id, [...cart, Number(movie)]);
      setCart([...cart, Number(movie)]);
    }
  };

  useEffect(() => {
    setLoading(true);
    setData(undefined);
    getData();
    setCart(userState.cart);
  }, [id]);

  const changeBackground = () => {
    if(window.scrollY === 0){
      setBackgroundOpacity(1)
    }else{
      if(window.scrollY <= 50) setBackgroundOpacity(0.8)

      if(window.scrollY > 50 && window.scrollY <= 100 ) setBackgroundOpacity(0.6)

      if(window.scrollY > 100 && window.scrollY <= 150) setBackgroundOpacity(0.4)

      if(window.scrollY > 150) setBackgroundOpacity(0.20)
    }
  }

  window.addEventListener('scroll', changeBackground)

  if (loading) return <Loader type="moviePage" />;

  return (
    <>
      <div className="min-h-screen lg:min-h-0 w-full relative pb-12">
        <div className={`w-full h-full top-0 left-0 absolute`}>
          <div
            className={`top-0 left-0 w-full bg-[#1a1d29] h-full lg:fixed z-[0] transition-all duration-300 transform`}
            style={{opacity: `${backgroundOpacity}`}}
          >
            <div className="relative animation-opacity transition-all duration-[10ms]">
              <img
                src={`https://image.tmdb.org/t/p/w1280/${data?.backdrop_path}`}
                alt=""
                className="w-full h-[420px] lg:h-full object-cover object-center lg:object-cover"
              />
              <div className="absolute top-8 lg:top-0 inset-0 bg-bottomCompanyPage lg:bg-movieBack"></div>
            </div>
          </div>
        </div>

        <section className="z-10 top-0 relative px-4 lg:px-24 pt-[35vh] lg:pt-40 w-full animation-opacity transition-all duration-[10ms]">
          <h1 className="text-2xl text-center lg:text-left mt-5 sm:mt-0">
            {data?.title || data?.original_name}
          </h1>

          <span className="w-full flex justify-center lg:justify-start mb-2 mt-4 lg:mt-7 text-[#888888] lg:text-white text-sm h-5 lg:h-6 animation-opacity transition-all duration-[10ms]">
            <img src="../add.png" alt="" className="mr-2" />
            <img src="../cc.png" alt="" />
          </span>

          <span className="w-full flex justify-center lg:justify-start mt-1 lg:mt-2 text-[#888888] lg:text-white text-[12px] lg:text-sm text-center animation-opacity transition-all duration-[10ms]">
            <span className="min-w-[32px]">
              {data?.release_date
                ? data?.release_date.toString().substring(0, 4)
                : `${data?.first_air_date
                    ?.toString()
                    .substring(0, 4)} - ${data?.last_air_date
                    ?.toString()
                    .substring(0, 4)}`}
            </span>
            <span className="mx-1">•</span>
            {data?.status === ("Released" || "Ended") && data?.runtime && (
              <>
                <span className="min-w-[47px]">
                  {type === "movie"
                    ? toHoursAndMinutes(data.runtime)
                    : `${data?.seasons && data?.seasons.length} ${
                        data?.seasons && data?.seasons.length > 1
                          ? "seasons"
                          : "season"
                      }`}
                </span>
                <span className="mx-1">•</span>
              </>
            )}
            <ul className="flex flex-wrap max-w-[300px] lg:max-w-none max-h-[20px] mb-3">
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

          <div className="max-w-[874px] animation-opacity transition-all duration-[10ms]">
            <div className="flex items-center justify-center lg:justify-start flex-wrap lg:flex-row mt-4 lg:my-6">
              <button className="flex items-center uppercase py-[10px] lg:py-[14px] px-8 bg-white hover:bg-opacity-75 text-black transition-all duration-[400ms] transform rounded-[5px] text-lg w-full lg:w-auto justify-center mb-4 lg:mb-0 mr-0 lg:mr-4">
                <FaPlay className="mr-4 text-base" />
                play
              </button>
              {data && data?.videos.results.length > 0 && (
                <Link
                  to={`/trailer/${id}/${data?.videos.results[0].key}/${
                    type === "movie" ? "1" : "2"
                  }&${company}`}
                  className="hidden lg:flex items-center uppercase py-[14px] px-8 bg-black text-white border-[1px] hover:bg-white hover:text-black transition-all duration-[400ms] transform border-white rounded-[5px] text-lg mr-4"
                >
                  trailer
                </Link>
              )}
              {id && (
                <button
                  className="lg:flex flex-col items-center lg:w-11 lg:h-11 lg:border-[2px] lg:border-white lg:bg-black lg:text-white lg:rounded-full hover:bg-white hover:text-black transition-all duration-[400ms] transform hidden"
                  onClick={() => handleCart(id)}
                >
                  {id && cart.includes(Number(id)) ? (
                    <BsCheck2 className="text-[1.6rem] my-auto text-[#005bd2]" />
                  ) : (
                    <RiAddLine className="text-xl m-auto" />
                  )}
                </button>
              )}
              <button className="flex flex-col items-center mx-3 lg:block lg:w-11 lg:h-11 lg:border-[2px] lg:border-white lg:bg-black lg:text-white lg:rounded-full lg:mx-4 hover:lg:bg-white hover:lg:text-black transition-all duration-[400ms] transform">
                <HiUserGroup className="text-[1.6rem] lg:text-3xl rounded-full lg:m-auto lg:pt-1" />
                <p className="text-[11px] lg:text-[11px] mt-1 text-[#888888] lg:hidden">
                  GroupWatch
                </p>
              </button>
              {data && data?.videos.results.length > 0 && (
                <Link
                  to={`/trailer/${id}/${data?.videos.results[0].key}/${
                    type === "movie" ? "1" : "2"
                  }&${company}`}
                  className="flex flex-col items-center lg:hidden mx-3 lg:w-11 lg:h-11 lg:border-[2px] lg:border-white lg:bg-black lg:text-white lg:rounded-full"
                >
                  <RiFilmFill className="text-[1.6rem]" />
                  <p className="text-[11px] mt-1 text-[#888888]">Trailer</p>
                </Link>
              )}
              {id && (
                <button
                  className="flex flex-col items-center lg:hidden mx-3 lg:w-11 lg:h-11 lg:border-[2px] lg:border-white lg:bg-black lg:text-white lg:rounded-full"
                  onClick={() => handleCart(id)}
                >
                  {id && cart.includes(Number(id)) ? (
                    <BsCheck2 className="text-[1.6rem] my-auto text-[#005bd2]" />
                  ) : (
                    <MdDownload className="text-[1.6rem]" />
                  )}
                  <p className="text-[11px] mt-1 text-[#888888]">Download</p>
                </button>
              )}
            </div>
            <p className="py-6 lg:py-2 text-lg lg:text-xl">{data?.overview}</p>
          </div>

          {data && recommended && type && (
            <Tabs
              data={data}
              recommended={recommended}
              type={type}
              trailerLink={
                data?.videos.results.length > 0
                  ? `/trailer/${id}/${data?.videos.results[0].key}/${
                      type === "movie" ? "1" : "2"
                    }&${company}`
                  : null
              }
            />
          )}
        </section>
      </div>
    </>
  );
};

export default MoviePage;
