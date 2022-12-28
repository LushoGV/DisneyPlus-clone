import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup} from "firebase/auth";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { auth, provider } from "../../database/firebase";
import { addInitialData } from "../../features/user/userSlice";
import { getUser } from "../../utils/FirebaseFunctions";

const AuthForm = () => {
  const [steps, setSteps] = useState<number>(0);
  const [error, setError] = useState<boolean | string>(false);
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [inputContent, setInputContent] = useState({
    email: "",
    password: "",
  });
  const { section } = useParams();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    const res = await signInWithPopup(auth, provider);
    const resUser = await getUser(res.user.uid, res.user.displayName)
    dispatch(addInitialData(resUser))
    navigate("/");
  };

  const handleAuth = async () => {
    setLoading(true)
    try {
      if(section === "signUp"){
        const res = await createUserWithEmailAndPassword(
          auth,
          inputContent.email,
          inputContent.password
        )
        const resUser = await getUser(res.user.uid, res.user.displayName)
        dispatch(addInitialData(resUser))
      }else{
        const res = await signInWithEmailAndPassword(
          auth,
          inputContent.email,
          inputContent.password
        );
        const resUser = await getUser(res.user.uid, res.user.displayName)
        dispatch(addInitialData(resUser))
      }

          setTimeout(()=>{
            setLoading(false)
            navigate("/");     
          },1000)
          
    } catch (error) {
      setLoading(false)
      setError(
        `We couldn't log you in. Please check your email and password and try again. If you'd like to reset your password, use "Forgot Password" link below. (Error Code 14).`
      );
    }
  };

  const nextStep = (e: FormEvent) => {
    e.preventDefault();
    if (inputContent.email !== "") {
      setError(false);
      setLoading(true)
      setTimeout(() => {
        setSteps(1);
        setLoading(false)
      },1000)
      
    } else {
      setError(
        `Sorry, we are having trouble creating your account. Please re-enter your email and password and try again. If the problem persists, contact Disney+ Support (Error Code 6).`
      );
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputContent.password !== "") {
      setError(false);
      handleAuth();
    } else {
      setError(`Please enter your current password.`);
    }
  };

  return (
    <>
      {steps === 0 ? (
        <section className={`w-full max-w-sm m-auto mt-10`}>
          <form className=" mt-0 w-full" onSubmit={(e) => nextStep(e)}>
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
           { loading && <div className="bg-[#0074d2] py-[10px] w-full rounded-[2px] my-4 absolute top-0">
              <img src="../loader.png" alt="loader" className="m-auto mt-0 animate-spin h-7" />
            </div>}
            </div>
            
          </form>
          <div className="relative flex flex-col items-center text-[#f9f9f960] my-3">
            <hr className="w-full border-[#f9f9f960]" />
            <span className="absolute top-[-8px] bg-[#1a1d29] px-[5px] text-xs">
              or
            </span>
          </div>
          <button
            className="bg-[#ffff] text-[#2b2b2b] py-3 pl-4 w-full rounded-[2px] my-4 uppercase font-semibold cursor-pointer hover:bg-[#ebebeb]"
            onClick={handleGoogleAuth}
          >
            Sign in with Google
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
          <section className=" w-full max-w-sm m-auto mt-10">
            <form className=" mt-0 w-full" onSubmit={(e) => handleSubmit(e)}>
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
              <input
                type="text"
                placeholder="Password"
                name="password"
                className={`bg-[#fafafa1a] py-3 pl-4 w-full rounded-[2px] mb-1 outline-0 border-[1px] ${
                  error ? "border-[#ff554c]" : "border-[#fafafa1a]"
                } focus:border-[#f9f9f94d]`}
                value={inputContent.password}
                onChange={(e) =>
                  setInputContent({ ...inputContent, password: e.target.value })
                }
              />
              {error && (
                <p className="text-[#ff554c] text-xs mt-1 mb-2">{error}</p>
              )}

              <span className="text-[11px] text-[#f9f9f98a] flex">
                {section === "signUp"
                  ? "Use a minimum of 6 characters (case sensitive) with at least one number or special character."
                  : "(case sensitive)"}
              </span>

              {section === "signUp" && (
                <div className="my-3">
                  <p>You'll be using this email to log in:</p>
                  <p>{inputContent.email}</p>
                </div>
              )}
              <div className="relative">
              <input
                type="submit"
                value="log in"
                className="bg-[#0072d2] py-3 pl-4 w-full rounded-[2px] my-4 uppercase font-semibold cursor-pointer hover:bg-[#0082f0]"
              />
              { loading && <div className="bg-[#0074d2] py-[10px] w-full rounded-[2px] my-4 absolute top-0">
              <img src="../loader.png" alt="loader" className="m-auto mt-0 animate-spin h-7" />
            </div>}
            </div>
            </form>
          </section>
        </>
      )}
    </>
  );
};

export default AuthForm;
