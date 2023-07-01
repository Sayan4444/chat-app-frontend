import React from "react";

export default function NotificationNumber({ number }) {
  return (
    <div className='bg-red-700 z-10 px-2 py-1 text-xs text-white rounded-[50%] absolute top-0 -right-2'>
      {number}
    </div>
  );
}
