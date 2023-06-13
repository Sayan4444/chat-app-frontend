import dbConnect from "@/dbConnect/dbConnect";
import loggedInUserDetails from "../utils/loggedInUserDetails";
import { NextResponse } from "next/server";
import Chat from "@/model/Chat";

export async function GET(req) {
    await dbConnect();
    const user = await loggedInUserDetails(req);
    const loggedInUserId = user._id;
    const getAllChats = await Chat
        .find({ users: loggedInUserId })
        .populate('users')
        .sort({ updatedAt: -1 })
    if (!getAllChats) {
        return NextResponse.json({ success: 'false', error: 'No users found' }, { status: 404 })
    }
    return NextResponse.json({
        success: true,
        chats: getAllChats
    })
}


export async function POST(req) {
    try {
        await dbConnect();
        const user = await loggedInUserDetails(req);
        const loggedInUserId = user._id;
        const { otherUserId } = await req.json();

        const prevChat = await Chat.findOne({
            isGroupChat: false,
            users: {
                $all: [loggedInUserId, otherUserId]
            }
        })


        if (prevChat) {
            await prevChat.populate('users')
            return NextResponse.json({
                success: 'true',
                chat: prevChat
            })
        }
        const chatData = {
            isGroupChat: 'false',
            users: [loggedInUserId, otherUserId]
        }
        // const createdChat = await Chat.create(chatData).populate('users')
        const createdChat = await Chat.create(chatData)
        await createdChat.populate('users')

        return NextResponse.json({
            success: true,
            chat: createdChat
        })
    } catch (error) {
        return NextResponse.json({ success: 'false' }, { status: 400 })
    }
}

