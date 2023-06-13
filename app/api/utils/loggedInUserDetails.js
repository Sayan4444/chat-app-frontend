import dbConnect from "@/dbConnect/dbConnect";
import User from "@/model/User";
import { jwtVerify } from "jose";

export default async function (req) {
    await dbConnect();
    const token = req.cookies.get('token')?.value

    if (!token) throw new Error();

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret);

    const user = await User.findOne({ _id: payload.id });

    if (!user) throw new Error();

    return user;
}