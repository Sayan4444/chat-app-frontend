import { useContextProvider } from "@/Context/Store";
import useCustomHook from "@/hooks/useCustomHook";
import { useEffect, useState } from "react";

export default function Notification({
  setNotifications,
  setShowNotifications,
  notification,
  buttonStyles,
}) {
  const { chats, setChats } = useContextProvider();
  const { updateSelectedChatIndex } = useCustomHook();

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
      //Creating new chat(in UI)
      const res = await fetch(`/api/chat/${notification.chat._id}`);
      const data = await res.json();
      const newChat = data.chat;

      setChats((prev) => [newChat, ...prev]);
      updateSelectedChatIndex(0);
    } else updateSelectedChatIndex(chatIndex);
    setShowNotifications(false);
  }
}
