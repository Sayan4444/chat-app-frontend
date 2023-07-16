import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import ShowMessages from "./ShowMessages";
import { useContextProvider } from "@/Context/Store";
import { socket } from "@/pages/index";
import MyChatNavigation from "../MyChatNavigation";

export default function SelectedChat({
  type,
  selectedChat,
  setShowModal,
  userData,
}) {
  const { setChats, selectedChatIndex, messages, setMessages } =
    useContextProvider();
  const [message, setMessage] = useState("");
  const title = getTitle();
  const showMessages = getShowMessages(messages, selectedChat);

  useEffect(() => {
    const container = document.getElementById("arrayContainer");
    container.scrollTop = container.scrollHeight;
  }, [messages, selectedChatIndex]);

  return (
    <>
      <div className='flex justify-between w-full px-6'>
        <div className='laptop:hidden'>
          <MyChatNavigation />
        </div>
        <div className='text-2xl'>{title}</div>
        <button
          className='hover:bg-gray-200 hoverEffect hover:scale-x-125 rounded-[50%] px-3 py-3'
          onClick={() => setShowModal(true)}
        >
          <AiFillEye />
        </button>
      </div>
      <div
        className='bg-gray-200 mx-2 my-3 h-[73%] laptop:h-[80%] desktop:h-[85%] rounded-xl overflow-y-auto scrollbar-hide'
        id='arrayContainer'
      >
        {showMessages.length !== 0 && (
          <ShowMessages loggedInId={userData._id} showMessages={showMessages} />
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

  function handleMsgsUi(messageObj) {
    setChats((prev) => {
      const chats = [...prev];
      const chatIndex = chats.findIndex(
        (chat) => chat._id === messageObj.chat._id
      );
      if (chatIndex === -1) return prev;
      chats[chatIndex].latestMessage = messageObj;
      return chats;
    });

    //update UI in chatBox
    setMessages((prev) => [...prev, messageObj]);
  }

  async function sendMessage(event) {
    if (event.key !== "Enter" || message.trim().length === 0) return;
    const messageObj = {
      _id: Math.random() * Math.pow(10, 18),
      content: message,
      sender: { ...userData, _id: userData._id.toString() },
      chat: { ...selectedChat, _id: selectedChat._id.toString() },
      createdAt: new Date(),
    };

    handleMsgsUi(messageObj);
    socket.emit("send_message", messageObj);
    setMessage("");
    await fetch("/api/message", {
      method: "POST",
      body: JSON.stringify({
        content: message,
        chatId: selectedChat._id,
      }),
    });
  }

  function getTitle() {
    if (type === "user") {
      const name =
        selectedChat.users[0]._id !== userData._id
          ? selectedChat.users[0].name
          : selectedChat.users[1].name;
      const firstName = name.split(" ")[0];
      return firstName;
    }
    return selectedChat.chatName;
  }
  function getShowMessages(messages, selectedChat) {
    if (!selectedChat || messages.length === 0) return [];
    return messages.filter((msg) => msg.chat._id === selectedChat._id);
  }
}
