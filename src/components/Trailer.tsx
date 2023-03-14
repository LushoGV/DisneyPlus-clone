import ReactPlayer from "react-player/youtube";
import { IoArrowBackSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { iMoviePage } from "../interfaces";
import axios from "axios";

const Trailer = () => {
  const [videoData, setVideoData] = useState<iMoviePage>();
  const { id, trailer, type, company } = useParams();
  const navigate = useNavigate()

  const getData = async () => {
    const { data } = await axios.get(`
    https://api.themoviedb.org/3/${
      type === "1" ? "movie" : "tv"
    }/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US
    `);
    setVideoData(data);
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      <header className="h-[72px] w-full bg-black z-50 fixed top-0 flex items-center px-5">
        <nav className="w-full flex">
          <button
            onClick={() => navigate(`/${type === "1" ? "movie" : "tv"}/${id}&${company}`)}
            className="mr-5 lg:mr-auto ml-0"
          >
            <IoArrowBackSharp
              className="text-3xl cursor-pointer text-gray-300 hover:text-white"
              onClick={close}
            />
          </button>
          <h2 className="m-auto ml-0 text-sm max-h-5 lg:max-h-screen overflow-hidden lg:text-2xl">
            {videoData?.title || videoData?.original_name}
          </h2>
        </nav>
      </header>
      <section className="w-full h-full bg-black z-40 top-0 left-0">
        {trailer && (
          <ReactPlayer
            playing
            controls
            url={`https://www.youtube.com/watch?v=${trailer}`}
            className={"w-full absolute h-screen top-0 left-0"}
            width={"100%"}
            height={"100%"}
          />
        )}
      </section>
    </>
  );
};

export default Trailer;
