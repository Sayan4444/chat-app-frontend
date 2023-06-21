import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import ShowMessages from "./ShowMessages";
import { useContextProvider } from "../Context/Store";

export default function SelectedChat({
  type,
  chatBoxInfo,
  setShowModal,
  loggedInId,
}) {
  const { selectedMessages, setSelectedMessages } = useContextProvider();
  const [message, setMessage] = useState("");
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
      <div className='bg-gray-200 mx-2 my-3 h-[85%] rounded-xl overflow-y-auto scrollbar-hide'>
        {selectedMessages.length !== 0 && (
          <ShowMessages
            loggedInId={loggedInId}
            selectedMessages={selectedMessages}
          />
        )}
      </div>
      <div className=' mx-2 my-3'>
        <input
          type='text'
          placeholder='Enter message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='bg-gray-300 rounded-xl w-full pl-4 py-3 focus:outline-none focus:border-2 focus:border-blue-500 '
          onKeyDown={sendMessage}
        />
      </div>
    </>
  );

  async function sendMessage(event) {
    if (event.key !== "Enter" || message.trim().length === 0) return;
    const res = await fetch("/api/message", {
      method: "POST",
      body: JSON.stringify({
        content: message,
        chatId: chatBoxInfo._id,
      }),
    });
    const resData = await res.json();
    setSelectedMessages([...selectedMessages, resData.message]);
  }

  function getTitle() {
    if (type === "user") {
      const name =
        chatBoxInfo.users[0]._id !== loggedInId
          ? chatBoxInfo.users[0].name
          : chatBoxInfo.users[1].name;
      const firstName = name.split(" ")[0];
      return firstName;
    }
    return chatBoxInfo.chatName;
  }
}
