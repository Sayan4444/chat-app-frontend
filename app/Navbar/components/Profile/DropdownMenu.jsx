"use client";

import { useContextProvider } from "@/app/Context/Store";
import { useRouter } from "next/navigation";

export default function DropdownMenu({ setShowdropDown, setShowProfileModal }) {
  const router = useRouter();
  const { setUserData } = useContextProvider();
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
          className='hover:bg-gray-200 transition-all duration-300 text-left py-3 pl-2'
        >
          <span>My Profile</span>
        </button>
        <button
          onClick={logoutHandler}
          className='hover:bg-gray-200 transition-all duration-300 text-left py-3 pl-2'
        >
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
    router.push("/signin");
  }
}
