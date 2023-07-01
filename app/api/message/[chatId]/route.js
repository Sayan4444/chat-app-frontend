import dbConnect from "@/dbConnect/dbConnect";
import Message from "@/model/Message";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/model/User";
import Chat from "@/model/Chat";

export async function GET(req, context) {
    try {
        await dbConnect();
        const chatId = mongoose.Types.ObjectId(context.params.chatId);
        const messages = await Message.find({ chat: chatId }).populate('sender').populate('chat')

        return NextResponse.json({ success: 'true', messages })
    } catch (error) {
        return NextResponse.json({ success: 'false', error: error.message }, { status: 400 })
    }

}