export default function showMessages(messages, selectedChat) {
    if (!selectedChat) return []
    const messages = messages.find(messages.chat._id === selectedChat._id)
    return messages;
}