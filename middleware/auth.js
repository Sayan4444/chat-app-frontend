const User = require('../model/User.js')
const jwt = require('jsonwebtoken');
const asyncHandler = require('./async.js');
const ErrorResponse = require('../utils/errorResponse.js');

exports.protect = asyncHandler(async (req, res, next) => {
    console.log(req.cookies.token);
    let token;
    if (req.cookies.token)
        token = req.cookies.token

    if (!token) return next(new ErrorResponse('Unauthorized', 401));

    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return next(new ErrorResponse('Unauthorized', 401));
    req.user = user;
    next();
})