"use client";
import SideDrawer from "./SideDrawer/SideDrawer";
import MyChat from "./MyChat/MyChat";
import ChatUsers from "./ChatUsers/ChatUsers";
import Navbar from "./Navbar/Navbar";
import { useState } from "react";
import ProfileModal from "./ProfileModal/ProfileModal";
import { useContextProvider } from "./Context/Store";

export default function Home() {
  const { userData } = useContextProvider();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [sideDrawerActive, setSideDrawerActive] = useState(false);

  return (
    <>
      <SideDrawer
        sideDrawerActive={sideDrawerActive}
        setSideDrawerActive={setSideDrawerActive}
      />
      <Navbar
        setShowProfileModal={setShowProfileModal}
        setSideDrawerActive={setSideDrawerActive}
        userData={userData}
      />
      <div className='flex space-x-4 mx-3 h-screen'>
        <ChatUsers />
        <MyChat />
      </div>
      {showProfileModal && (
        <ProfileModal
          userData={userData}
          setShowProfileModal={setShowProfileModal}
        />
      )}
    </>
  );
}
