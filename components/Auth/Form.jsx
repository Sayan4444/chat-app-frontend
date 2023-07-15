import { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

const Form = () => {
  const [authMode, setAuthMode] = useState("signin");
  return (
    <>
      <div className='flex items-center justify-between space-x-5 px-6'>
        <button
          className={`${
            authMode === "signin" ? "bg-blue-300" : ""
          } rounded-3xl py-4 w-full`}
          onClick={() => setAuthMode("signin")}
        >
          Signin
        </button>
        <button
          className={`${
            authMode === "signup" ? "bg-blue-300" : ""
          } rounded-3xl py-4 w-full`}
          onClick={() => setAuthMode("signup")}
        >
          Signup
        </button>
      </div>
      {authMode === "signin" && <Signin />}
      {authMode === "signup" && <Signup />}
    </>
  );
};

export default Form;
