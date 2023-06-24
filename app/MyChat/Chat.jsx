"use client";
export default function Chat({ selected, loggedinId, chat }) {
  const { latestMessage } = chat;

  const chatName = getChatName();
  return (
    <>
      <div
        className={`px-3 py-2 text-left rounded-xl hover:cursor-pointer ${
          selected ? "bg-cyan-600 text-white" : "bg-gray-200 text-black "
        }`}
      >
        {chatName}
        {latestMessage && (
          <div className='text-sm mt-2'>
            <span className='font-bold'>
              {latestMessage.sender._id === loggedinId
                ? "You"
                : latestMessage.sender.name}
            </span>
            <span className='mx-1'>:</span>
            <span>{latestMessage.content}</span>
          </div>
        )}
      </div>
    </>
  );

  function getChatName() {
    if (chat.isGroupChat === true) return chat.chatName;
    const { users } = chat;
    if (users[0]._id !== loggedinId) return users[0].name;
    return users[1].name;
  }
}
