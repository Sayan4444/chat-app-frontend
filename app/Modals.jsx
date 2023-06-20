"use client";
import ProfileModal from "./ProfileModal/ProfileModal";
import CreateGroupModal from "./CreateGroupModal/CreateGroupModal";
import UpdateGroupModal from "./UpdateGroupModal/UpdateGroupModal";
import UpdateUserDetails from "./UpdateUserDetails/UpdateUserDetails";
import { useContextProvider } from "./Context/Store";

export default function Modal() {
  const {
    showProfileModal,
    showSelectedUserProfileModal,
    showCreateGroupChatModal,
    setShowCreateGroupChatModal,
    showUpdateGroupChatModal,
    setShowUpdateGroupChatModal,
    showUpdateUserSettingsModal,
    setShowUpdateUserSettingsModal,
  } = useContextProvider();
  return (
    <>
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

      {showUpdateUserSettingsModal && (
        <UpdateUserDetails
          setShowUpdateUserSettingsModal={setShowUpdateUserSettingsModal}
        />
      )}
    </>
  );
}
