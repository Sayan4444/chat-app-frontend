"use client";

import NoSelectedChat from "./NoSelectedChat";
import SelectedChat from "./SelectedChat";

export default function Chatbox({
  selectedUserData,
  setShowSelectedUserProfileModal,
}) {
  return (
    <div className='bg-white mb-20 mt-4 py-4 w-full rounded-xl relative'>
      {Object.keys(selectedUserData).length === 0 ? (
        <NoSelectedChat />
      ) : (
        <SelectedChat
          selectedUserData={selectedUserData}
          setShowSelectedUserProfileModal={setShowSelectedUserProfileModal}
        />
      )}
    </div>
  );
}
