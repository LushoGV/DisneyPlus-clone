import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FormEvent, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { auth, provider } from "../../database/firebase";
import { addInitialData } from "../../features/user/userSlice";
import { getUser, handleFirebaseError } from "../../utils/FirebaseFunctions";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const AuthForm = () => {
  const [steps, setSteps] = useState<number>(0);
  const [error, setError] = useState<boolean | string>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputContent, setInputContent] = useState({
    email: "",
    password: "",
    viewPassword: false,
  });
  const { section } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    const res = await signInWithPopup(auth, provider);
    const resUser = await getUser(res.user.uid, res.user.displayName);
    dispatch(addInitialData(resUser));
    navigate("/");
  };

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (section === "signUp") {
        const res = await createUserWithEmailAndPassword(
          auth,
          inputContent.email,
          inputContent.password
        );
        const resUser = await getUser(res.user.uid, res.user.displayName);
        dispatch(addInitialData(resUser));
      } else {
        const res = await signInWithEmailAndPassword(
          auth,
          inputContent.email,
          inputContent.password
        );
        const resUser = await getUser(res.user.uid, res.user.displayName);
        dispatch(addInitialData(resUser));
      }

      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000);
    } catch (e: any) {
      setLoading(false);
      setError(handleFirebaseError(e.code));
    }
  };

  const nextStep = (e: FormEvent) => {
    e.preventDefault();
    if (
      inputContent.email !== "" &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputContent.email)
    ) {
      setError(false);
      setLoading(true);
      setTimeout(() => {
        setSteps(1);
        setLoading(false);
      }, 200);
    } else {
      setError(
        `Sorry, we are having trouble creating your account. Please re-enter your email and password and try again. If the problem persists, contact Disney+ Support (Error Code 6).`
      );
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputContent.password !== "") {
      if (inputContent.password.length >= 6) {
        setError(false);
        handleAuth();
      } else {
        setError(
          `The provided value for the password user property is invalid. It must be a string with at least six characters.`
        );
      }
    } else {
      setError(`Please enter your current password.`);
    }
  };

  useEffect(() => {
    setInputContent({ ...inputContent, email: "", password: "", viewPassword: false });
    setError(false);
    setSteps(0);
  }, [section]);

  return (
    <>
      {steps === 0 ? (
        <section className="w-full max-w-sm m-auto mt-10 animation-opacity transition-all">
          {section === "signUp" && (
            <span className="uppercase text-[#f9f9f98a] text-xs">
              step {steps + 1} of 2
            </span>
          )}

          <form className="mt-1 w-full" onSubmit={(e) => nextStep(e)}>
            <h2 className="pb-3 text-2xl font-semibold">
              {section === "signUp"
                ? "Enter your email"
                : "Log in with your email"}
            </h2>
            <p className="pb-5 text-sm pr-10">
              {section === "signUp"
                ? "You will use this email and password to log into your Disney+ account to watch your favorite shows and movies."
                : "You will use this email and password to log into your Disney+ account to watch your favorite shows and movies."}
            </p>
            <input
              type="text"
              placeholder="Email"
              name="email"
              className={`bg-[#fafafa1a] py-3 pl-4 w-full rounded-[2px] mb-1 outline-0 border-[1px] ${
                error ? "border-[#ff554c]" : "border-[#fafafa1a]"
              } focus:border-[#f9f9f94d]`}
              value={inputContent.email}
              onChange={(e) =>
                setInputContent({ ...inputContent, email: e.target.value })
              }
            />
            {error && (
              <p className="text-[#ff554c] text-xs mt-1 mb-2">
                Sorry, we are having trouble creating your account. Please
                re-enter your email and password and try again. If the problem
                persists, contact Disney+ Support (Error Code 6).
              </p>
            )}
            <div className="relative">
              <input
                type="submit"
                value="continue"
                className="bg-[#0072d2] py-3 pl-4 w-full rounded-[2px] my-4 uppercase font-semibold cursor-pointer hover:bg-[#0082f0]"
              />
              {loading && (
                <div className="bg-[#0074d2] py-[10px] w-full rounded-[2px] my-4 absolute top-0">
                  <img
                    src="../loader.png"
                    alt="loader"
                    className="m-auto mt-0 animate-spin h-7"
                  />
                </div>
              )}
            </div>
          </form>
          <div className="relative flex flex-col items-center text-[#f9f9f960] my-3">
            <hr className="w-full border-[#f9f9f960]" />
            <span className="absolute top-[-8px] bg-[#1a1d29] px-[5px] text-xs">
              or
            </span>
          </div>
          <button
            className="bg-[#ffff] text-[#2b2b2b] py-3 pl-4 w-full rounded-[2px] mt-[18px] mb-4 font-semibold cursor-pointer hover:bg-[#ebebeb] flex"
            onClick={handleGoogleAuth}
          >
            <img
              src="/google-icon.png"
              alt="google-icon"
              className="w-7 m-auto mr-3"
            />
            <span className="m-auto ml-0 text-slate-700">
              Sign in with Google
            </span>
          </button>
          {section === "login" && (
            <>
              <span className="text-[#cacaca]">New to Disney+?</span>
              <Link
                to={"/auth/signUp"}
                className="text-white ml-2 transition-all duration-200 hover:text-[#94d0ff] hover:underline"
              >
                Sign up
              </Link>
            </>
          )}
        </section>
      ) : (
        <>
          <section className="w-full max-w-sm m-auto mt-10 animation-translate transition-all">
            {section === "signUp" && (
              <span className="uppercase text-[#f9f9f98a] text-xs">
                step {steps + 1} of 2
              </span>
            )}
            <form className=" mt-1 w-full" onSubmit={(e) => handleSubmit(e)}>
              <h2 className="pb-3 text-2xl font-semibold">
                {section === "signUp"
                  ? "Create a password"
                  : "Enter your password"}
              </h2>
              <p className="pb-5 text-sm pr-10">
                {section === "signUp"
                  ? "You will use this email and password to log into your Disney+ account to watch your favorite shows and movies."
                  : "You will use this email and password to log into your Disney+ account to watch your favorite shows and movies."}
              </p>
              <div className="relative flex items-center">
                <input
                  type={inputContent.viewPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className={`bg-[#fafafa1a] py-3 pl-4 w-full rounded-[2px] mb-1 outline-0 border-[1px] ${
                    error ? "border-[#ff554c]" : "border-[#fafafa1a]"
                  } focus:border-[#f9f9f94d]`}
                  value={inputContent.password}
                  onChange={(e) =>
                    setInputContent({
                      ...inputContent,
                      password: e.target.value,
                    })
                  }
                />
                <button
                  className="absolute right-0 px-5 pb-1 text-lg"
                  onClick={(e) => {
                    e.preventDefault(),
                      setInputContent({
                        ...inputContent,
                        viewPassword: !inputContent.viewPassword,
                      });
                  }}
                >
                  {inputContent.viewPassword ? (
                    <BsEyeFill />
                  ) : (
                    <BsEyeSlashFill />
                  )}
                </button>
              </div>

              {error && (
                <p className="text-[#ff554c] text-xs mt-1 mb-2">{error}</p>
              )}

              <span className="text-[11px] text-[#f9f9f98a] flex">
                {section === "signUp"
                  ? "Use a minimum of 6 characters (case sensitive) with at least one number or special character."
                  : "(case sensitive)"}
              </span>

              {section === "signUp" && (
                <div className="mt-5 mb-3 border-l-[2px] border-[#f9f9f9af] px-3">
                  <p className="text-[#f9f9f98a] text-sm">
                    You'll be using this email to log in:
                  </p>
                  <p className="text-lg">{inputContent.email}</p>
                </div>
              )}
              <div className="relative">
                <input
                  type="submit"
                  value="log in"
                  className="bg-[#0072d2] py-3 pl-4 w-full rounded-[2px] my-4 uppercase font-semibold cursor-pointer hover:bg-[#0082f0]"
                />
                {loading && (
                  <div className="bg-[#0074d2] py-[10px] w-full rounded-[2px] my-4 absolute top-0">
                    <img
                      src="../loader.png"
                      alt="loader"
                      className="m-auto mt-0 animate-spin h-7"
                    />
                  </div>
                )}
              </div>
            </form>
          </section>
        </>
      )}
    </>
  );
};

export default AuthForm;
