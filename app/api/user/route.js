import connectDB from "@/config/db";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function GET(req) {
    const name = req.nextUrl.searchParams.get('search');
    try {
        await connectDB();
        const users = await User.find({ name: { $regex: `^${name}`, $options: 'i' } })
        return NextResponse.json({ success: 'true', users })
    } catch (error) {
        return NextResponse.json({ success: 'false', error: 'No user found' }, { status: 400 })
    }
}
