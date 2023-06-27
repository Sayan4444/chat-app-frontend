import Image from "next/image";
import ChatDate from "./ChatDate";

export default function MessageUI({
  type,
  message,
  displayIcon,
  prevMessageCreatedAt,
}) {
  const { sender, content, createdAt } = message;
  const time = getTime(createdAt);
  const chatDate = getChatDate(createdAt);
  if (!message) return;
  const { picture } = sender;
  return (
    <>
      {chatDate && <ChatDate chatDate={chatDate} />}
      <div
        className={`${
          type === "loggedInUser"
            ? "self-end bg-sky-200"
            : "self-start bg-green-200"
        }  px-4 py-2 rounded-2xl relative`}
      >
        {displayIcon && (
          <div className='text-xs text-red-600 font-bold'>{sender.name}</div>
        )}
        {content}
        {displayIcon && (
          <Image
            src={picture}
            width={30}
            height={30}
            alt='profile picture'
            className='absolute -left-8 top-2 rounded-[50%] hover:cursor-pointer'
            onClick={() => window.open(picture, "_blank")}
          />
        )}
        <p className='text-[10px] text-right'>{time}</p>
      </div>
    </>
  );

  function getTime() {
    const dateObj = new Date(createdAt);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    const timeStr = dateObj.toLocaleTimeString("en-US", options);
    return timeStr;
  }

  function getChatDate() {
    if (prevMessageCreatedAt) {
      const date1 = new Date(prevMessageCreatedAt);
      const date2 = new Date(createdAt);
      if (
        prevMessageCreatedAt &&
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      ) {
        return null;
      }
    }

    const date = new Date(createdAt);
    const now = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    if (date.toDateString() === now.toDateString()) {
      return "today";
    }

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "yesterday";
    }

    const startOfWeek = new Date();
    startOfWeek.setDate(now.getDate() - now.getDay());
    if (date >= startOfWeek) {
      return days[date.getDay()];
    }

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
