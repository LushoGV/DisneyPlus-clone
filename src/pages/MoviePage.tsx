import { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { RiAddLine, RiFilmFill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { MdDownload } from "react-icons/md";
import {BsCheck2} from 'react-icons/bs'
import MovieSlider from "../components/MovieSlider";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import { iMoviePage, Cast, iMovieCard } from "../interfaces";

const MoviePage = () => {
  const [sectionMode, setSectionMode] = useState<number>(1);
  const [data, setData] = useState<iMoviePage>();
  const [director, setDirector] = useState<Cast[]>();
  const [recommended, setRecommended] = useState<iMovieCard>();
  const { id, type } = useParams();

  const getData = async () => {
    const res = await axios.get(`
      https://api.themoviedb.org/3/${type}/${id}?api_key=779b195bed29319f74d486e3c7b2af1e&language=en-US&video=true&append_to_response=videos,credits
      `);

    const resRecommended = await axios.get(
      `https://api.themoviedb.org/3/discover/${type}?api_key=779b195bed29319f74d486e3c7b2af1e&language=en-US&language=en-US&sort_by=popularity.desc&with_companies=1|2|3|420`
    );

    setData(res.data);
    setDirector(
      type === "movie"
        ? res.data.credits.crew.filter((element: any) => element.job === "Director")
        : res.data.credits.crew.filter((element: any) => element.job === "Producer")
    );
    setRecommended(resRecommended.data.results);
  };

  const toHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (minutes === 0) return `${hours}h`;

    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    getData();
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
        {/* <img
          src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/821927250800EA793236B8C55F7036E87F4F2AE9F890BBBB98EAB25952AF7B1F/scale?width=1440&aspectRatio=1.78&format=png"
          alt=""
          className="max-w-[341px] min-w-[100px] w-[35vw] m-auto lg:m-0"
        /> */}
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
          {data && <span className="min-w-[47px]">
            {type === "movie"
              ? toHoursAndMinutes(data?.runtime)
              : `${data?.seasons.length} ${
                  data?.seasons.length > 1 ? "seasons" : "season"
                }`}
          </span>}
          <span className="mx-1">•</span>
          <ul className="flex flex-wrap max-w-[230px] lg:max-w-none max-h-[20px] mb-3">
            {data?.genres && data?.genres.map((element, index) => {
              return (
                <li className={`${index === 0 && "ml-1"} mr-1`} key={index}>
                  {element.name}
                  { data?.genres && index < data?.genres.length - 1 && ", "}
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
            <button className="flex flex-col items-center lg:w-11 lg:h-11 lg:border-[2px] lg:border-white lg:bg-black lg:text-white lg:rounded-full hover:bg-white hover:text-black transition-all duration-[400ms] transform">
              {/* <RiAddLine className="text-xl m-auto hidden lg:block" /> */}
              <BsCheck2 className="text-[1.6rem] my-auto text-[#005bd2]" />
            </button>
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
            <button className="flex flex-col items-center lg:hidden mx-3 lg:w-11 lg:h-11 lg:border-[2px] lg:border-white lg:bg-black lg:text-white lg:rounded-full">
              {/* <MdDownload className="text-[1.6rem]" /> */}
              <BsCheck2 className="text-[1.6rem]" />
              <p className="text-[11px] mt-1 text-[#888888]">Download</p>
            </button>
          </div>
          <p className="py-6 lg:py-4 text-lg lg:text-xl">{data?.overview}</p>
        </div>

        <section className="lg:pb-20 lg:mt-[56px]">
          <header>
            <ul className="uppercase flex justify-between lg:justify-start mb-4 lg:mb-3 border-b-[2px] border-[#f9f9f933] lg:text-xl">
              <li
                className={`pb-1 lg:pb-4 border-b-[4px] border-white ${
                  sectionMode === 1 ? "border-opacity-100" : "border-opacity-0"
                } hover:border-opacity-100 cursor-pointer`}
                onClick={() => setSectionMode(1)}
              >
                suggested
              </li>
              <li
                className={`pb-1 lg:pb-4 border-b-[4px] border-white ${
                  sectionMode === 2 ? "border-opacity-100" : "border-opacity-0"
                } hover:border-opacity-100 cursor-pointer lg:mx-8`}
                onClick={() => setSectionMode(2)}
              >
                extras
              </li>
              <li
                className={`pb-1 lg:pb-4 border-b-[4px] border-white ${
                  sectionMode === 3 ? "border-opacity-100" : "border-opacity-0"
                } hover:border-opacity-100 cursor-pointer mr-5`}
                onClick={() => setSectionMode(3)}
              >
                details
              </li>
            </ul>
          </header>
          <section>
            {sectionMode === 1 && recommended && (
              <MovieSlider title="" movies={recommended} id={1} />
            )}
            {sectionMode === 2 && (
              <div className="grid lg:grid-cols-5 lg:pb-0">
                {data && (
                  <MovieCard
                    type="trailer"
                    linkTrailer={`https://www.youtube.com/watch?v=${data?.videos.results[0].key}`}
                    imageLG={data?.backdrop_path}
                    title={data?.title || data?.original_name}
                  />
                )}
              </div>
            )}
            {sectionMode === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 animation-opacity transition-all duration-[10ms]">
                <div className="lg:pr-5">
                  <h3 className="pb-5 lg:pb-6 lg:text-xl font-semibold">
                    {data?.title || data?.original_name}
                  </h3>
                  <p className="lg:text-xl">{data?.overview}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 pt-2 w-full mt-3 lg:mt-[44px] lg:pl-3">
                  <ul className="text-base lg:text-sm lg:pr-2">
                    <li className="mb-3 flex flex-col">
                      <span className="text-[#888888]">Duration:</span>
                      {data && <span className="py-[1px]">
                        { type === "movie"
                          ? toHoursAndMinutes(data?.runtime)
                          : `${data?.seasons.length} ${
                              data?.seasons.length > 1 ? "seasons" : "season"
                            }`}
                      </span>}
                    </li>
                    <li className="mb-3 flex flex-col">
                      <span className="text-[#888888]">Release Date:</span>
                      <span className="py-[1px]">
                        {data?.release_date?.toString().substring(0, 4) ||
                          `${data?.first_air_date
                            ?.toString()
                            .substring(0, 4)} - ${data?.last_air_date
                            ?.toString()
                            .substring(0, 4)}`}
                      </span>
                    </li>
                    <li className="mb-3 flex flex-col">
                      <span className="text-[#888888]">Genre:</span>
                      <div className="py-[1px]">
                        {data?.genres && data?.genres.map((element, index) => {
                          return (
                            <span key={index}>
                              {index > 0 && ", "} {element.name}
                            </span>
                          );
                        })}
                      </div>
                    </li>
                    <li className="mb-3 flex flex-col items-start">
                      <span className="text-[#888888]">Rating:</span>
                      <span className="py-[2px] bg-[#31343e] px-1  mt-1 rounded-[3px]">
                        10+
                      </span>
                    </li>
                  </ul>
                  <ul className="text-base lg:text-sm">
                    <li className="mb-3 flex flex-col">
                      <p className="text-[#888888]">Director:</p>
                      <ul className="text-sm py-[1px]">
                        {director &&
                          director.map((element, index) => (
                            <li key={index}>{element.name}</li>
                          ))}
                      </ul>
                    </li>
                    <li className="mb-3">
                      <p className="text-[#888888]">Starring:</p>
                      {data?.credits.cast.slice(0, 5).map((element, index) => {
                        return (
                          <p className="py-[1px]" key={index}>
                            {element.name}
                          </p>
                        );
                      })}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </section>
        </section>
      </section>
    </div>
  );
};

export default MoviePage;
