import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import { SignJWT } from 'jose'


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    picture: {
        type: String,
        required: true,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

});

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.methods.createJwtToken = async function () {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const alg = process.env.JWT_ALGO;

    const token = await new SignJWT({ 'id': this._id })
        .setProtectedHeader({ alg })
        .setExpirationTime(process.env.JWT_EXPIRE)
        .sign(secret)
    return token;

}
const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export default User;
