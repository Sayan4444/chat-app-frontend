"use client";
import SideDrawer from "./SideDrawer/SideDrawer";
import Chatbox from "./Chatbox/Chatbox";
import MyChat from "./MyChat/MyChat";
import Navbar from "./Navbar/Navbar";
import { useState } from "react";
import { useContextProvider } from "./Context/Store";
import ProfileModal from "./ProfileModal/ProfileModal";

export default function Home() {
  const { userData } = useContextProvider();
  const [selectedUserData, setSelectedUserData] = useState({});
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSelectedUserProfileModal, setShowSelectedUserProfileModal] =
    useState(false);
  const [sideDrawerActive, setSideDrawerActive] = useState(false);
  return (
    <>
      <SideDrawer
        sideDrawerActive={sideDrawerActive}
        setSideDrawerActive={setSideDrawerActive}
        setSelectedUserData={setSelectedUserData}
      />
      <Navbar
        setShowProfileModal={setShowProfileModal}
        setSideDrawerActive={setSideDrawerActive}
        userData={userData}
      />
      <div className='flex space-x-4 mx-3 h-screen'>
        <MyChat />
        <Chatbox
          selectedUserData={selectedUserData}
          setShowSelectedUserProfileModal={setShowSelectedUserProfileModal}
        />
      </div>
      {showProfileModal && (
        <ProfileModal
          userData={userData}
          setShowProfileModal={setShowProfileModal}
        />
      )}
      {showSelectedUserProfileModal && (
        <ProfileModal
          userData={selectedUserData}
          setShowSelectedUserProfileModal={setShowSelectedUserProfileModal}
        />
      )}
    </>
  );
}
