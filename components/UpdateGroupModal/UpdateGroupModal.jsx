import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import GroupUser from "./GroupUser";
import { useContextProvider } from "@/Context/Store";
import { toastError, toastSuccess } from "@/utils/toast";
import searchUser from "@/utils/searchUser";
import SearchedUser from "./SearchedUser";
import Loading from "./Loading";

export default function UpdateGroupModal({ setShowUpdateGroupChatModal }) {
  const { userData, chats, setChats, selectedChatIndex } = useContextProvider();
  const [groupName, setGroupName] = useState("");
  const [userName, setUserName] = useState("");
  const [userLoading, setUserLoading] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]); //searched users
  const selectedChat = chats[selectedChatIndex];
  const { users } = selectedChat;

  useEffect(() => {
    let timeoutId = setTimeout(async () => {
      await searchUser(
        userData._id,
        setSearchedUsers,
        null,
        setUserLoading,
        userName
      );
    }, 300);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [userName]);

  return (
    <>
      <Modal setShowModal={setShowUpdateGroupChatModal}>
        <div className='px-8'>
          <div className='text-center text-3xl'>Group Settings</div>
          {/* Names of Group Members */}
          <div className='flex flex-wrap gap-2 mt-10'>
            {users.map((user) => (
              <GroupUser
                user={user}
                loggedInId={userData._id}
                selectedChat={selectedChat}
                key={user._id}
              />
            ))}
          </div>
          {/* Names of Group Members */}
          <div className='flex w-full space-x-4 my-4'>
            <input
              type='text'
              className='focus:outline-none border-2 focus:border-blue-500  rounded-lg pl-4 py-2 w-full placeholder:text-sm placeholder:tracking-tight placeholder:laptop:text-base placeholder:laptop:tracking-normal'
              placeholder='Update Group Name'
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <button
              onClick={renameGroup}
              className='p-3 bg-teal-600 rounded-xl hover:bg-teal-700 hoverEffect text-white text-lg w-32'
            >
              Update
            </button>
          </div>
          <input
            type='text'
            className='focus:outline-none border-2 focus:border-blue-500  rounded-lg pl-4 py-2 w-full'
            placeholder='Add new users to group'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {userLoading && <Loading />}
          {/* Showing users on the basis of search in the search box */}
          <div className='w-full'>
            {searchedUsers.length !== 0 && (
              <div className='flex flex-col space-y-2 max-h-36 laptop:max-h-60 overflow-y-auto scrollbar-hide mt-4'>
                {searchedUsers.map((searchedUser) => (
                  <SearchedUser
                    searchedUser={searchedUser}
                    key={searchedUser._id}
                  />
                ))}
              </div>
            )}
          </div>
          <button
            onClick={leaveGroup}
            className='absolute right-8 bottom-3 p-3 bg-red-600 rounded-xl hoverEffect text-white'
          >
            Leave Group
          </button>
        </div>
      </Modal>
    </>
  );

  async function leaveGroup() {
    setShowUpdateGroupChatModal(false);
    toastError("You left the group");
    const newChats = [...chats];
    newChats.splice(selectedChatIndex, 1);
    setChats(newChats);
    await fetch("/api/chat/groupRemove", {
      method: "PUT",
      body: JSON.stringify({
        chatId: selectedChat._id,
        userId: userData._id,
      }),
    });
  }
  async function renameGroup() {
    if (groupName.trim().length === 0) {
      return toastError("Enter Group Name");
    }
    selectedChat.chatName = groupName;
    chats[selectedChatIndex] = selectedChat;
    setChats(chats.slice());
    setShowUpdateGroupChatModal(false);
    toastSuccess("Group Name Changed");
    // setUpdateLoader(true);
    await fetch("/api/chat/groupRename", {
      method: "PUT",
      body: JSON.stringify({
        chatId: selectedChat._id,
        newChatName: groupName,
      }),
    });
  }
}
