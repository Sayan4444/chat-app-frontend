import { useState } from "react";
import Modal from "../components/Modal";
import { useContextProvider } from "../Context/Store";
import Spinner from "../components/Spinner";
import { toastError, toastSuccess } from "../utils/toast";

export default function UpdateUserDetails({ setShowUpdateUserSettingsModal }) {
  const { userData, setUserData } = useContextProvider();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ...userData,
    prevPassword: "",
    newPassword: "",
  });
  const [typePass, setTypePass] = useState(true);

  const inputClassName =
    "focus:outline-none border-2 border-gray-200 px-4 py-2 mt-2 focus:border-blue-500 rounded-xl w-full";

  const titleClassName = "mt-2";
  return (
    <Modal setShowModal={setShowUpdateUserSettingsModal}>
      <div className='flex flex-col items-center space-y-6'>
        <div className='text-4xl'>User Settings</div>
      </div>
      <form onSubmit={submitHandler} className='mx-5 mt-3'>
        <div>Name</div>
        <input
          type='text'
          name='name'
          placeholder='Enter name'
          className={inputClassName}
          value={formData.name}
          onChange={changeHandler}
        />
        <div className={titleClassName}>Email Address</div>
        <input
          type='text'
          name='email'
          placeholder='Enter Your Email Address'
          className={inputClassName}
          value={formData.email}
          onChange={changeHandler}
        />
        <div className={titleClassName}>
          Previous Password <span className='text-red-600'>*</span>
        </div>
        <div className='relative'>
          <input
            type={typePass ? "password" : "text"}
            name='prevPassword'
            placeholder='Enter previous password'
            className={inputClassName}
            value={formData.prevPassword}
            onChange={changeHandler}
          />
          {formData.prevPassword.length !== 0 && (
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
        <div className={titleClassName}>New Password</div>
        <input
          type='password'
          name='newPassword'
          autoComplete='off'
          placeholder='Enter new password'
          className={inputClassName}
          value={formData.confirmPassword}
          onChange={changeHandler}
        />
        <div className={titleClassName}>Upload Picture</div>
        <input
          type='file'
          name='picture'
          accept='image/*'
          onChange={handlePictureChange}
        />
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
            className='bg-blue-600 w-full rounded-xl text-center py-3 text-white mt-6'
          >
            Update
          </button>
        )}
      </form>
    </Modal>
  );
  async function submitHandler(e) {
    e.preventDefault();
    const { prevPassword } = formData;
    try {
      setLoading(true);
      if (!prevPassword.trim().length)
        throw new Error("Enter previous password");

      const res = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      const resData = await res.json();
      if (resData.success === "false") throw new Error(resData.error);
      setUserData(resData.user);
      toastSuccess("Profile Updated");
      setShowUpdateUserSettingsModal(false);
    } catch (error) {
      toastError(error.message);
    }
    setLoading(false);
  }

  function changeHandler(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (formData.prevPassword.trim().length === 0) setTypePass(true);
  }

  function handlePictureChange(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        picture: reader.result,
      }));
      console.log(reader.result);
    };
    reader.onerror = (err) => {
      console.log("Error", err);
    };
  }
}
