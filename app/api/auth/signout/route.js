import connectDB from "@/config/db";
import { NextResponse } from "next/server";

export async function POST() {
    await connectDB();
    const res = NextResponse.json({ 'success': 'true' })
    res.cookies.delete('token')
    return res;
}


