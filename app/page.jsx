"use client";
import SideDrawer from "./SideDrawer/SideDrawer";
import Chatbox from "./Chatbox/Chatbox";
import MyChat from "./MyChat/MyChat";
import Navbar from "./Navbar/Navbar";
import { useContextProvider } from "./Context/Store";
import ProfileModal from "./ProfileModal/ProfileModal";
import Loading from "./components/Loading";
import CreateGroupModal from "./CreateGroupModal/CreateGroupModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateGroupModal from "./UpdateGroupModal/UpdateGroupModal";

export default function Home() {
  const {
    userData,
    showProfileModal,
    showSelectedUserProfileModal,
    showCreateGroupChatModal,
    setShowCreateGroupChatModal,
    showUpdateGroupChatModal,
    setShowUpdateGroupChatModal,
  } = useContextProvider();
  if (Object.keys(userData).length === 0) return <Loading />;
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
      {showCreateGroupChatModal && (
        <CreateGroupModal
          setShowCreateGroupChatModal={setShowCreateGroupChatModal}
        />
      )}
      {showUpdateGroupChatModal && (
        <UpdateGroupModal
          setShowUpdateGroupChatModal={setShowUpdateGroupChatModal}
        />
      )}
      <ToastContainer />
    </>
  );
}
