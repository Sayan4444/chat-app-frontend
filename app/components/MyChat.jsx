"use client";
import { AiFillEye } from "react-icons/ai";

const MyChat = () => {
  return (
    <div className='bg-white mb-20 mt-4 py-4 w-full rounded-xl'>
      <div className='flex justify-between w-full px-6'>
        <div className='text-2xl'>Sayan</div>
        <button>
          <AiFillEye />
        </button>
      </div>
      <div className='bg-gray-200 my-3 h-[93%] rounded-xl mx-2 relative'>
        <input
          type='text'
          placeholder='Enter message'
          className='absolute bottom-0 bg-gray-300 rounded-xl w-full pl-4 py-3 focus:outline-none focus:border-2 focus:border-blue-500'
        />
      </div>
    </div>
  );
};

export default MyChat;
