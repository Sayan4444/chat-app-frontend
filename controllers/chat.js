const asyncHandler = require("../middleware/async");
const Chat = require("../model/Chat");
const ErrorResponse = require("../utils/errorResponse")

exports.accessChat = asyncHandler(async (req, res, next) => {
    const loggedInUserId = req.user.id;
    const { otherUserId } = req.body;
    if (!otherUserId) return next(new ErrorResponse('user id not sent', 400))
    console.log(loggedInUserId, otherUserId);

    const prevChat = await Chat.findOne({
        isGroupChat: false,
        users: {
            $all: [loggedInUserId, otherUserId]
        }
    })
        .populate('users')
        .populate('latestMessage')
    // .populate({
    //     path: 'latestMessage.sender',
    //     model: 'User'
    // })

    if (prevChat) return res.status(200).json({
        success: true,
        chat: prevChat
    })
    else {
        const chatData = {
            isGroupChat: 'false',
            users: [loggedInUserId, otherUserId]
        }
        const createdChat = await Chat.create(chatData).populate('users')
        res.status(200).json({
            success: true,
            chat: createdChat
        })
    }
})

exports.fetchChat = asyncHandler(async (req, res, next) => {
    const loggedInUserId = req.user.id;
    const getAllChats = await Chat.find({ users: loggedInUserId })
        .populate('users')
        .populate('latestMessage')
        .populate('groupAdmin')
        .sort({ updatedAt: -1 })
    // .populate({
    //     path: 'latestMessage.sender',
    //     model: 'User'
    // })

    res.status(200).json({
        success: true,
        chats: getAllChats
    })
})

exports.createGroupChat = asyncHandler(async (req, res, next) => {
    let { name, users } = req.body;
    if (!name || !users) return next(new ErrorResponse('Please fill all fields'), 400);

    if (users.length <= 1) return next(new ErrorResponse('There should be more that 2 people in a group'), 400);

    users.push(req.user._id);

    const chat = {
        chatName: name,
        isGroupChat: true,
        users,
        groupAdmin: req.user._id
    };
    const chatCreated = await Chat.create(chat);
    const chatPopulate = await Chat.findById(chatCreated._id)
        .populate('users')
        .populate('groupAdmin')

    res.status(200).json({
        success: true,
        chat: chatPopulate
    })
})

exports.renameGroup = asyncHandler(async (req, res, next) => {
    const { chatId, newChatName } = req.body;
    if (!chatId || !newChatName) return next(new ErrorResponse('Please fill all fields'), 400);
    const chatData = await Chat.findByIdAndUpdate(chatId, {
        chatName: newChatName
    },
        {
            new: true
        }
    ).populate('users')
    res.status(200).json({
        success: true,
        chat: chatData
    })
})

exports.removeFromGroup = asyncHandler(async (req, res, next) => {
    const { chatId, userId } = req.body;
    const chat = await Chat.findByIdAndUpdate(chatId, {
        $pull: { users: userId }
    }, {
        new: true
    })
        .populate('users')
        .populate('groupAdmin')

    res.status(200).json({
        success: true,
        chat
    })
})

exports.addToGroup = asyncHandler(async (req, res, next) => {
    const { chatId, userId } = req.body;
    const chat = await Chat.findByIdAndUpdate(chatId, {
        $push: { users: userId }
    }, {
        new: true
    })
        .populate('users')
        .populate('groupAdmin')

    res.status(200).json({
        success: true,
        chat
    })
})