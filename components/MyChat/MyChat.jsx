import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useContextProvider } from "@/Context/Store";
import Loading from "./Loading";
import Chat from "./Chat";
import useCustomHook from "@/hooks/useCustomHook";

export default function ChatUsers() {
  const {
    userData,
    chats,
    selectedChatIndex,
    setShowCreateGroupChatModal,
    showMyChatMobile,
    setNotifications,
  } = useContextProvider();

  useEffect(() => {
    if (selectedChatIndex === -1) return;
    const selectedChat = chats[selectedChatIndex];
    //deleting notification
    setNotifications((prev) => {
      const notifications = [...prev];
      const index = notifications.findIndex(
        (notification) => notification.chat._id === selectedChat._id
      );
      if (index === -1) return prev;
      notifications.splice(index, 1);
      return notifications;
    });
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
        {/* Showing Chats */}
        {chats.length !== 0 && (
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
}
