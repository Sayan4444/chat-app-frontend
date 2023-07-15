import dbConnect from "@/dbConnect/dbConnect";
import Chat from "@/model/Chat";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { chatId } = params
        await dbConnect();
        const prevChat = await Chat
            .findById(chatId)
            .populate("users")
            .populate('groupAdmin')
            .populate({
                path: 'latestMessage',
                populate: [
                    {
                        path: 'sender',
                        model: 'User'
                    },
                    {
                        path: 'chat',
                        model: 'Chat'
                    }
                ]
            })
        return NextResponse.json({
            success: true,
            chat: prevChat
        })
    }
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}