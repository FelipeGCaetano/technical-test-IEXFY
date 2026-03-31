import type { NextFunction, Request, Response } from "express";
import z, { file, ZodError } from "zod";
import { AppError } from "../../errors/appError.js";

export default class OpportunitySchema {
    public static readonly CreateOpportunitySchema = z.object({
        clientId: z.string().uuid(),
        value: z.number(),
        status: z.enum(["OPEN", "NEGOTIATING", "WON", "LOST", "CANCELED"]).optional()
    })

    public static readonly UpdateOpportunitySchema = z.object({
        clientId: z.string().uuid().optional(),
        value: z.number().optional(),
        status: z.enum(["OPEN", "NEGOTIATING", "WON", "LOST", "CANCELED"]).optional()
    })

    async validateCreateOpportunityRequest(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            void OpportunitySchema.CreateOpportunitySchema.parse(request.body)
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                const errorObj = err.issues.map((issue) => { return { fields: issue.path[0], message: issue.message } })
                throw new AppError("Error to proccess data.", 400, errorObj)
            }
        }
    }

    async validateUpdateOpportunityRequest(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            void OpportunitySchema.UpdateOpportunitySchema.parse(request.body)
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                const errorObj = err.issues.map((issue) => { return { fields: issue.path[0], message: issue.message } })
                throw new AppError("Error to proccess data.", 400, errorObj)
            }
        }
    }
}