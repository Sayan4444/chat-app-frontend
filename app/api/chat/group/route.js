import { NextResponse } from "next/server";
import loggedInUserDetails from "../../utils/loggedInUserDetails";
import Chat from "@/model/Chat";
import dbConnect from "@/dbConnect/dbConnect";

export async function POST(req) {
    await dbConnect();
    const user = await loggedInUserDetails(req);
    const loggedInUserId = user._id;
    try {
        let { name, users } = await req.json();
        if (!name || !users) throw new Error('Please fill all fields');

        if (users.length <= 1) throw new Error('There should be more that 2 people in a group')

        users.push(loggedInUserId);

        const chat = {
            chatName: name,
            isGroupChat: true,
            users,
            groupAdmin: loggedInUserId
        };
        const chatCreated = await Chat.create(chat);
        await chatCreated.populate('users')
        await chatCreated.populate('groupAdmin')

        return NextResponse.json({
            success: true,
            chat: chatCreated
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

}
