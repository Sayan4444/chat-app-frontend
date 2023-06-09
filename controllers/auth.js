const asyncHandler = require("../middleware/async");
const User = require("../model/User");
const ErrorResponse = require("../utils/errorResponse")

exports.signup = asyncHandler(async (req, res) => {
    const { email, picture } = req.body;
    const obj = { ...req.body };
    if (picture.length === 0) delete obj.picture
    await User.create(obj);
    const user = await User.findOne({ email });
    res.status(201);
    sendTokenResponse(user, res);
})

exports.signin = asyncHandler(async (req, res, next) => {
    console.log(req.cookies);
    const { email, password } = req.body;
    //Check for user
    let user = await User.findOne({ email }).select('password');
    if (!user) next(new ErrorResponse('Invalid credentials', 401))
    //Checking if password matches

    const isSame = await user.matchPassword(password);
    if (!isSame) next(new ErrorResponse('Invalid credentials', 401))
    user = await User.findOne({ email });
    sendTokenResponse(user, res);
});

exports.signout = (req, res) => {
    const options = {
        httpOnly: true,
        secure: false,
    }
    if (process.env.ENV !== 'dev') {
        options.secure = true;
        options.sameSite = 'none'
    }
    res
        .clearCookie('token', options)
        .status(200).json({
            success: true,
            data: {}
        })
}

exports.getMe = (req, res) => {
    if (req.query.userData)
        res.status(200).json({
            success: true,
            user: req.user
        })
    else
        res.status(200).json({
            success: true,
        })
}

function sendTokenResponse(user, res) {
    const token = user.createJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false,
        domain: 'http://localhost:3000/',
    }
    if (process.env.ENV !== 'dev') {
        options.secure = true;
        options.sameSite = 'none'
    }
    res.cookie('token', token, options)
    return res.json({
        success: true,
        user
    })
}