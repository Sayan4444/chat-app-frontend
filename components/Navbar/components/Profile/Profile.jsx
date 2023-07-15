import { FaBell } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import DropdownMenu from "./DropdownMenu";
import { useState } from "react";
import Image from "next/image";
import { useContextProvider } from "@/Context/Store";
import NotificationsMenu from "./Notification/NotificationsMenu";
import NotificationNumber from "./Notification/NotificationNumber";

export default function Profile() {
  const { userData, notifications, setNotifications } = useContextProvider();
  const { picture } = userData;
  const [showDropdown, setShowdropDown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <>
      <div className='flex relative'>
        <button
          onClick={() => setShowNotifications(true)}
          className='hoverEffect hover:scale-125 relative'
        >
          <FaBell size={25} />
          {notifications.length !== 0 && (
            <NotificationNumber number={notifications.length} />
          )}
        </button>
        <button
          onClick={() => setShowdropDown(true)}
          className='flex items-center py-2 ml-3 rounded-xl hover:bg-gray-300 hoverEffect px-2'
        >
          {picture && (
            <Image
              src={picture}
              width={30}
              height={30}
              alt='avatar'
              className='rounded-[50%]'
            />
          )}
          <MdArrowDropDown />
        </button>
        {showDropdown && <DropdownMenu setShowdropDown={setShowdropDown} />}
        {showNotifications && (
          <NotificationsMenu
            setShowNotifications={setShowNotifications}
            notifications={notifications}
            setNotifications={setNotifications}
          />
        )}
      </div>
    </>
  );
}
