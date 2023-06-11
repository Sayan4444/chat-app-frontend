"use client";
import { useContextProvider } from "../Context/Store";
import { RxCross2 } from "react-icons/rx";

const SideDrawer = () => {
  const { sideDrawerActive, setSideDrawerActive } = useContextProvider();

  return (
    <>
      {/* Backdrop */}
      {sideDrawerActive && (
        <div
          className={`fixed top-0 left-0 z-10 w-screen h-screen p-4 overflow-x-hidden overflow-y-auto bg-gray-800 bg-opacity-60 `}
          onClick={() => setSideDrawerActive(false)}
        />
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
            className='focus:outline-none border-2 focus:border-blue-500  rounded-lg'
          />
          <button className='bg-gray-300 px-2 py-2 rounded-lg'>Go</button>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
