import React from "react";

export default function Backdrop() {
  return (
    <div className='fixed top-0 left-0 z-10 w-screen h-screen p-4 overflow-x-hidden overflow-y-auto bg-gray-800 bg-opacity-60 ' />
  );
}
