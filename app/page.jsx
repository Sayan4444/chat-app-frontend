"use client";
import SideDrawer from "./SideDrawer/SideDrawer";
import Chatbox from "./Chatbox/Chatbox";
import MyChat from "./MyChat/MyChat";
import Navbar from "./Navbar/Navbar";
import { useContextProvider } from "./Context/Store";
import Modals from "./Modals";

import Loading from "./components/Loading";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { userData } = useContextProvider();
  if (Object.keys(userData).length === 0) return <Loading />;

  return (
    <>
      <SideDrawer />
      <Navbar />
      <div className='flex laptop:space-x-4 mx-3 h-screen'>
        <MyChat />
        <Chatbox />
      </div>
      <Modals />
      <ToastContainer />
    </>
  );
}
