import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import companies from "../api/companies";
import MovieSlider from "../components/MovieSlider";
import { iSlider } from "../interfaces";

const CompaniesPage = () => {
  const [ChangeBackground, setChangeBackground] = useState(false);
  const [background, setBackground] = useState({
    image: "",
    video: "",
  });
  const { company } = useParams();
  const [data, setData] = useState<iSlider[]>();

  const getData = async (companyCode: string) => {
    const resFeatured = await axios.get(
      companyCode === "1"
        ? "https://api.themoviedb.org/3/search/movie?api_key=779b195bed29319f74d486e3c7b2af1e&language=en-US&page=1&include_adult=false&query=star%20wars&page=1"
        : `https://api.themoviedb.org/3/discover/movie?api_key=779b195bed29319f74d486e3c7b2af1e&language=en-US&language=en-US&sort_by=popularity.desc&with_companies=${companyCode}&page=2`
    );
    const resOriginals = await axios.get(
      companyCode === "1"
        ? "https://api.themoviedb.org/3/search/movie?api_key=779b195bed29319f74d486e3c7b2af1e&language=en-US&page=1&include_adult=false&query=star%20wars&page=2"
        : `https://api.themoviedb.org/3/discover/movie?api_key=779b195bed29319f74d486e3c7b2af1e&language=en-US&language=en-US&sort_by=popularity.desc&with_companies=${companyCode}&page=3`
    );
    const resPopularSeries = await axios.get(
      companyCode === "1"
        ? "https://api.themoviedb.org/3/search/movie?api_key=779b195bed29319f74d486e3c7b2af1e&language=en-US&page=1&include_adult=false&query=star%20wars&page=3"
        : `https://api.themoviedb.org/3/tv/popular?api_key=779b195bed29319f74d486e3c7b2af1e&language=en-US&page=1&with_companies=${companyCode}`
    );

    setData([
      {
        title: companyCode === "1" ? "Popular" : "Featured",
        content: resFeatured.data.results,
      },
      {
        title: "Originals",
        content: resOriginals.data.results,
      },
      {
        title: companyCode === "1" ? "Featured" : "Series and Specials",
        content: resPopularSeries.data.results,
      },
    ]);
  };

  useEffect(() => {
    if (company) {
      const companyData = companies.filter((element) =>
        element.name.includes(company)
      );

      getData(companyData[0].code);

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

        case "marvel":
          setTimeout(() => setChangeBackground(true), 9000);
          break;

        case "starwars":
          setTimeout(() => setChangeBackground(true), 8000);
          break;

        case "national-geographic":
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
          <div
            className={`top-0 left-0 w-full bg-[#1a1d29] h-full fixed z-[0]`}
          >
            <video
              autoPlay
              muted
              playsInline
              src={background.video}
              className={`${!ChangeBackground ? "hidden lg:block" : "hidden"}`}
            ></video>
            <div className="absolute inset-0 bg-bottomCompanyPage"></div>

            <div
              className={`${ChangeBackground ? "block" : "lg:hidden"} relative`}
            >
              <img src={background.image} alt="" className="w-full" />
              <div className="absolute inset-0 bg-bottomCompanyPage"></div>
            </div>
          </div>
        </div>
        <div className="px-4 lg:px-16 z-20 relative flex flex-col ">
          <div className="h-[170px] sm:h-[200px] md:h-[250px] lg:h-[300px] 2xl:h-[500px] flex md:mb-6"></div>
          <section>
            {data &&
              data.map((element, index) => {
                return (
                  <div key={index}>
                    <MovieSlider
                      title={element.title}
                      movies={element.content}
                      id={index}
                    />
                  </div>
                );
              })}
          </section>
        </div>
      </div>
    </>
  );
};

export default CompaniesPage;
