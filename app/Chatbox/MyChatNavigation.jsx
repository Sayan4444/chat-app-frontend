import { AiOutlineArrowLeft } from "react-icons/ai";
import { useContextProvider } from "../Context/Store";

export default function MyChatNavigation() {
  const { setShowMyChatMobile, setSelectedMessages, setSelectedChatIndex } =
    useContextProvider();
  return (
    <button
      onClick={() => {
        setSelectedMessages([]);
        setSelectedChatIndex(-1);
        setShowMyChatMobile(true);
      }}
      className='px-2 py-2 bg-gray-200 rounded-xl'
    >
      <AiOutlineArrowLeft />
    </button>
  );
}
