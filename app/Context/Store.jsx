"use client";
import { useState, createContext, useContext, useEffect } from "react";
import io from "socket.io-client";
export const socket = io.connect(process.env.NEXT_PUBLIC_SOCKET_URL);

export const Context = createContext();
export const useContextProvider = () => useContext(Context);

export default function Store({ children }) {
  const [userData, setUserData] = useState({}); //signedIn user data
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [cacheMessages, setCacheMessages] = useState([]);
  const [chatBoxInfo, setChatBoxInfo] = useState({}); //information to show on chatbox selected via MyChat/SideDrawer/contains chats
  const [selectedChatIndex, setSelectedChatIndex] = useState(-1); //selected chat in MyChat
  const [chats, setChats] = useState([]); //all the chats of the loggedin user MyChat

  const [showSelectedUserProfileModal, setShowSelectedUserProfileModal] =
    useState(false); //Eye Button

  const [showProfileModal, setShowProfileModal] = useState(false); //Bell Button
  const [showCreateGroupChatModal, setShowCreateGroupChatModal] =
    useState(false); //MyChat
  const [showUpdateGroupChatModal, setShowUpdateGroupChatModal] =
    useState(false); //Eye
  const [showUpdateUserSettingsModal, setShowUpdateUserSettingsModal] =
    useState(false); //Bell Botton
  const [notifications, setNotifications] = useState([]); //messages

  const [sideDrawerActive, setSideDrawerActive] = useState(false); //Side Drawer

  const [showMyChatMobile, setShowMyChatMobile] = useState(true); //only for mobile screens

  const [myChatsLoader, setMyChatsLoader] = useState(false);
  const [chatboxLoader, setChatboxLoader] = useState(false);

  useEffect(() => {
    (async () => {
      const userData = await getUserData();
      setUserData(userData.user);
    })();
  }, []);

  useEffect(() => {
    socket.on("receive_message", (messageObj) => {
      if (selectedChatIndex === -1 || chatBoxInfo._id !== messageObj.chat._id) {
        setChats((prev) => {
          const chats = [...prev];
          const chatIndex = chats.findIndex(
            (chat) => chat._id === messageObj.chat._id
          );
          if (chatIndex === -1) return prev;
          chats[chatIndex].latestMessage = messageObj;
          return chats;
        });

        if (notifications.find((item) => item.chat._id === messageObj.chat._id))
          return;
        setNotifications([...notifications, messageObj]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket, selectedChatIndex, chatBoxInfo, notifications]);

  const obj = {
    userData,
    setUserData,
    chatBoxInfo,
    setChatBoxInfo,
    showProfileModal,
    setShowProfileModal,
    showSelectedUserProfileModal,
    setShowSelectedUserProfileModal,
    sideDrawerActive,
    setSideDrawerActive,
    chats,
    setChats,
    selectedChatIndex,
    setSelectedChatIndex,
    showCreateGroupChatModal,
    setShowCreateGroupChatModal,
    showUpdateGroupChatModal,
    setShowUpdateGroupChatModal,
    selectedMessages,
    setSelectedMessages,
    showUpdateUserSettingsModal,
    setShowUpdateUserSettingsModal,
    myChatsLoader,
    setMyChatsLoader,
    chatboxLoader,
    setChatboxLoader,
    cacheMessages,
    setCacheMessages,
    notifications,
    setNotifications,
    showMyChatMobile,
    setShowMyChatMobile,
  };
  return <Context.Provider value={obj}>{children}</Context.Provider>;
}

async function getUserData() {
  const res = await fetch("/api/auth/me", {
    cache: "no-cache",
  });
  const userData = await res.json();
  return userData;
}
