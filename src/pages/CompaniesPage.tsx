import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import companies from "../api/companies";
import movies from "../api/movies";
import MovieSlider from "../components/MovieSlider";

const CompaniesPage = () => {
  const [ChangeBackground, setChangeBackground] = useState(false);
  const [background, setBackground] = useState({
    image: "",
    video: "",
  });
  const { company } = useParams();

  useEffect(() => {
    if (company) {
      const companyData = companies.filter((element) =>
        element.name.includes(company)
      );
      setBackground({
        ...background,
        image: companyData[0].image,
        video: companyData[0].video,
      });

      switch (company) {
        case "disney":
          setTimeout(() => setChangeBackground(true), 10000);
          break;

        case "pixar":
          setTimeout(() => setChangeBackground(true), 13000);
          break;

        case "starwars":
          setTimeout(() => setChangeBackground(true), 8000);
          break;

        case "national-geographic":
          setTimeout(() => setChangeBackground(true), 9000);
          break;

        case "marvel":
          setTimeout(() => setChangeBackground(true), 9000);
          break;

        default:
          break;
      }
    }
  }, []);

  return (
    <>
    <div className="min-h-screen w-full relative">
      <div className="w-full h-full absolute top-0 left-0 ">
        <div className={`top-0 left-0 w-full bg-[#1a1d29] h-full fixed z-[0]`}>
          <video
            autoPlay
            muted
            playsInline
            src={background.video}
            className={`${!ChangeBackground ? "hidden lg:block" : "hidden"}`}
          ></video>
          <div className="absolute inset-0 bg-bottomCompanyPage"></div>

          <div className={`${ChangeBackground ? "block" : "lg:hidden"} relative`}>
            <img src={background.image} alt="" className="w-full" />
            <div className="absolute inset-0 bg-bottomCompanyPage"></div>
          </div>
        </div>
      </div>
      <div className="px-4 lg:px-16 z-20 relative flex flex-col ">
          <div className="h-[170px] sm:h-[200px] md:h-[250px] lg:h-[300px] 2xl:h-[500px] flex md:mb-6"></div>
          <section className="">
        <MovieSlider title="Recommended For You" movies={movies} id={1} />
        <MovieSlider title="Recommended For You" movies={movies} id={2} />
        <MovieSlider title="Recommended For You" movies={movies} id={3} />
          </section>
        </div>
      </div>
    </>
  );
};

export default CompaniesPage;
