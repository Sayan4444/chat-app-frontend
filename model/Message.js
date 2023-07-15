import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        trim: true,
    },
    chat: {
        type: mongoose.Schema.ObjectId,
        ref: "Chat",
        required: true
    },
},
    {
        timestamps: true,
    });

const Message = mongoose.models?.Message || mongoose.model("Message", MessageSchema);
export default Message;