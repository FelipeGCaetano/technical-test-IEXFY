import type { NextFunction, Request, Response } from "express";
import z, { file, ZodError } from "zod";
import { AppError } from "../../errors/appError.js";

export default class ClientSchema {
    public static readonly CreateClientSchema = z.object({
        name: z.string(),
        cpfCnpj: z.string(),
        phone: z.string(),
        address: z.string()
    })

    public static readonly UpdateClientSchema = z.object({
        name: z.string().optional(),
        cpfCnpj: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional()
    })

    async validateCreateClientRequest(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            void ClientSchema.CreateClientSchema.parse(request.body)
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                const errorObj = err.issues.map((issue) => { return { fields: issue.path[0], message: issue.message } })
                throw new AppError("Error to proccess data.", 400, errorObj)
            }
        }
    }

    async validateUpdateClientRequest(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            void ClientSchema.UpdateClientSchema.parse(request.body)
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                const errorObj = err.issues.map((issue) => { return { fields: issue.path[0], message: issue.message } })
                throw new AppError("Error to proccess data.", 400, errorObj)
            }
        }
    }
}