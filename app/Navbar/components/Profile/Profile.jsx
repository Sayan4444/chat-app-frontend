"use client";
import { FaBell } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import DropdownMenu from "./DropdownMenu";
import { useState } from "react";
import Image from "next/image";
import { useContextProvider } from "@/app/Context/Store";

export default function Profile() {
  const { userData } = useContextProvider();
  const { picture } = userData;
  const [showDropdown, setShowdropDown] = useState(false);
  return (
    <>
      <div className='flex w-24 relative'>
        <button className='hoverEffect hover:scale-125'>
          <FaBell />
        </button>
        <button
          onClick={() => setShowdropDown(true)}
          className='flex items-center px-3 py-2 ml-3 rounded-xl hover:bg-gray-300 hoverEffect'
        >
          <Image
            src={picture}
            width={30}
            height={30}
            alt='avatar'
            className='rounded-[50%]'
          />
          <MdArrowDropDown />
        </button>
        {showDropdown && <DropdownMenu setShowdropDown={setShowdropDown} />}
      </div>
    </>
  );
}
