import React from "react";
import Backdrop from "../components/Backdrop";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";

export default function ProfileModal({ userData, setShowProfileModal }) {
  const { name, email, picture } = userData;
  return (
    <>
      <div onClick={() => setShowProfileModal(false)}>
        <Backdrop />
      </div>
      <div className='w-[35rem] z-20 fixed top-1/2 left-1/2 bg-white -translate-x-1/2 -translate-y-1/2 rounded-2xl pt-10 pb-20'>
        <button
          onClick={() => setShowProfileModal(false)}
          className='absolute right-8 top-3 hover:bg-gray-300 rounded-xl px-2 py-1 transition-all duration-300'
        >
          <RxCross2 size={20} />
        </button>
        <div className='flex flex-col items-center space-y-6'>
          <div className='text-4xl'>{name}</div>
          <div className=''>
            <Image
              src={picture}
              width={100}
              height={100}
              alt='profile picture'
              className='rounded-[50%]'
              onClick={() => window.open(picture, "_blank")}
            />
          </div>
          <div className='ml-10 self-start text-3xl'>
            <div>Email:</div>
            <div>{email}</div>
          </div>
        </div>
        <button
          onClick={() => setShowProfileModal(false)}
          className='absolute bottom-3 right-8 p-3 bg-gray-200 rounded-2xl hover:bg-gray-300 transition-all duration-300'
        >
          Close
        </button>
      </div>
    </>
  );
}
