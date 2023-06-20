import dbConnect from "@/dbConnect/dbConnect";
import User from "@/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function GET(req, context) {
    const name = req.nextUrl.searchParams.get('search');
    try {
        await dbConnect();
        const users = await User.find({ name: { $regex: `^${name}`, $options: 'i' } })
        if (users.length === 0) throw new Error;
        return NextResponse.json({ success: 'true', users })
    } catch (error) {
        return NextResponse.json({ success: 'false', error: 'No user found' }, { status: 400 })
    }
}

export async function PUT(req) {
    try {
        await dbConnect();
        //I get name,email,prevPass,newPass,picture,id
        const { name, email, prevPassword, newPassword, picture, _id } = await req.json();
        //I get the signed obj 
        const signedInUserData = await User.findById(_id).select('password picture');
        // I check if prevPass is valid or not
        const isSame = await signedInUserData.matchPassword(prevPassword);
        if (!isSame) throw new Error('Previous password invalid')
        //I create a update obj which will finally be used to updateById
        const updateObj = {};
        // I put name and email in updateobj
        updateObj.name = name;
        updateObj.email = email;
        //If picture is present I put it 
        if (picture.trim().length !== 0) updateObj.picture = picture
        //If password is present I put it in updateobj
        if (newPassword.trim().length) {
            const salt = await bcrypt.genSalt(10);
            const passHashed = await bcrypt.hash(newPassword, salt);
            updateObj.password = passHashed
        }
        const userData = await User.findByIdAndUpdate(_id, { ...updateObj }, { new: true })
        return NextResponse.json({ success: 'true', user: userData })
    }
    catch (error) {
        return NextResponse.json({ success: 'false', error: error.message }, { status: 400 })
    }
}