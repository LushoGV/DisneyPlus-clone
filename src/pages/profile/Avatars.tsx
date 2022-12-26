import { Link } from "react-router-dom";
import avatars from "../../api/avatars";
import { useUserContext } from "../../context/userContext";

const Avatars = () => {
  const { newUserData, setNewUserData } = useUserContext();

  return (
    <div className="w-full h-full">
      <section className="px-4 lg:px-28 bg-[#1a1d29] pb-20 py-5 lg:py-10">
        <h1 className="font-semibold text-3xl hidden lg:block mb-6">
          Choose Avatar
        </h1>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {avatars.map((element) => (
            <li
              key={element.id}
              className="p-5 flex transition-all duration-[400ms] transform"
              onClick={() =>
                setNewUserData({ ...newUserData, image: element.image })
              }
            >
              <div className="image-profile relative m-auto my-0 lg:m-0 rounded-full hover:scale-105 transition duration-[400ms] flex">
                <Link to={"/profile"}>
                  <div className="absolute z-10 top-0 left-0 w-full h-full cursor-pointer rounded-full border-profile-image hover:border-[4px] border-white border-opacity-10 hover:border-opacity-80 transition duration-[300ms]"></div>
                  <img src={element.image} alt="" className="cursor-pointer bg-gradient-to-tl from-[#1e1f2a] to-[#30323e] rounded-full" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Avatars;
