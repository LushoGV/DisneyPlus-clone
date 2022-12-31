import { useState } from "react";
import { IMovie, iMoviePage } from "../interfaces";
import { toHoursAndMinutes } from "../utils/dateParse";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import MovieSlider from "./MovieSlider";

interface Props {
  data: iMoviePage;
  recommended: IMovie[];
  type: string;
  trailerLink?: string;
}

const Tabs = ({ data, recommended, type, trailerLink }: Props) => {
  const [sectionMode, setSectionMode] = useState<number>(1);

  const getCertification = () => {
    const certificationA = [ "G","TV-G","TV-Y"]
    const certificationB = ["PG", "TV-PG", "TV-Y7"]
    const certificationC = ["NC-17", "TV-MA", "NR"]
    const certificationD = ["PG-13", "TV-14"]

    let certification:any = type === "movie" ? data.release_dates.results.find(element => element.iso_3166_1 === 'US') : data.content_ratings.results.find(element => element.iso_3166_1 === 'US') 
    certification = type === "movie" ? certification.release_dates[0].certification : certification.rating
    
    if(certificationA.includes(certification)){
      return "+0"
    }else if(certificationB.includes(certification)){
      return "+7"
    }else if(certificationC.includes(certification)){
      return "+17"
    }else if(certificationD.includes(certification)){
      return "+13"
    }else{
      return "+13"
    }
  }

  return (
    <section className="lg:mt-[56px] min-h-[200px]">
      <header>
        <ul className="uppercase flex justify-between lg:justify-start mb-4 lg:mb-3 border-b-[2px] border-[#f9f9f933] lg:text-xl">
          <li
            className={`pb-1 lg:pb-4 border-b-[4px] border-white ${
              sectionMode === 1
                ? "border-opacity-100 text-white"
                : "border-opacity-0 text-[#cacaca]"
            } hover:border-opacity-100 cursor-pointer ${
              data?.videos.results.length === 0 && "lg:mr-8"
            }`}
            onClick={() => setSectionMode(1)}
          >
            suggested
          </li>
          {data?.videos.results.length > 0 && (
            <li
              className={`pb-1 lg:pb-4 border-b-[4px] border-white ${
                sectionMode === 2
                  ? "border-opacity-100 text-white"
                  : "border-opacity-0 text-[#cacaca]"
              } hover:border-opacity-100 cursor-pointer lg:mx-8`}
              onClick={() => setSectionMode(2)}
            >
              extras
            </li>
          )}
          <li
            className={`pb-1 lg:pb-4 border-b-[4px] border-white ${
              sectionMode === 3
                ? "border-opacity-100 text-white"
                : "border-opacity-0 text-[#cacaca]"
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
        {sectionMode === 2 && data?.videos.results.length > 0 && (
          <div className="grid lg:grid-cols-5 lg:pb-0">
            {data && trailerLink && (
              <Link to={trailerLink}>
                <MovieCard
                  type="trailer"
                  linkTrailer={`https://www.youtube.com/watch?v=${data?.videos.results[0].key}`}
                  imageLG={data?.backdrop_path}
                  title={data?.title || data?.original_name}
                />
              </Link>
            )}
          </div>
        )}
        {sectionMode === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 animation-opacity transition-all duration-[10ms]">
            <div className="lg:pr-10  ">
              <h3 className="pb-5 lg:pb-6 lg:text-xl font-semibold">
                {data?.title || data?.original_name}
              </h3>
              <p className="lg:text-xl">{data?.overview}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 pt-2 w-full mt-3 lg:mt-[90px] lg:pl-3">
              <ul className="text-base lg:text-sm lg:pr-10">
                <li className="mb-3 flex flex-col">
                  <span className="text-[#cacaca]">Duration:</span>
                  {data && (
                    <span className="py-[1px]">
                      {type === "movie"
                        ? toHoursAndMinutes(data?.runtime)
                        : `${data?.seasons.length} ${
                            data?.seasons.length > 1 ? "seasons" : "season"
                          }`}
                    </span>
                  )}
                </li>
                <li className="mb-3 flex flex-col">
                  <span className="text-[#cacaca]">Release Date:</span>
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
                  <span className="text-[#cacaca]">Genre:</span>
                  <div className="py-[1px]">
                    {data?.genres &&
                      data?.genres.map((element, index) => {
                        return (
                          <span key={index}>
                            {index > 0 && ", "} {element.name}
                          </span>
                        );
                      })}
                  </div>
                </li>
                <li className="mb-3 flex flex-col items-start">
                  <span className="text-[#cacaca]">Rating:</span>
                  <span className="py-[2px] bg-[#31343e] px-1  mt-1 rounded-[3px]">
                    {getCertification()}
                  </span>
                </li>
              </ul>
              <ul className="text-base lg:text-sm">
                {
                  data.created_by && data.created_by?.length > 0 && <li className="mb-3 flex flex-col">
                  <p className="text-[#cacaca]">Director:</p>
                  <ul className="text-sm py-[1px]">
                    
                      <li>{data.created_by[0].name}</li>
                    </ul>
                    </li>
                }

                {
                   <li className="mb-3 flex flex-col">
                   <p className="text-[#cacaca]">Director:</p>
                   <ul className="text-sm py-[1px]">
                     {
                      data.credits.crew
                        .filter((element: any) => element.job === "Director")
                        .map((element, index) => (
                          <li key={index}>{element.name}</li>
                        ))
                      }
                      
                     </ul>
                     </li>
                }

               {/* { data.created_by?.length > 0 || data.credits?.crew.length > 0 && <li className="mb-3 flex flex-col">
                  <p className="text-[#cacaca]">Director:</p>
                  <ul className="text-sm py-[1px]">
                    {data.created_by?.length > 0 ? (
                      <li>{data.created_by[0].name}</li>
                    ) : (
                      data.credits.crew
                        .filter((element: any) => element.job === "Director")
                        .map((element, index) => (
                          <li key={index}>{element.name}</li>
                        ))
                    )}
                  </ul>
                </li>} */}
                <li className="mb-3">
                  <p className="text-[#cacaca]">Starring:</p>
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
  );
};

export default Tabs;
