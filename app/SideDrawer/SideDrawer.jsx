"use client";
import { RxCross2 } from "react-icons/rx";
import Backdrop from "../components/Backdrop";
import { useEffect, useState } from "react";
import SearchedUser from "./SearchedUser";
import Loading from "./Loading";

export default function SideDrawer({ sideDrawerActive, setSideDrawerActive }) {
  const [inputValue, setInputValue] = useState("");
  const [userLoading, setUserLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [errMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let timeoutId = setTimeout(async () => {
      await searchUser();
    }, 300);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [inputValue]);

  return (
    <>
      {sideDrawerActive && (
        <div onClick={() => setSideDrawerActive(false)}>
          <Backdrop />
        </div>
      )}
      <div
        className={`fixed ${
          sideDrawerActive ? "left-0" : "-left-1/4"
        }  h-screen bg-white z-10 w-[20%] transition-all duration-300`}
      >
        <div className='flex justify-between mx-4 mt-2 items-center'>
          <div className='text-xl font-bold'> Search Users</div>
          <button onClick={() => setSideDrawerActive(false)}>
            <RxCross2 size={20} />
          </button>
        </div>

        <div className='my-4 mx-4'>
          <input
            type='text'
            className='focus:outline-none border-2 focus:border-blue-500  rounded-lg pl-4 py-2 w-full'
            placeholder='enter name'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        {users.length !== 0 && (
          <div className='mx-4 flex flex-col space-y-3'>
            {users.map((user) => (
              <SearchedUser user={user} key={user._id} />
            ))}
          </div>
        )}
        {errMessage.length !== 0 && (
          <div className='mx-4 text-red-500 font-bold text-2xl'>
            {errMessage}
          </div>
        )}
        {userLoading && <Loading />}
      </div>
    </>
  );

  async function searchUser() {
    setUsers([]);
    setErrorMessage("");
    setUserLoading(true);

    // Case 1 :when input field has no value
    if (inputValue.length == 0) {
      setUserLoading(false);
      return;
    }

    const res = await fetch(`/api/user?search=${inputValue}`, {
      cache: "no-cache",
    });
    const resData = await res.json();
    // Case 2: when input field value is false
    if (resData.success === "false") {
      setUserLoading(false);
      setErrorMessage(resData.error);
      return;
    }
    // Case 3: input field value is true
    const { users } = resData;
    setUserLoading(false);
    setUsers(users);
  }
}
