import dbConnect from "@/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export async function POST() {
    await dbConnect();
    const res = NextResponse.json({ 'success': 'true' })
    res.cookies.delete('token')
    return res;
}


