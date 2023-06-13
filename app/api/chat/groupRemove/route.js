import { NextResponse } from "next/server";
import Chat from "@/model/Chat";
import dbConnect from "@/dbConnect/dbConnect";
import User from "@/model/User";

export async function PUT(req) {
    await dbConnect();
    const { chatId, userId } = await req.json();
    const chat = await Chat.findByIdAndUpdate(chatId, {
        $pull: { users: userId }
    }, {
        new: true
    })
        .populate('users')
        .populate('groupAdmin')

    return NextResponse.json({
        success: 'true',
        chat
    })
}
