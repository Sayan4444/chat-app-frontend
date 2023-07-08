import { useContextProvider } from "@/app/Context/Store";
import useCustomHook from "@/app/hooks/useCustomHook";
import { useEffect, useState } from "react";

export default function Notification({
  setNotifications,
  setShowNotifications,
  notification,
  buttonStyles,
}) {
  const { chats, setChats, setMyChatsLoader } = useContextProvider();
  const { updateSelectedChatIndex } = useCustomHook();
  const [chatsUpdated, setChatsUpdated] = useState(false);
  useEffect(() => {
    if (chatsUpdated) {
      updateSelectedChatIndex(0);
      setChatsUpdated(false);
    }
  }, [chatsUpdated, updateSelectedChatIndex]);
  return (
    <>
      <button onClick={notificationClicked} className={buttonStyles}>
        New messages from{" "}
        {notification.chat.isGroupChat
          ? notification.chat.chatName
          : notification.sender.name}
      </button>
    </>
  );

  async function notificationClicked(index) {
    setNotifications((prev) => {
      const notifications = [...prev];
      notifications.splice(index, 1);
      return notifications;
    });
    const chatIndex = chats.findIndex(
      (chat) => chat._id === notification.chat._id
    );
    if (chatIndex === -1) {
      setMyChatsLoader(true);
      //Creating new chat
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ otherUserId: notification.sender._id }),
        // body: JSON.stringify({ otherUserId: selectedUserId }),
      });
      const resData = await res.json();
      const { chat } = resData;
      setChats((prev) => [chat, ...prev]);
      setChatsUpdated(true);
      // updateSelectedChatIndex(0);
      setMyChatsLoader(false);
    } else updateSelectedChatIndex(chatIndex);
    setShowNotifications(false);
  }
}
