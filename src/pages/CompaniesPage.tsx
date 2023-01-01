import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import companies from "../api/companies";
import MovieSlider from "../components/MovieSlider";
import { IMovie, iSlider } from "../interfaces";
import { filterData } from "../utils/Filter";

interface iData {
  title: string;
  content: IMovie[];
}

const CompaniesPage = () => {
  const [ChangeBackground, setChangeBackground] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState(1)
  const [background, setBackground] = useState({
    image: "",
    video: "",
  });
  const { company } = useParams();
  const [data, setData] = useState<iData[]>();

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

  const getData = async (companyCode: string) => {
    setData([
      {
        title: companyCode === "1" ? "Popular" : "Featured",
        content: filterData({ companyCode: companyCode, filter: "featured" }),
      },
      {
        title: "Originals",
        content: filterData({
          companyCode: companyCode,
          filter: "popularity",
          type: "movie",
        }),
      },
      {
        title: companyCode === "1" ? "Featured" : "Series and Specials",
        content: filterData({
          companyCode: companyCode,
          type: "tv",
          filter: "popularity",
        }),
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
      <div className="min-h-screen lg:min-h-0 w-full relative">
        <div className="w-full h-full absolute top-0 left-0 ">
          <div
            className={`top-0 left-0 w-full bg-[#1a1d29] h-full fixed z-[0] transition-all duration-300 transform`}
            style={{opacity: `${backgroundOpacity}`}}
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
              <img src={background.image} alt="" className="w-full transition-all duration-[100ms]" />
              <div className="absolute inset-0 bg-bottomCompanyPage"></div>
            </div>
          </div>
        </div>
        <div className="px-4 lg:px-16 z-20 relative flex flex-col ">
          <div className="h-[170px] sm:h-[200px] md:h-[250px] lg:h-[300px] 2xl:h-[500px] flex md:mb-6"></div>
          <section className="mb-14">
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
