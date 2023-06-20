import dbConnect from "@/dbConnect/dbConnect";
import Message from "@/model/Message";
import { NextResponse } from "next/server";
import loggedInUserDetails from "../utils/loggedInUserDetails";
import mongoose from "mongoose";
import Chat from "@/model/Chat";

export async function GET(req) {
    await dbConnect();
    //get the chats of signed in user
    const user = await loggedInUserDetails(req);
    const loggedInUserId = user._id;
    const getAllChats = await Chat
        .find({ users: loggedInUserId })
        .select('_id')

    //then collect the messages of its related chats
    const messages = await Message.find({ chat: { $in: getAllChats } });
    //return them

    return NextResponse.json({ success: 'true', messages })
}

export async function POST(req) {
    const { content, chatId } = await req.json();
    await dbConnect();
    const user = await loggedInUserDetails(req);
    if (!content || !chatId) throw new Error;
    const chatObjectId = mongoose.Types.ObjectId(chatId);

    const newMessage = {
        sender: user._id,
        content, chat: chatObjectId
    }
    try {
        const message = await Message.create(newMessage);

        await Chat.findByIdAndUpdate(chatObjectId, {
            latestMessage: message
        }, {
            new: true
        })
        await message.populate('sender')
        await message.populate('chat')
        return NextResponse.json(
            { success: 'true', message }, { status: 201 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(
            { success: 'false' }, { status: 400 })
    }
}