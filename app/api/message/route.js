import dbConnect from "@/dbConnect/dbConnect";
import Message from "@/model/Message";
import { NextResponse } from "next/server";
import loggedInUserDetails from "../utils/loggedInUserDetails";
import mongoose from "mongoose";
import Chat from "@/model/Chat";

export async function GET(req) {
    const loggedInUser = await loggedInUserDetails(req);
    try {
        let messages = await Message.find().populate("chat").populate("sender")
        messages = messages.filter(msg => msg.chat.users.includes(loggedInUser._id))
        if (!messages) throw new Error;
        return NextResponse.json({ success: 'true', messages })
    } catch (error) {
        return NextResponse.json({ success: 'false', error: error.message }, { status: 400 })
    }
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
        return NextResponse.json(
            { success: 'true', message }, { status: 201 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(
            { success: 'false' }, { status: 400 })
    }
}