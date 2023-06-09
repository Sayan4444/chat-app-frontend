const asyncHandler = require("../middleware/async");
const User = require("../model/User");
const ErrorResponse = require("../utils/errorResponse")


exports.getUser = asyncHandler(async (req, res, next) => {
    const name = req.query.search;
    const users = await User.find({
        name: { $regex: `^${name}`, $options: 'i' },
        _id: { $ne: req.user.id }
    })
    if (users.length === 0) return next(new ErrorResponse('No users found', 404))
    return res.status(200).json({
        success: true,
        users
    })
})