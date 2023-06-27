import Chat from "@/model/Chat";
import User from "@/model/User"

export const userData = [
    {
        "name": "Guest",
        "email": "guest@example.com",
        "password": "123456",
    },
    {
        "name": "John Doe",
        "email": "john@gmail.com",
        "password": "123456",
    },
    {
        "name": "Jane Doe",
        "email": "jane@gmail.com",
        "password": "123456",

    },
    {
        "name": "Sayan Banerjee",
        "email": "sayanbanerjee2002@gmail.com",
        "password": "123456",
    }
]


export const chatData = async () => {
    const guestUserId = await User.findOne({ email: "guest@example.com" }).select("_id");
    const johnUserId = await User.findOne({ email: "john@gmail.com" }).select("_id");
    const janeUserId = await User.findOne({ email: "jane@gmail.com" }).select("_id");
    const sayanUserId = await User.findOne({ email: "sayanbanerjee2002@gmail.com" }).select("_id");

    return [

        {
            "isGroupChat": false,
            "users": [guestUserId, johnUserId],
        },
        {
            "isGroupChat": false,
            "users": [guestUserId, janeUserId],
        },
        {
            "isGroupChat": false,
            "users": [guestUserId, sayanUserId],
        },
        {
            "chatName": "group 1",
            "isGroupChat": true,
            "users": [guestUserId, johnUserId, janeUserId, sayanUserId],
            "groupAdmin": guestUserId
        }
    ]
}

export const messageData = async () => {
    const guestUserId = await User.findOne({ email: "guest@example.com" }).select("_id");
    const johnUserId = await User.findOne({ email: "john@gmail.com" }).select("_id");
    const janeUserId = await User.findOne({ email: "jane@gmail.com" }).select("_id");
    const sayanUserId = await User.findOne({ email: "sayanbanerjee2002@gmail.com" }).select("_id");
    const sayanGuestChatId = await Chat.findOne({
        isGroupChat: false,
        users: { $all: [sayanUserId, guestUserId] }
    }).select("_id")

    return [
        {
            "sender": sayanUserId,
            "content": "toGuest1",
            "chat": sayanGuestChatId
        },
        {
            "sender": sayanUserId,
            "content": "toGuest2",
            "chat": sayanGuestChatId
        },
        {
            "sender": sayanUserId,
            "content": "toGuest3",
            "chat": sayanGuestChatId
        },
        {
            "sender": guestUserId,
            "content": "toSayan1",
            "chat": sayanGuestChatId
        },
        {
            "sender": guestUserId,
            "content": "toSayan2",
            "chat": sayanGuestChatId
        },
        {
            "sender": guestUserId,
            "content": "toSayan3",
            "chat": sayanGuestChatId
        },
    ]
}