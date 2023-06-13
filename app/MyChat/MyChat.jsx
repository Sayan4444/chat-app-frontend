"use client";

import { AiOutlinePlus } from "react-icons/ai";

export default function ChatUsers() {
  return (
    <>
      <div className='bg-white mb-20 mt-4 px-6 py-4 w-[55%] rounded-xl'>
        <div className='flex justify-between w-full'>
          <div className='text-2xl'>My Chats</div>
          <button className='flex items-center space-x-2 bg-gray-200 rounded-xl px-3 py-2 hoverEffect hover:bg-gray-300'>
            <span>New Group Chat</span>
            <span>
              <AiOutlinePlus />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
