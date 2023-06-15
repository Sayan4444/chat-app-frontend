import React from "react";
import { useContextProvider } from "../Context/Store";

export default function Chat({ selected, chat, loggedinId }) {
  const { setSelectedUserData } = useContextProvider();
  const chatName = getChatName();
  return (
    <>
      <div
        onClick={clickHandler}
        className={`px-3 py-2 text-left rounded-xl hover:cursor-pointer ${
          selected ? "bg-cyan-600 text-white" : "bg-gray-200 text-black "
        }`}
      >
        {chatName}
      </div>
    </>
  );

  function clickHandler() {
    if (chat.isGroupChat === true) return;
    const { users } = chat;
    if (users[0]._id !== loggedinId) return setSelectedUserData(users[0]);
    return setSelectedUserData(users[1]);
  }

  function getChatName() {
    if (chat.isGroupChat === true) return chat.chatName;
    const { users } = chat;
    // console.log(typeof loggedinId);
    if (users[0]._id !== loggedinId) return users[0].name;
    return users[1].name;
  }
}
