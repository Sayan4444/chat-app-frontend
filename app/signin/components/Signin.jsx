"use client";

import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";
import { useRouter } from "next/navigation";
import { useContextProvider } from "@/app/Context/Store";
import { toastError } from "@/app/utils/toast";

export default function Signin() {
  const { setUserData } = useContextProvider();
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [typePass, setTypePass] = useState(true);

  const inputClassName =
    "focus:outline-none border-2 border-gray-200 px-4 py-2 mt-2 focus:border-blue-500 rounded-xl w-full";
  return (
    <>
      <form onSubmit={submitHandler} className='mx-5 mt-10'>
        <div>
          Email Address <span className='text-red-600'>*</span>
        </div>
        <input
          type='text'
          name='email'
          placeholder='Enter Your Email Address'
          className={inputClassName}
          value={formData.email}
          onChange={changeHandler}
        />
        <div className='mt-8'>
          Password <span className='text-red-600'>*</span>
        </div>
        <div className='relative'>
          <input
            type={typePass ? "password" : "text"}
            name='password'
            placeholder='Enter password'
            className={inputClassName}
            value={formData.password}
            onChange={changeHandler}
          />
          {formData.password.length !== 0 && (
            <button
              className='absolute bottom-1 right-2 bg-gray-200 px-2 py-1 font-medium rounded-2xl w-16'
              onClick={(e) => {
                e.preventDefault();
                setTypePass((prev) => !prev);
              }}
            >
              {typePass ? "Show" : "Hide"}
            </button>
          )}
        </div>
        {loading && (
          <button
            className='bg-blue-300 w-full rounded-xl text-center py-3 text-white mt-6 hover:cursor-not-allowed'
            disabled
          >
            <Spinner />
          </button>
        )}
        {!loading && (
          <button
            type='submit'
            className='bg-blue-500 w-full rounded-xl text-center py-3 text-white mt-6'
          >
            Signin
          </button>
        )}
        <button
          className='bg-red-600 w-full rounded-xl text-center py-3 text-white mt-3'
          onClick={(e) => {
            e.preventDefault();
            setformData({
              email: "guest@example.com",
              password: "123456",
            });
          }}
        >
          Get Guest User Credentials
        </button>
      </form>
      <ToastContainer />
    </>
  );

  function changeHandler(e) {
    setformData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (formData.password.length === 0) setTypePass(true);
  }

  async function submitHandler(e) {
    e.preventDefault();
    const { email, password } = formData;
    try {
      setloading(true);
      if (!email || !password) throw new Error("Fill all fields properly");
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      const resData = await res.json();
      if (resData.success === "false") throw new Error(resData.error);
      setUserData(resData.user);
      router.push("/");
    } catch (error) {
      toastError(error.message);
    }
    setloading(false);
    return;
  }
}
