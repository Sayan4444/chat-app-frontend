import { useContextProvider } from '../Context/Store';

export default function useCustomHook() {
    const { setSelectedMessages, selectedChatIndex, setSelectedChatIndex, setShowMyChatMobile } = useContextProvider()

    function updateSelectedChatIndex(index) {
        setSelectedMessages((prev) => {
            if (selectedChatIndex === index) return prev;
            return []
        })
        setSelectedChatIndex(index)
        setShowMyChatMobile(false)
    };

    return { updateSelectedChatIndex };
};