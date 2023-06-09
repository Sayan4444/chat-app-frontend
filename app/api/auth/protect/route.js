import connectDB from "@/config/db";
import User from "@/model/User";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB();
        const token = Object.fromEntries(req.headers).authorization?.split(' ')[1];
        if (!token) throw new Error();
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.exists({ _id: decoded.id });
        if (!user) throw new Error();
        return NextResponse.json({ success: 'true' });
    } catch (error) {
        console.log('catch');
        return NextResponse.json({ success: 'false', error: 'Unauthorized' }, { status: 401 })
    }
}
