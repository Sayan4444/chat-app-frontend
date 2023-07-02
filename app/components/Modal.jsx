import React from "react";
import Backdrop from "./Backdrop";
import { RxCross2 } from "react-icons/rx";

export default function Modal({ children, setShowModal }) {
  return (
    <>
      <div onClick={clickHandler}>
        <Backdrop />
      </div>
      <div className='w-80 laptop:w-[35rem] z-20 fixed top-1/2 left-1/2 bg-white -translate-x-1/2 -translate-y-1/2 rounded-2xl pt-10 pb-20'>
        <button
          onClick={clickHandler}
          className='absolute right-3 top-3 hover:bg-gray-300 rounded-xl px-2 py-1 transition-all duration-300'
        >
          <RxCross2 size={20} />
        </button>
        {children}
      </div>
    </>
  );
  function clickHandler() {
    setShowModal(false);
  }
}
