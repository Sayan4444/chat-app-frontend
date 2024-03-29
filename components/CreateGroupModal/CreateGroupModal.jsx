import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import searchUser from "@/utils/searchUser";
import SearchedUser from "./SearchedUser";
import Loading from "./Loading";
import SelectedUsers from "./SelectedUsers";
import { useContextProvider } from "@/Context/Store";
import Spinner from "../components/Spinner";
import { toastError, toastSuccess } from "@/utils/toast";
import useCustomHook from "@/hooks/useCustomHook";

export default function CreateGroupModal({ setShowCreateGroupChatModal }) {
  const { setChats, userData } = useContextProvider();
  const [groupName, setGroupName] = useState("");
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]); //searched users
  const [selectedUsers, setSelectedUsers] = useState([]); //users selected from searched Users array
  const [userLoading, setUserLoading] = useState(false);
  const [createChatLoader, setCreateChatLoader] = useState(false);

  useEffect(() => {
    let timeoutId = setTimeout(async () => {
      await searchUser(userData._id, setUsers, null, setUserLoading, userName);
    }, 300);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [userName]);

  const { updateSelectedChatIndex } = useCustomHook();
  return (
    <>
      <Modal setShowModal={setShowCreateGroupChatModal}>
        <div className='flex flex-col space-y-7 items-center px-8'>
          <div className='text-3xl'>Create Group Chat</div>
          <input
            type='text'
            className='focus:outline-none border-2 focus:border-blue-500  rounded-lg pl-4 py-2 w-full'
            placeholder='Group Name'
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <input
            type='text'
            className='focus:outline-none border-2 focus:border-blue-500  rounded-lg pl-4 py-2 w-full'
            placeholder='User name'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {/* Showing users which are selected to be added to group */}
          {selectedUsers.length !== 0 && (
            <div className='flex flex-wrap gap-2 self-start'>
              {selectedUsers.map((selectedUser, index) => (
                <SelectedUsers
                  selectedUsers={selectedUsers}
                  selectedUser={selectedUser}
                  setSelectedUsers={setSelectedUsers}
                  index={index}
                  key={selectedUser._id}
                />
              ))}
            </div>
          )}
          {/* Showing users which are selected to be added to group */}
          {userLoading && <Loading />}
          {/* Showing users on the basis of search in the search box */}
          <div className='w-full'>
            {users.length !== 0 && (
              <div className='flex flex-col space-y-2 max-h-36 laptop:max-h-60 overflow-y-auto scrollbar-hide'>
                {users.map((user) => (
                  <SearchedUser
                    user={user}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                    key={user._id}
                  />
                ))}
              </div>
            )}
          </div>
          {/* Showing users on the basis of search in the search box */}
          <button
            onClick={chatCreatedHandler}
            className='px-3 py-3 text-lg bg-blue-600 text-white absolute rounded-lg bottom-3 right-8 hoverEffect hover:bg-blue-700 w-32'
          >
            {!createChatLoader && " Create Chat"}
            {createChatLoader && <Spinner />}
          </button>
        </div>
      </Modal>
    </>
  );
  async function chatCreatedHandler() {
    let setErrorMessage;
    if (groupName.length === 0) setErrorMessage = "Enter group name";
    else if (selectedUsers.length <= 1)
      setErrorMessage = "Select minimum 3 users";
    if (setErrorMessage) {
      return toastError(setErrorMessage);
    }
    setCreateChatLoader(true);
    const res = await fetch("/api/chat/group", {
      method: "POST",
      body: JSON.stringify({ name: groupName, users: selectedUsers }),
    });
    const resData = await res.json();
    const { chat } = resData;
    setChats((prev) => [chat, ...prev]);
    updateSelectedChatIndex(0);

    toastSuccess("Group Chat Created");
    setCreateChatLoader(false);
    setShowCreateGroupChatModal(false);
  }
}
