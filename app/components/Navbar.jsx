"use client";
import { BsSearch } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { useContextProvider } from "../Context/Store";

const Navbar = () => {
  const { setSideDrawerActive } = useContextProvider();
  return (
    <>
      <nav className='w-screen bg-white flex justify-between items-center py-5 px-5'>
        <button
          className='flex items-center justify-between w-32 font-semibold'
          onClick={() => setSideDrawerActive((prev) => !prev)}
        >
          <span>
            <BsSearch />
          </span>
          Search User
        </button>
        <div className='text-xl'>Talk-A-Tive</div>
        <div className='flex justify-between w-14'>
          <button>
            <FaBell />
          </button>
          <button>icon</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
