"use client";

import SearchUser from "./components/SearchUser";
import Profile from "./components/Profile/Profile";

export default function Navbar({
  setShowProfileModal,
  setSideDrawerActive,
  userData,
}) {
  return (
    <>
      <nav className='w-screen bg-white flex justify-between items-center py-5 px-5'>
        <SearchUser setSideDrawerActive={setSideDrawerActive} />
        <div className='text-xl'>Talk-A-Tive</div>
        <Profile
          setShowProfileModal={setShowProfileModal}
          userData={userData}
        />
      </nav>
    </>
  );
}
