import { Link } from "react-router-dom";

interface Props {
  name?: string;
  logo: string;
  backdrop: string;
  link: string;
}

const SectionCard = ({ logo, backdrop, link }: Props) => {
  return (
    <section className="flex relative cursor-pointer rounded-md lg:rounded-xl border-2 lg:border-[3px] h-16 md:h-24 lg:h-auto border-white border-opacity-10 hover:border-opacity-80 shadow-disney transform hover:scale-105 transition duration-[400ms]">
      <Link to={link} className="w-full animation-opacity transition-all duration-[10ms]">
        <div className="bg-gradient-to-tl  from-[#1e1f2a] to-[#30323e] rounded-md lg:rounded-lg h-full lg:h-auto w-full">
          <picture className="w-full h-full flex md:block justify-center items-center">
            {link === "/brand/national-geographic" && <source media="(max-width: 760px)" srcSet="/public/national-geo-mobile-icon.png" />}
          <img className={`absolute w-full md:w-full ${link !== "/brand/national-geographic" && "h-[90%]"} lg:h-auto animation-opacity object-cover lg:object-cover`} src={logo} alt="" />
          </picture>
          <video
            className="opacity-0 lg:hover:opacity-100 rounded-lg bg-white w-full"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={backdrop} type="video/mp4" />
          </video>
        </div>
      </Link>
    </section>
  );
};

export default SectionCard;
