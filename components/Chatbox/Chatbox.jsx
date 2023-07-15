import { useContextProvider } from "@/Context/Store";
import NoSelectedChat from "./NoSelectedChat";
import SelectedChat from "./MessagingArea/SelectedChat";

export default function Chatbox() {
  const {
    userData,
    setShowSelectedUserProfileModal,
    setShowUpdateGroupChatModal,
    showMyChatMobile,
    chats,
    selectedChatIndex,
  } = useContextProvider();
  const selectedChat = chats[selectedChatIndex];
  const type = selectedChat?.isGroupChat ? "group" : "user";
  return (
    <div
      className={`bg-white mb-20 mt-4 py-4 w-full rounded-xl relative ${
        showMyChatMobile ? "hidden" : "block"
      } laptop:block`}
    >
      {!selectedChat ? (
        <NoSelectedChat />
      ) : (
        <SelectedChat
          userData={userData}
          type={type}
          selectedChat={selectedChat}
          setShowModal={
            type === "group"
              ? setShowUpdateGroupChatModal
              : setShowSelectedUserProfileModal
          }
        />
      )}
    </div>
  );
}
