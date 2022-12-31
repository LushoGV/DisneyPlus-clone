import { Link, useNavigate } from "react-router-dom";
import { BsPencilFill } from "react-icons/bs";
import { useUserContext } from "../../context/userContext";
import { auth } from "../../database/firebase";
import { signOut } from "firebase/auth";

const Profile = () => {
  const { newUserData, setNewUserData, error, setError } = useUserContext();
  const navigate = useNavigate()

  const changeUsername = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setNewUserData({ ...newUserData, profile: {name: target.value, image: newUserData.profile.image} });
  };

  const checkInputContent = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.value === "") {
      setError(true);
    }
  };

  const logOut = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  return (
    <div className="w-full h-full pb-20">
      <section className="flex flex-col-reverse lg:flex-row lg:justify-center px-4 lg:px-36 mt-6 lg:mt-20">
        <div className="lg:w-[400px] flex flex-col justify-center">
          <h1 className="font-semibold text-3xl hidden lg:block">
            Edit profile
          </h1>
          <p className="hidden lg:block py-3 text-sm text-[#cacaca]">
            This is your primary profile. It cannot be deleted or set to a kids
            profile.
          </p>
          <input
            type="text"
            placeholder="profile name"
            className={`h-[54px] bg-[#31343e] px-4 rounded-[4px] outline-[0px] mt-9 lg:mt-2 border-[1px] focus:border-white transition duration-[300ms] transform ${
              error
                ? "border-[2px] border-red-500 placeholder:text-red-500"
                : "placeholder:text-gray-400 border-[#31343e]"
            }`}
            onFocus={() => setError(false)}
            onBlur={checkInputContent}
            onChange={changeUsername}
            value={newUserData.profile.name}
          />
        </div>
        <div className="image-profile relative m-auto my-0 lg:m-0 lg:ml-[50px] rounded-full hover:scale-105 transition duration-[400ms] flex">
          <Link to={"/profile/select-avatar"}>
            <div className="absolute z-10 top-0 left-0 w-full h-full cursor-pointer rounded-full border-profile-image hover:border-[4px] border-white border-opacity-10 hover:border-opacity-80 transition duration-[300ms]"></div>
            <img
              src={newUserData.profile.image}
              alt=""
              className="w-28 lg:w-56 cursor-pointer"
            />
            <button className="w-7 h-7 lg:w-12 lg:h-12 bg-white absolute bottom-[7px] lg:bottom-4 left-[85px] lg:left-[175px] rounded-full z-10">
              <BsPencilFill className="text-slate-800 my-0 m-auto text-xs lg:text-lg" />
            </button>
          </Link>
        </div>
        <p className="py-3 lg:hidden text-sm text-[#cacaca] mb-4">
          This is your primary profile. It cannot be deleted or set to a kids
          profile.
        </p>
      </section>
      <div className="lg:hidden mx-4 mt-4">
      <button onClick={logOut} className=" bg-red-500 py-3 w-full rounded-[4px] text-center font-semibold">Log out</button>
      </div>
    </div>
  );
};

export default Profile;
