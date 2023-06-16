import { AiFillEye } from "react-icons/ai";

export default function SelectedChat({ type, chatBoxInfo, setShowModal }) {
  const title = getTitle();

  return (
    <>
      <div className='flex justify-between w-full px-6'>
        <div className='text-2xl'>{title}</div>
        <button
          className='hover:bg-gray-200 hoverEffect hover:scale-x-125 rounded-[50%] px-3 py-3'
          onClick={() => setShowModal(true)}
        >
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
    </>
  );
  function getTitle() {
    if (type === "user") {
      const { name } = chatBoxInfo;
      const firstName = name.split(" ")[0];
      return firstName;
    }
    return chatBoxInfo.chatName;
  }
}
