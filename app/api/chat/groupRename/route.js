import { NextResponse } from "next/server";
import Chat from "@/model/Chat";
import dbConnect from "@/dbConnect/dbConnect";
import User from "@/model/User";

export async function PUT(req) {
    await dbConnect();
    const { chatId, newChatName } = await req.json();
    if (!chatId || !newChatName) return NextResponse.json({ success: 'false', error: 'Please fill all fields' }, { status: 400 })
    const chatData = await Chat.findByIdAndUpdate(chatId, {
        chatName: newChatName
    },
        {
            new: true
        }
    )
        .populate('users')
        .populate('groupAdmin')


    return NextResponse.json({
        success: 'true',
        chat: chatData
    })
}
