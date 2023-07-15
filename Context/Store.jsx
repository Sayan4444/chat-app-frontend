import { useState, createContext, useContext } from "react";

export const Context = createContext();
export const useContextProvider = () => useContext(Context);

export default function Store({ children }) {
  const [userData, setUserData] = useState({}); //signedIn user data
  const [messages, setMessages] = useState([]);
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

  const obj = {
    userData,
    setUserData,
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
    showUpdateUserSettingsModal,
    setShowUpdateUserSettingsModal,
    notifications,
    setNotifications,
    showMyChatMobile,
    setShowMyChatMobile,
    messages,
    setMessages,
  };
  return <Context.Provider value={obj}>{children}</Context.Provider>;
}
