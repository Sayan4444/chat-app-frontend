import dbConnect from "@/dbConnect/dbConnect";
import loggedInUserDetails from "../utils/loggedInUserDetails";
import { NextResponse } from "next/server";
import Chat from "@/model/Chat";
import Message from "@/model/Message";

export async function GET(req) {
    await dbConnect();
    const user = await loggedInUserDetails(req);
    const loggedInUserId = user._id;
    const getAllChats = await Chat
        .find({ users: loggedInUserId })
        .populate('users')
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
        .sort({ updatedAt: -1 })
    if (!getAllChats) {
        return NextResponse.json({ success: 'false', error: 'No users found' }, { status: 404 })
    }
    return NextResponse.json({
        success: true,
        length: getAllChats.length,
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
        }).populate('users').populate({
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


        if (prevChat) {
            // await prevChat.populate('users')
            // await prevChat.populate({
            //     path: 'latestMessage',
            //     populate: [
            //         {
            //             path: 'sender',
            //             model: 'User' // Replace with the actual model name for the User object
            //         },
            //         {
            //             path: 'chat',
            //             model: 'Chat'
            //         }
            //     ]
            // })
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
        await createdChat.populate({
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
            chat: createdChat
        })
    } catch (error) {
        return NextResponse.json({ success: 'false' }, { status: 400 })
    }
}

