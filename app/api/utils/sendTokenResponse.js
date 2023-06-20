import { NextResponse } from "next/server";

export default async function sendTokenResponse(user) {
    const token = await user.createJwtToken();
    const res = NextResponse.json({
        success: 'true',
        user
    })
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false,
    }
    if (process.env.NEXT_PUBLIC_ENV !== 'dev') {
        options.secure = true;
    }
    res.cookies.set('token', token, options)
    return res;
}