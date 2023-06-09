import connectDB from "@/config/db";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();
    const { email, password } = await req.json();
    //Check for user
    let user = await User.findOne({ email }).select('password');
    if (!user) return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
    //Checking if password matches

    const isSame = await user.matchPassword(password);
    if (!isSame) return NextResponse.json({ success: 'false', error: 'Invalid credentials' }, { status: 401 })
    return sendTokenResponse(user);
}

function sendTokenResponse(user) {
    const token = user.createJwtToken();
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

    // exports.signin = asyncHandler(async (req, res, next) => {
    //     const { email, password } = req.body;
    //     //Check for user
    //     let user = await User.findOne({ email }).select('password');
    //     if (!user) next(new ErrorResponse('Invalid credentials', 401))
    //     //Checking if password matches

    //     const isSame = await user.matchPassword(password);
    //     if (!isSame) next(new ErrorResponse('Invalid credentials', 401))
    //     user = await User.findOne({ email });
    //     sendTokenResponse(user, res);
    // });