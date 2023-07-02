"use client";

import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useContextProvider } from "../Context/Store";
import Loading from "./Loading";
import Chat from "./Chat";
import useCustomHook from "../hooks/useCustomHook";

export default function ChatUsers() {
  const {
    userData,
    chats,
    setChats,
    selectedChatIndex,
    setChatBoxInfo,
    setShowCreateGroupChatModal,
    setSelectedMessages,
    myChatsLoader,
    setMyChatsLoader,
    setChatboxLoader,
    cacheMessages,
    setCacheMessages,
    showMyChatMobile,
  } = useContextProvider();

  useEffect(() => {
    (async () => {
      await getChats();
    })();
  }, []);

  useEffect(() => {
    if (selectedChatIndex === -1) return;
    const chat = chats[selectedChatIndex];
    setChatBoxInfo(chat);
  }, [chats]);

  useEffect(() => {
    if (selectedChatIndex === -1) return;
    const chat = chats[selectedChatIndex];
    setChatBoxInfo(chat);
    getMessages(chat._id);
  }, [selectedChatIndex]);

  const { updateSelectedChatIndex } = useCustomHook();

  return (
    <>
      <div
        className={`bg-white mb-20 mt-4 px-6 py-4 w-full laptop:w-[55%] rounded-xl relative ${
          showMyChatMobile ? "block" : "hidden"
        } laptop:block`}
      >
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
        {myChatsLoader && <Loading />}
        {/* Showing Chats */}
        {chats.length !== 0 && !myChatsLoader && (
          <div className='flex flex-col space-y-2 mt-7 h-[80%] laptop:h-[88%] desktop:h-[91%] overflow-y-auto scrollbar-hide'>
            {chats.map((chat, index) => (
              <div
                onClick={() => {
                  updateSelectedChatIndex(index);
                }}
                key={chat._id}
              >
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
    const msgs = cacheMessages.find((msg) => msg[0]?.chat._id === chatId);
    if (msgs) {
      if (!msgs[0]._id) return setSelectedMessages([]);
      return setSelectedMessages(msgs);
    }
    setChatboxLoader(true);
    const res = await fetch(`/api/message/${chatId}`, { cache: "no-cache" });
    setChatboxLoader(false);
    const resData = await res.json();
    if (resData.success === "false") return;
    const { messages } = resData;
    setSelectedMessages(messages);
    if (messages.length === 0) {
      return;
    }
    setCacheMessages((prev) => [...prev, messages]);
  }

  async function getChats() {
    setMyChatsLoader(true);
    const res = await fetch("/api/chat", { cache: "no-cache" });
    const resData = await res.json();
    const { chats } = resData;
    setChats(chats);
    setMyChatsLoader(false);
  }
}
