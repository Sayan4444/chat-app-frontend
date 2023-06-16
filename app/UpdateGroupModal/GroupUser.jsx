import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useContextProvider } from "../Context/Store";

export default function GroupUser({ user, loggedInId }) {
  const { chats, setChats, selectedChatIndex, chatBoxInfo } =
    useContextProvider();
  if (user._id === loggedInId) return <></>;
  const { name } = user;
  return (
    <div className='bg-fuchsia-800 text-white flex space-x-2 items-center pl-3 pr-2 py-2 rounded-xl'>
      <span className='text-xs'>{name}</span>
      <span onClick={removeGroupUser} className='hover:cursor-pointer'>
        <RxCross2 />
      </span>
    </div>
  );

  async function removeGroupUser() {
    const { users } = chatBoxInfo;
    for (let i = 0; i < users.length; i++)
      if (users[i]._id === user._id) {
        users.splice(i, 1);
        chatBoxInfo.users = users;
        break;
      }
    chats[selectedChatIndex] = chatBoxInfo;
    setChats(chats.slice());

    await fetch("/api/chat/groupRemove", {
      method: "PUT",
      body: JSON.stringify({
        chatId: chatBoxInfo._id,
        userId: user._id,
      }),
    });
  }
}
