"use client";
import { RxCross2 } from "react-icons/rx";
import Backdrop from "../components/Backdrop";
import { useEffect, useState } from "react";
import SearchedUser from "./SearchedUser";
import Loading from "./Loading";
import { useContextProvider } from "../Context/Store";
import searchUser from "../utils/searchUser";

export default function SideDrawer() {
  const { sideDrawerActive, setSideDrawerActive, userData } =
    useContextProvider();
  const [userName, setUserName] = useState("");
  const [userLoading, setUserLoading] = useState(false);
  const [users, setUsers] = useState([]); //searched users
  const [errMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let timeoutId = setTimeout(async () => {
      await searchUser(
        userData._id,
        setUsers,
        setErrorMessage,
        setUserLoading,
        userName
      );
    }, 300);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [userName]);

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
          <button
            className='hoverEffect hover:bg-gray-200 hover:scale-125 rounded-[50%] p-2'
            onClick={() => setSideDrawerActive(false)}
          >
            <RxCross2 size={20} />
          </button>
        </div>

        <div className='my-4 mx-4'>
          <input
            type='text'
            className='focus:outline-none border-2 focus:border-blue-500  rounded-lg pl-4 py-2 w-full'
            placeholder='enter name'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        {/* Displaying users array */}
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
      {/* Displaying users array */}
    </>
  );
}
