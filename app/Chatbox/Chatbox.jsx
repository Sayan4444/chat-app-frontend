"use client";

import { useContextProvider } from "../Context/Store";
import Loading from "./Loading";
import NoSelectedChat from "./NoSelectedChat";
import SelectedChat from "./SelectedChat";

export default function Chatbox() {
  const {
    userData,
    chatBoxInfo,
    setShowSelectedUserProfileModal,
    setShowUpdateGroupChatModal,
    chatboxLoader,
    setChatboxLoader,
  } = useContextProvider();
  const type = chatBoxInfo.isGroupChat ? "group" : "user";
  return (
    <div className='bg-white mb-20 mt-4 py-4 w-full rounded-xl relative'>
      {!chatboxLoader &&
        (Object.keys(chatBoxInfo).length === 0 ? (
          <NoSelectedChat />
        ) : (
          <SelectedChat
            userData={userData}
            type={type}
            chatBoxInfo={chatBoxInfo}
            setShowModal={
              type === "group"
                ? setShowUpdateGroupChatModal
                : setShowSelectedUserProfileModal
            }
          />
        ))}
      {chatboxLoader && <Loading />}
    </div>
  );
}
