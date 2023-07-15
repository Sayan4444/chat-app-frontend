import { useContextProvider } from "@/Context/Store";
import { useRouter } from "next/navigation";

export default function DropdownMenu({ setShowdropDown }) {
  const router = useRouter();
  const {
    setUserData,
    setMessages,
    setSelectedChatIndex,
    setShowProfileModal,
    setChats,
    setShowUpdateUserSettingsModal,
    setNotifications,
  } = useContextProvider();
  const buttonStyles =
    "hover:bg-gray-200 transition-all duration-300 text-left py-3 pl-2";
  return (
    <>
      <div
        className={`fixed top-0 left-0 z-10 w-screen h-screen p-4 overflow-x-hidden overflow-y-auto `}
        onClick={() => setShowdropDown(false)}
      />
      <div className='absolute top-16 right-0 w-64 bg-white flex flex-col z-20 space-y-4 border-2 border-gray-100 rounded-lg'>
        <button
          onClick={() => {
            setShowProfileModal(true);
            setShowdropDown(false);
          }}
          className={buttonStyles}
        >
          <span>My Profile</span>
        </button>
        <button
          onClick={() => {
            setShowUpdateUserSettingsModal(true);
            setShowdropDown(false);
          }}
          className={buttonStyles}
        >
          <span>My Settings</span>
        </button>
        <button onClick={logoutHandler} className={buttonStyles}>
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  async function logoutHandler() {
    await fetch("/api/auth/signout", {
      method: "POST",
    });
    setUserData({});
    setMessages([]);
    setSelectedChatIndex(-1);
    setChats([]);
    setNotifications([]);
    router.push("/signin");
  }
}
