import mongoose from "mongoose"

const ChatSchema = new mongoose.Schema({
    chatName: {
        type: String,
        trim: true,
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    users: [{
        type: mongoose.Schema.ObjectId,
        ref: "User",
    }],
    latestMessage: {
        type: mongoose.Schema.ObjectId,
        ref: "Message",
    },
    groupAdmin: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true,
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
export default Chat;
