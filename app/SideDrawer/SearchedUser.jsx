import Image from "next/image";
import { useContextProvider } from "../Context/Store";

export default function SearchedUser({ user }) {
  const {
    setSideDrawerActive,
    chats,
    setChats,
    setSelectedChatIndex,
    setMyChatsLoader,
  } = useContextProvider();
  const { name, picture, _id } = user;
  return (
    <>
      <div
        onClick={clickHandler}
        className='bg-gray-200 px-3 py-2 text-left rounded-xl hover:bg-cyan-600 hover:cursor-pointer hover:text-white transition-all duration-300'
      >
        <div className='flex items-center space-x-6'>
          <div>
            <Image
              src={picture}
              width={30}
              height={30}
              alt='avatar'
              className='rounded-[50%]'
            />
          </div>
          <div>
            <div className='font-bold'>{name}</div>
          </div>
        </div>
      </div>
    </>
  );

  async function clickHandler() {
    setSideDrawerActive(false);
    const selectedUserId = _id;
    //If chat already esists
    for (let index = 0; index < chats.length; index++) {
      const chat = chats[index];
      if (chat.isGroupChat) continue;
      if (
        chat.users[0]._id === selectedUserId ||
        chat.users[1]._id === selectedUserId
      )
        return setSelectedChatIndex(index);
    }
    setMyChatsLoader(true);
    //Creating new chat
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ otherUserId: selectedUserId }),
    });
    const resData = await res.json();
    const { chat } = resData;
    setChats((prev) => [chat, ...prev]);
    setSelectedChatIndex(0);
    setMyChatsLoader(false);
  }
}
