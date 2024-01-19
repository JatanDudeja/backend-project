const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        ((err) => next(err))
    }
}

export { asyncHandler }