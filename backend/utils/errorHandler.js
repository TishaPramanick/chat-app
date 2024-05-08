function customError(statusCode , message)
{
    const custError = new Error();
    custError.message = message;
    custError.statusCode = statusCode;
    return custError;
}

function errorHandler(err , req , res, next)
{
    const statusCode = err?.statusCode || 500;
    const message = err?.message || "Internal Server Error";
    res.status(statusCode).json({
        success : false,
        message : message,
        stack : err?.stack
    })
}

module.exports = {customError , errorHandler};