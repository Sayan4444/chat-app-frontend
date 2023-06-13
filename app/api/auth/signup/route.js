import dbConnect from "@/dbConnect/dbConnect";
import User from "@/model/User";
import { NextResponse } from "next/server";
import sendTokenResponse from "../util/sendTokenResponse";

export async function POST(req) {
    try {
        await dbConnect();
        const obj = await req.json();
        const { email, picture } = obj;
        if (picture.length === 0) delete obj.picture
        await User.create(obj);
        const user = await User.findOne({ email })
        return sendTokenResponse(user);
    }
    catch {
        return NextResponse.json({ success: 'false', error: 'Invalid' }, { status: 400 })
    }
}
