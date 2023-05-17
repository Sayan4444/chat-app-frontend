"use client";

import { useState } from "react";

const Signin = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [typePass, setTypePass] = useState(true);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const changeHandler = (e) => {
    setformData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
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
        <button
          type='submit'
          className='bg-blue-500 w-full rounded-xl text-center py-3 text-white mt-6'
        >
          Signin
        </button>
      </form>
    </>
  );
};

export default Signin;
