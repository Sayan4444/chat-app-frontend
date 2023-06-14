"use client";

import SearchUser from "./components/SearchUser";
import Profile from "./components/Profile/Profile";

export default function Navbar() {
  return (
    <>
      <nav className='w-screen bg-white flex justify-between items-center py-5 px-5'>
        <SearchUser />
        <div className='text-xl'>Talk-A-Tive</div>
        <Profile />
      </nav>
    </>
  );
}
