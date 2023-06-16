import Image from "next/image";
import { useContextProvider } from "../Context/Store";

export default function SearchedUser({ searchedUser }) {
  const { chatBoxInfo, chats, selectedChatIndex, setChats } =
    useContextProvider();
  const { picture, name, _id } = searchedUser;
  return (
    <>
      <div
        onClick={addGroupUser}
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
  async function addGroupUser() {
    const { users } = chatBoxInfo;
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user._id === searchedUser._id) return;
    }
    users.push(searchedUser);
    chatBoxInfo.users = users;

    chats[selectedChatIndex] = chatBoxInfo;
    setChats(chats.slice());

    await fetch("/api/chat/groupAdd", {
      method: "PUT",
      body: JSON.stringify({
        chatId: chatBoxInfo._id,
        userId: searchedUser._id,
      }),
    });
  }
}
