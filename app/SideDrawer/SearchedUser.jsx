import Image from "next/image";
import { useContextProvider } from "../Context/Store";

export default function SearchedUser({ user }) {
  const {
    setSelectedUserData,
    setSideDrawerActive,
    chats,
    setChats,
    setSelectedChatIndex,
  } = useContextProvider();
  const { name, picture, _id } = user;
  return (
    <>
      <div
        onClick={async () => {
          setSelectedUserData(user);
          setSideDrawerActive(false);
          await getChat();
        }}
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
  async function getChat() {
    const selectedUserId = _id;
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ otherUserId: selectedUserId }),
    });
    const resData = await res.json();
    const { chat } = resData;
    for (let i = 0; i < chats.length; i++) {
      if (chats[i]._id === chat._id) {
        return setSelectedChatIndex(i);
      }
    }
    setChats((prev) => [chat, ...prev]);
    setSelectedChatIndex(0);
  }
}
