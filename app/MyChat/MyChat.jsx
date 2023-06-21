"use client";

import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useContextProvider } from "../Context/Store";
import Loading from "./Loading";
import Chat from "./Chat";

export default function ChatUsers() {
  const {
    userData,
    chats,
    setChats,
    selectedChatIndex,
    setSelectedChatIndex,
    setChatBoxInfo,
    setShowCreateGroupChatModal,
    setSelectedMessages,
  } = useContextProvider();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await getChats();
    })();
  }, []);

  useEffect(() => {
    if (selectedChatIndex === -1) return;
    const chat = chats[selectedChatIndex];
    setChatBoxInfo(chat);
    (async () => await getMessages(chat._id))();
    // getMessages(chat._id);
  }, [selectedChatIndex, chats]);

  return (
    <>
      <div className='bg-white mb-20 mt-4 px-6 py-4 w-[55%] rounded-xl relative'>
        <div className='flex justify-between w-full'>
          <div className='text-2xl'>My Chats</div>
          <button
            onClick={() => setShowCreateGroupChatModal(true)}
            className='flex items-center space-x-2 bg-gray-200 rounded-xl px-3 py-2 hoverEffect hover:bg-gray-300'
          >
            <span>New Group Chat</span>
            <span>
              <AiOutlinePlus />
            </span>
          </button>
        </div>
        {/* Loading Chats */}
        {loading && <Loading />}
        {/* Showing Chats */}
        {chats.length !== 0 && (
          <div className='flex flex-col space-y-2 mt-7'>
            {chats.map((chat, index) => (
              <div onClick={() => setSelectedChatIndex(index)} key={chat._id}>
                <Chat
                  chat={chat}
                  loggedinId={userData._id}
                  selected={index === selectedChatIndex}
                />
              </div>
            ))}
          </div>
        )}
        {/* Showing Chats */}
      </div>
    </>
  );

  async function getMessages(chatId) {
    console.log(chatId);
    const res = await fetch(`/api/message/${chatId}`, { cache: "no-cache" });
    const resData = await res.json();
    if (resData.success === "false") return;
    const { messages } = resData;
    // console.log(resData);
    setSelectedMessages(messages);
  }

  async function getChats() {
    setLoading(true);
    const res = await fetch("/api/chat", { cache: "no-cache" });
    const resData = await res.json();
    const { chats } = resData;
    setChats(chats);
    setLoading(false);
  }
}
