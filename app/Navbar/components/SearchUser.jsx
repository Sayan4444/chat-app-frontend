"use client";
import { useContextProvider } from "@/app/Context/Store";
import { BsSearch } from "react-icons/bs";

export default function SearchUser() {
  const { setSideDrawerActive } = useContextProvider();
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
