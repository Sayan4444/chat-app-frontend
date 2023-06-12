"use client";
import { RxCross2 } from "react-icons/rx";
import Backdrop from "../components/Backdrop";
import { useState } from "react";
import SearchedUser from "./SearchedUser";
import Loading from "../loading";

export default function SideDrawer({ sideDrawerActive, setSideDrawerActive }) {
  const [inputValue, setInputValue] = useState("");
  const [userLoading, setUserLoading] = useState(false);
  const [users, setUsers] = useState([]);
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

        <div className='flex w-full space-x-2 mx-3 my-4'>
          <input
            type='text'
            className='focus:outline-none border-2 focus:border-blue-500  rounded-lg pl-4'
            placeholder='enter name'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={clickHandler}
            className='bg-gray-300 px-2 py-2 rounded-lg'
          >
            Go
          </button>
        </div>
        {users.length !== 0 && (
          <div className='mx-4 flex flex-col space-y-3'>
            {users.map((user) => (
              <SearchedUser user={user} />
            ))}
          </div>
        )}
        {/* {userLoading && <Loading />} */}
        {/* {users.map((user) => (
          <SearchedUser user={user} />
        ))} */}
      </div>
    </>
  );

  async function clickHandler() {
    if (inputValue.length == 0) {
      setUsers([]);
      return;
    }
    setUserLoading(true);
    const res = await fetch(`/api/user?search=${inputValue}`, {
      cache: "no-cache",
    });
    const resData = await res.json();
    const { users } = resData;
    setUserLoading(false);
    setUsers(users);
  }
}
