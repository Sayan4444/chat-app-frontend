import SideDrawer from "./components/SideDrawer";
import MyChat from "./components/MyChat";
import ChatUsers from "./components/ChatUsers";
import Navbar from "./components/Navbar";

const Home = () => {
  return (
    <>
      <SideDrawer />
      <Navbar />
      <div className='flex space-x-4 mx-3 h-screen'>
        <ChatUsers />
        <MyChat />
      </div>
    </>
  );
};

export default Home;
