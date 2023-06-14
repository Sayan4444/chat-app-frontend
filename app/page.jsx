"use client";
import SideDrawer from "./SideDrawer/SideDrawer";
import Chatbox from "./Chatbox/Chatbox";
import MyChat from "./MyChat/MyChat";
import Navbar from "./Navbar/Navbar";
import { useContextProvider } from "./Context/Store";
import ProfileModal from "./ProfileModal/ProfileModal";

export default function Home() {
  const { showProfileModal, showSelectedUserProfileModal } =
    useContextProvider();

  return (
    <>
      <SideDrawer />
      <Navbar />
      <div className='flex space-x-4 mx-3 h-screen'>
        <MyChat />
        <Chatbox />
      </div>
      {showProfileModal && <ProfileModal type='signedin-profile' />}
      {showSelectedUserProfileModal && <ProfileModal type='selected-user' />}
    </>
  );
}
