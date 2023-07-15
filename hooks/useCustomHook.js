import { useContextProvider } from '../Context/Store';

export default function useCustomHook() {
    const { setSelectedChatIndex, setShowMyChatMobile } = useContextProvider()

    function updateSelectedChatIndex(index) {
        setSelectedChatIndex(index)
        setShowMyChatMobile(false)
    };

    return { updateSelectedChatIndex };
};