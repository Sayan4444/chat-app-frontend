"use client";
import { useState, createContext, useContext, useEffect } from "react";

export const Context = createContext();
export const useContextProvider = () => useContext(Context);

export default function Store({ children }) {
  const [userData, setUserData] = useState({}); //signedIn user data
  const [selectedUserData, setSelectedUserData] = useState({}); //user details selected by finding in search bar / My Chats
  const [selectedChatIndex, setSelectedChatIndex] = useState(-1); //selected chat in MyChat
  const [chats, setChats] = useState([]); //all the chats of the loggedin user MyChat

  const [showSelectedUserProfileModal, setShowSelectedUserProfileModal] =
    useState(false); //Eye Button
  const [showProfileModal, setShowProfileModal] = useState(false); //Bell Button
  const [showCreateGroupChatModal, setShowCreateGroupChatModal] =
    useState(false); //Bell Button
  const [sideDrawerActive, setSideDrawerActive] = useState(false); //Side Drawer

  useEffect(() => {
    (async () => {
      const userData = await getUserData();
      if (userData.success === "false") return;
      else setUserData(userData.user);
    })();
  }, []);

  const obj = {
    userData,
    setUserData,
    selectedUserData,
    setSelectedUserData,
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
