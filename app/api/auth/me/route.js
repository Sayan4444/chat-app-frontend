import connectDB from "@/config/db";
import User from "@/model/User";
import { jwtVerify } from 'jose';
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB();
        const token = req.cookies.get('token')?.value

        if (!token) throw new Error();

        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const { payload } = await jwtVerify(token, secret);

        const user = await User.findOne({ _id: payload.id });

        if (!user) throw new Error();
        return NextResponse.json({ success: 'true', user });
    } catch (error) {
        return NextResponse.json({ success: 'false', error: 'Unauthorized' }, { status: 401 })
    }
}
