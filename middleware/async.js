const asyncHandler = (fxn) => {
    return (req, res, next) => {
        fxn(req, res, next).catch(err => next(err));
    }
}

module.exports = asyncHandler;