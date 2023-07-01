import { useContextProvider } from "@/app/Context/Store";

export default function NotificationsMenu({
  setShowNotifications,
  notifications,
  setNotifications,
}) {
  const buttonStyles =
    "hover:bg-gray-200 transition-all duration-300 text-left py-3 pl-2";
  const { setSelectedChatIndex, chats } = useContextProvider();
  return (
    <>
      <div
        className={`fixed top-0 left-0 z-10 w-screen h-screen p-4 overflow-x-hidden overflow-y-auto `}
        onClick={() => setShowNotifications(false)}
      />
      <div className='absolute top-16 right-0 w-64 bg-white flex flex-col z-20 space-y-4 border-2 border-gray-100 rounded-lg'>
        {notifications.length === 0 && (
          <div className={buttonStyles}>No new messages</div>
        )}
        {notifications.length !== 0 &&
          notifications.map((notification, index) => (
            <button
              onClick={() => {
                notificationClicked(index);
              }}
              className={buttonStyles}
            >
              New messages from {notification.sender.name}
            </button>
          ))}
      </div>
    </>
  );
  function notificationClicked(index) {
    const notification = notifications[index];
    setNotifications((notifications) => {
      notifications.splice(index, 1);
      return [...notifications];
    });
    const chatIndex = chats.findIndex(
      (chat) => chat._id === notification.chat._id
    );
    setSelectedChatIndex(chatIndex);
    setShowNotifications(false);
  }
}
