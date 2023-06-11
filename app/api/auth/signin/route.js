import connectDB from "@/config/db";
import User from "@/model/User";
import { NextResponse } from "next/server";
import sendTokenResponse from "../util/sendTokenResponse";

export async function POST(req) {
    await connectDB();
    const { email, password } = await req.json();
    //Check for user
    let user = await User.findOne({ email }).select('password');
    if (!user) return NextResponse.json({ success: 'false', error: 'Invalid credentials' }, { status: 401 })
    //Checking if password matches

    const isSame = await user.matchPassword(password);
    if (!isSame) return NextResponse.json({ success: 'false', error: 'Invalid credentials' }, { status: 401 })
    user = await User.findOne({ email })
    return sendTokenResponse(user);
}