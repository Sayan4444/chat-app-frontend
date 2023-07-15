import { useEffect, useState } from "react";
import { jwtVerify } from "jose";
import { ToastContainer } from "react-toastify";
import io from "socket.io-client";
import SideDrawer from "@/components/SideDrawer/SideDrawer";
import Chatbox from "@/components//Chatbox/Chatbox";
import MyChat from "@/components//MyChat/MyChat";
import Navbar from "@/components//Navbar/Navbar";
import Modals from "@/components/Modals";
import dbConnect from "@/dbConnect/dbConnect";
import User from "@/model/User";
import Loading from "@/components/Loading";
import { useContextProvider } from "@/Context/Store";
export const socket = io.connect(process.env.NEXT_PUBLIC_SOCKET_URL);

export async function getServerSideProps({ req }) {
  await dbConnect();
  const token = req.cookies.token;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);
  let user = await User.findOne({ _id: payload.id });
  user = JSON.parse(JSON.stringify(user));
  return { props: { userData: user } };
}

export default function Home({ userData }) {
  const [loading, setLoading] = useState(true);
  const {
    setUserData,
    chats,
    setChats,
    messages,
    setMessages,
    selectedChatIndex,
    notifications,
    setNotifications,
  } = useContextProvider();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const chats = await getChats();
      const messages = await getMessages();
      setUserData(userData);
      setChats(chats);
      setMessages([...messages]);
      socket.emit("setup", userData._id);
      // await new Promise((resolve) => setTimeout(resolve, 10000));
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    socket.on("receive_message", (messageObj) => {
      //updating latest message
      setChats((prev) => {
        const chats = [...prev];
        const chatIndex = chats.findIndex(
          (chat) => chat._id === messageObj.chat._id
        );
        if (chatIndex === -1) return prev;
        chats[chatIndex].latestMessage = messageObj;
        return chats;
      });
      //updating messages
      setMessages((prev) => [...prev, messageObj]);
      if (
        selectedChatIndex === -1 ||
        chats[selectedChatIndex]._id !== messageObj.chat._id
      ) {
        //setting notification
        if (notifications.find((item) => item.chat._id === messageObj.chat._id))
          return;
        setNotifications([...notifications, messageObj]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket, chats, messages, selectedChatIndex, notifications]);

  if (loading) return <Loading />;
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

  async function getChats() {
    const res = await fetch("/api/chat");
    const { chats } = await res.json();
    return chats;
  }

  async function getMessages() {
    const res = await fetch("/api/message");
    const { messages } = await res.json();
    return messages;
  }
}
