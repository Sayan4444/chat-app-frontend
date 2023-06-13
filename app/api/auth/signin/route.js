import dbConnect from "@/dbConnect/dbConnect";
import User from "@/model/User";
import { NextResponse } from "next/server";
import sendTokenResponse from "../util/sendTokenResponse";

export async function POST(req) {
    try {
        await dbConnect();
        const { email, password } = await req.json();
        //Check for user
        let user = await User.findOne({ email }).select('password');
        if (!user) throw new Error();
        //Checking if password matches

        const isSame = await user.matchPassword(password);
        if (!isSame) throw new Error();
        user = await User.findOne({ email })
        return sendTokenResponse(user);
    } catch (error) {
        const res = NextResponse.json({ success: 'false', error: 'Invalid credentials' }, { status: 401 });
        res.cookies.delete('token')
        return res;
    }

}