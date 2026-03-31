import type { Request, Response, NextFunction } from "express";

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const { method, originalUrl } = req;
        const { statusCode } = res;

        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${method} ${originalUrl} ${statusCode} - ${duration}ms`;

        if (statusCode >= 400) {
            console.error(`❌ ${logMessage}`);
        } else {
            console.log(`✅ ${logMessage}`);
        }
    });

    next(); 
}