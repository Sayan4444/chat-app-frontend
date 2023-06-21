import User from "@/model/User"
import Chat from "@/model/Chat"
import Message from "@/model/Message"

import { userData, chatData, messageData } from "./data";
import { NextResponse } from "next/server";
import dbConnect from "@/dbConnect/dbConnect";

export async function PUT(req) {
    await dbConnect();
    try {
        await User.deleteMany();
        await Chat.deleteMany();
        await Message.deleteMany();


        await User.create(userData);

        const chat = await chatData();
        await Chat.create(chat);

        const message = await messageData();
        await Message.create(message);


        console.log("DB reset");
        return NextResponse.json({ success: 'true' })
    } catch (error) {
        return NextResponse.json({ success: 'false', error: error.message }, { status: 404 })
    }
}
