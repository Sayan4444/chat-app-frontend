"use client";
import { FaBell } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { MdArrowDropDown } from "react-icons/md";
import DropdownMenu from "./DropdownMenu";
import { useState } from "react";
import Image from "next/image";

export default function Profile({ setShowProfileModal, userData }) {
  const { picture } = userData;
  const [showDropdown, setShowdropDown] = useState(false);
  return (
    <div className='flex w-24 relative'>
      <button>
        <FaBell />
      </button>
      <button
        onClick={() => setShowdropDown(true)}
        className='flex items-center px-3 py-2 ml-3 rounded-xl hover:bg-gray-300 transition-all duration-300'
      >
        <Image
          src={picture}
          width={30}
          height={30}
          alt='avatar'
          className='rounded-[50%]'
        />
        {/* <RxAvatar className='text-3xl' /> */}
        <MdArrowDropDown />
      </button>
      {showDropdown && (
        <DropdownMenu
          setShowdropDown={setShowdropDown}
          setShowProfileModal={setShowProfileModal}
        />
      )}
    </div>
  );
}
