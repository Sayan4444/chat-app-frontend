import ProfileModal from "./ProfileModal/ProfileModal";
import CreateGroupModal from "./CreateGroupModal/CreateGroupModal";
import UpdateGroupModal from "./UpdateGroupModal/UpdateGroupModal";
import UpdateUserDetails from "./UpdateUserDetails/UpdateUserDetails";
import { useContextProvider } from "@/Context/Store";

export default function Modal() {
  const {
    setShowProfileModal,
    showProfileModal,
    showSelectedUserProfileModal,
    showCreateGroupChatModal,
    setShowCreateGroupChatModal,
    showUpdateGroupChatModal,
    setShowUpdateGroupChatModal,
    showUpdateUserSettingsModal,
    setShowUpdateUserSettingsModal,
    userData,
    chats,
    selectedChatIndex,
    setShowSelectedUserProfileModal,
    showClickedProfilePicModal,
    clickedProfilePicData,
    setShowClickedProfilePicModal,
  } = useContextProvider();
  const selectedChat = chats[selectedChatIndex];
  return (
    <>
      {/* One-two-one-chat */}
      {showProfileModal && (
        <ProfileModal data={userData} setShowModal={setShowProfileModal} />
      )}
      {showClickedProfilePicModal && (
        <ProfileModal
          data={clickedProfilePicData}
          setShowModal={setShowClickedProfilePicModal}
        />
      )}
      {showSelectedUserProfileModal && (
        <ProfileModal
          data={
            selectedChat.users[0]._id !== userData._id
              ? selectedChat.users[0]
              : selectedChat.users[1]
          }
          setShowModal={setShowSelectedUserProfileModal}
        />
      )}
      {/* One-two-one-chat */}
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

      {showUpdateUserSettingsModal && (
        <UpdateUserDetails
          setShowUpdateUserSettingsModal={setShowUpdateUserSettingsModal}
        />
      )}
    </>
  );
}
