import dbConnect from "@/dbConnect/dbConnect";
import Message from "@/model/Message";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req, context) {
    await dbConnect();
    const chatId = mongoose.Types.ObjectId(context.params.chatId);
    const messages = await Message.find({ chat: chatId });
    //return them

    return NextResponse.json({ success: 'true', messages })
}