const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    const options = {
        httpOnly: true,
        secure: false,
    }
    if (process.env.ENV !== 'dev') {
        options.secure = true;
        options.sameSite = 'none'
    }
    if (err.code === 11000)
        return res.json({
            success: false,
            error: "Email already exsists"
        })
    if (err.statusCode) res.clearCookie('token', options)
    return res
        .status(err.statusCode)
        .json({
            success: false,
            error: err.message
        })
}

module.exports = errorHandler;