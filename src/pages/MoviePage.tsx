import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { RiAddLine, RiFilmFill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { MdDownload } from "react-icons/md";
import MovieSlider from "../components/MovieSlider";
import movies from "../api/movies";
import MovieCard from "../components/MovieCard";

const MoviePage = () => {
  const [sectionMode, setSectionMode] = useState<number>(1);

  return (
    <div className="min-h-screen w-full lg:relative pb-12">
      <div className="w-full h-full absolute top-0 left-0 ">
        <div
          className={`top-0 left-0 w-full bg-[#1a1d29] h-full lg:fixed z-[0] opacity-[0.2] transition-all duration-300 transform`}
        >
          <div className={`relative`}>
            <img
              src={
                "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/358035EB368552E0CD2C9067E5EBE4337377BB0CE60DAF754C1DCE6EC5B95990/scale?width=1440&aspectRatio=1.78&format=jpeg"
              }
              alt=""
              className="w-full"
            />
            <div className="absolute top-36 lg:top-0 inset-0 bg-bottomCompanyPage lg:bg-movieBack"></div>
          </div>
        </div>
      </div>
      <section className="z-10 top-0 relative px-4 lg:px-20 pt-56 lg:pt-20 w-full">
        <img
          src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/821927250800EA793236B8C55F7036E87F4F2AE9F890BBBB98EAB25952AF7B1F/scale?width=1440&aspectRatio=1.78&format=png"
          alt=""
          className="max-w-[341px] min-w-[100px] w-[35vw] m-auto lg:m-0"
        />
        <span className="w-full flex justify-center lg:justify-start mt-4 lg:mt-7 text-[#888888] lg:text-white text-sm h-5 lg:h-6">
          <img src="../add.png" alt="" className="mr-2" />
          <img src="../cc.png" alt="" />
        </span>
        <span className="w-full flex justify-center lg:justify-start mt-1 lg:mt-2 text-[#888888] lg:text-white text-sm">
          1990 • 1h 44m • Family, Comedy
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
              <RiAddLine className="text-xl m-auto hidden lg:block" />
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
              <MdDownload className="text-[1.6rem]" />
              <p className="text-[11px] mt-1 text-[#888888]">Download</p>
            </button>
          </div>
          <p className="py-6 lg:py-4 text-lg lg:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            autem dolore possimus, temporibus adipisci mollitia provident
            nostrum, rem cumque itaque illum maiores reiciendis quaerat quam
            nemo. Voluptatem, quidem! Error, odio.
          </p>
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
          <section className="">
            {/* {sectionMode === 1 && (
              <MovieSlider title="" movies={movies} id={1} />
            )} */}
            {sectionMode === 2 && (
              <div className="grid lg:grid-cols-5 lg:pb-0">
                <MovieCard type="trailer" />
              </div>
            )}
            {sectionMode === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 animation-opacity transition-all duration-[10ms]">
                <div className="lg:pr-5">
                  <h3 className="pb-5 lg:pb-6 lg:text-xl font-semibold">
                    Diary of a Wimpy Kid 2: Rodrick Rules
                  </h3>
                  <p className="lg:text-xl">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Totam, error quis omnis debitis tenetur expedita magnam
                    minus tempora commodi minima eos assumenda ducimus harum
                    fugiat maiores ipsum dicta nulla consectetur! Lorem ipsum,
                    dolor sit amet consectetur adipisicing elit. Consequatur
                    doloremque, illo laudantium ex quia praesentium illum
                    consequuntur fuga voluptate exercitationem fugiat repellat
                    inventore? Doloremque illum impedit exercitationem amet
                    porro corrupti. Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Blanditiis, dicta aperiam eaque
                    accusantium unde doloremque repellendus dolorum
                    necessitatibus architecto, vitae illum maiores eum velit,
                    repudiandae magnam iure sed. Repudiandae, commodi. Lorem
                    ipsum dolor sit amet consectetur, adipisicing elit.
                    Consectetur expedita quas nostrum quibusdam omnis itaque
                    quasi nobis aspernatur! Eveniet deserunt quibusdam eos esse
                    dolore quod sunt natus aliquid consequuntur impedit.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 pt-2 w-full mt-3 lg:mt-[44px] lg:pl-3">
                  <ul className="text-base lg:text-sm">
                    <li className="mb-3 flex flex-col">
                      <span className="text-[#888888]">Duration:</span>
                      <span className="py-[1px]">1h 16m</span>
                    </li>
                    <li className="mb-3 flex flex-col">
                      <span className="text-[#888888]">Release Date:</span>
                      <span className="py-[1px]">2022</span>
                    </li>
                    <li className="mb-3 flex flex-col">
                      <span className="text-[#888888]">Genre:</span>
                      <span className="py-[1px]">
                        Family, Comedy, Animation
                      </span>
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
                      <p className="text-sm py-[1px]">Luke Cormican</p>
                    </li>
                    <li className="mb-3">
                      <p className="text-[#888888]">Starring:</p>
                      <p className="py-[1px]">Brady Noon</p>
                      <p className="py-[1px]">Ethan William Childress</p>
                      <p className="py-[1px]">Edward Asner</p>
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
