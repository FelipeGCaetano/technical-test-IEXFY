import type { Request, Response, NextFunction } from "express";

export function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
    const start = Date.now()

    response.on('finish', () => {
        const duration = Date.now() - start
        const { method, originalUrl } = request
        const { statusCode } = response

        const timestamp = new Date().toISOString()
        const logMessage = `[${timestamp}] ${method} ${originalUrl} ${statusCode} - ${duration}ms`

        console.error(`${logMessage}`)
    })

    next()
}