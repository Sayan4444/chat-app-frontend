import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";
import { useRouter } from "next/navigation";
import { useContextProvider } from "@/Context/Store";
import { toastError } from "@/utils/toast";
import handlePictureChange from "@/utils/handlePictureChange";

export default function Signup() {
  const { setUserData } = useContextProvider();
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    picture: "",
  });
  const [typePass, setTypePass] = useState(true);
  const [pictureUploadLoader, setPictureUploadLoader] = useState(false);

  const inputClassName =
    "focus:outline-none border-2 border-gray-200 px-4 py-2 mt-2 focus:border-blue-500 rounded-xl w-full";

  const titleClassName = "mt-2";

  return (
    <>
      <form onSubmit={submitHandler} className='mx-5 mt-3'>
        <div>
          Name <span className='text-red-600'>*</span>
        </div>
        <input
          type='text'
          name='name'
          placeholder='Enter name'
          className={inputClassName}
          value={formData.name}
          onChange={changeHandler}
        />
        <div className={titleClassName}>
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
        <div className={titleClassName}>
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
        <div className={titleClassName}>
          Confirm Password <span className='text-red-600'>*</span>
        </div>
        <input
          type='password'
          name='confirmPassword'
          autoComplete='off'
          placeholder='Confirm password'
          className={inputClassName}
          value={formData.confirmPassword}
          onChange={changeHandler}
        />
        <div className={titleClassName}>Upload Picture</div>
        <div className='relative'>
          <input
            type='file'
            name='picture'
            accept='image/*'
            onChange={(e) =>
              handlePictureChange(
                e,
                setPictureUploadLoader,
                formData.picture,
                setFormData
              )
            }
          />
          {pictureUploadLoader && (
            <span className='absolute right-40'>
              <Spinner />
            </span>
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
            disabled={pictureUploadLoader}
            className={` w-full rounded-xl text-center py-3 text-white mt-6 ${
              pictureUploadLoader
                ? "hover:cursor-not-allowed bg-blue-300"
                : "bg-blue-600"
            }`}
          >
            Signup
          </button>
        )}
      </form>
      <ToastContainer />
    </>
  );

  async function submitHandler(e) {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    try {
      setloading(true);
      if (!name || !email || !password || !confirmPassword)
        throw new Error("Fill all fields properly");
      if (password !== confirmPassword)
        throw new Error("password and confirm password not matching");
      const res = await fetch("/api/auth/signup", {
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
  }
  function changeHandler(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (formData.password.length === 0) setTypePass(true);
  }
}
