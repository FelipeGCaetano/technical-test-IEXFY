import { type Request, type Response, type NextFunction } from 'express'

interface ErrorResponse {
    status: string
    message: string
    detail?: object
}

/** AppError is a custom error class that extends the Error class. */
class AppError {
    public readonly message: string

    public readonly statusCode: number

    public readonly detail?: object

    constructor(message: string, statusCode = 400, detail?: object) {
        this.message = message
        this.statusCode = statusCode
        this.detail = detail || {}
    }
}

/** function that handles errors in the application. */
function errorHandle(
    err: Error,
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const resObj: ErrorResponse = {
        status: 'error',
        message: err.message
    }

    if (err instanceof AppError && err.detail) {
        resObj.detail = err.detail
    }

    response.status(err instanceof AppError ? err.statusCode : 400).json(resObj)
}

export { AppError, errorHandle }