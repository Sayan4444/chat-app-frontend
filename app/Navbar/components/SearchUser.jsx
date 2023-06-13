"use client";
import { BsSearch } from "react-icons/bs";

export default function SearchUser({ setSideDrawerActive }) {
  return (
    <button
      className='flex items-center justify-between w-32 font-semibold hoverEffect'
      onClick={() => setSideDrawerActive((prev) => !prev)}
    >
      <span>
        <BsSearch />
      </span>
      Search User
    </button>
  );
}
