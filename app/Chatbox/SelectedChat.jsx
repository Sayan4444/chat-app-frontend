import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import ShowMessages from "./ShowMessages";
import { useContextProvider } from "../Context/Store";
import io from "socket.io-client";
const socket = io.connect(process.env.NEXT_PUBLIC_SOCKET_URL);

export default function SelectedChat({
  type,
  chatBoxInfo,
  setShowModal,
  userData,
}) {
  const { selectedMessages, setSelectedMessages } = useContextProvider();
  const [message, setMessage] = useState("");
  const title = getTitle();

  useEffect(() => {
    socket.emit("join_room", chatBoxInfo._id);
  }, []);

  useEffect(() => {
    socket.on("receive_message", (messageObj) => {
      setSelectedMessages([...selectedMessages, messageObj]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

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
      <div className='bg-gray-200 mx-2 my-3 h-[82%] rounded-xl overflow-y-auto scrollbar-hide'>
        {selectedMessages.length !== 0 && (
          <ShowMessages
            loggedInId={userData._id}
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
          onKeyDown={(event) => {
            if (event.key !== "Enter" || message.trim().length === 0) return;
            sendMessage();
          }}
        />
      </div>
    </>
  );

  async function sendMessage() {
    const messageObj = {
      _id: Math.random() * Math.pow(10, 16),
      sender: userData,
      content: message,
      chatId: chatBoxInfo._id,
    };
    socket.emit("send_message", messageObj);
    setSelectedMessages([...selectedMessages, messageObj]);
    const res = await fetch("/api/message", {
      method: "POST",
      body: JSON.stringify({
        content: message,
        chatId: chatBoxInfo._id,
      }),
    });
    setMessage("");
    // const resData = await res.json();
    // setSelectedMessages([...selectedMessages, resData.message]);
  }

  function getTitle() {
    if (type === "user") {
      const name =
        chatBoxInfo.users[0]._id !== userData._id
          ? chatBoxInfo.users[0].name
          : chatBoxInfo.users[1].name;
      const firstName = name.split(" ")[0];
      return firstName;
    }
    return chatBoxInfo.chatName;
  }
}
