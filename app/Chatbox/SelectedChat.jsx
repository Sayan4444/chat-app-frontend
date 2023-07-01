import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import ShowMessages from "./ShowMessages";
import { useContextProvider } from "../Context/Store";
// import io from "socket.io-client";
// const socket = io.connect(process.env.NEXT_PUBLIC_SOCKET_URL);
import { socket } from "../Context/Store";

export default function SelectedChat({
  type,
  chatBoxInfo,
  setShowModal,
  userData,
}) {
  const {
    selectedMessages,
    setSelectedMessages,
    chats,
    setChats,
    selectedChatIndex,
    setCacheMessages,
  } = useContextProvider();
  const [message, setMessage] = useState("");
  const title = getTitle();

  useEffect(() => {
    const container = document.getElementById("arrayContainer");
    container.scrollTop = container.scrollHeight;
  }, [selectedMessages]);

  useEffect(() => {
    socket.on("receive_message", (messageObj) => {
      handleMsgsUi(messageObj);
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
      <div
        className='bg-gray-200 mx-2 my-3 h-[80%] desktop:h-[85%] rounded-xl overflow-y-auto scrollbar-hide'
        id='arrayContainer'
      >
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

  function handleMsgsUi(messageObj) {
    //update latest message in chats
    setChats((chats) => {
      const chatIndex = chats.findIndex(
        (chat) => chat._id === messageObj.chat._id
      );
      if (!chats[chatIndex].latestMessage) {
        chats[chatIndex].latestMessage = messageObj;
      }
      chats[chatIndex].latestMessage.sender = messageObj.sender;
      chats[chatIndex].latestMessage.content = messageObj.content;
      return [...chats];
    });

    //update UI in chatBox
    if (chatBoxInfo._id === messageObj.chat._id)
      setSelectedMessages((prev) => [...prev, messageObj]);
    //update cached message
    setCacheMessages((prevCacheMessages) => {
      const index = prevCacheMessages.findIndex(
        (msg) => msg[0]?.chat._id === messageObj.chat._id
      );

      if (index === -1) return prevCacheMessages;

      const updatedCacheMessages = [...prevCacheMessages];
      updatedCacheMessages[index] = [...prevCacheMessages[index], messageObj];
      return updatedCacheMessages;
    });
  }

  async function sendMessage() {
    const messageObj = {
      _id: Math.random() * Math.pow(10, 16),
      sender: userData,
      content: message,
      chat: chatBoxInfo,
      createdAt: new Date(),
    };
    socket.emit("send_message", messageObj);
    handleMsgsUi(messageObj);
    setMessage("");
    await fetch("/api/message", {
      method: "POST",
      body: JSON.stringify({
        content: message,
        chatId: chatBoxInfo._id,
      }),
    });
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
