import type { Opportunity, Prisma } from "../../../generated/prisma/client.js";
import { PrismaClientKnownRequestError } from "../../../generated/prisma/internal/prismaNamespace.js";
import prisma from "../../database/prisma.js";
import { AppError } from "../../errors/appError.js";
import type OpportunityRepository from "../interfaces/opportunity.interface.js";

export default class PrismaOpportunityRepository implements OpportunityRepository {
    async getAll(): Promise<Opportunity[]> {
        const opportunitys = await prisma.opportunity.findMany()

        return opportunitys
    }

    async getById(id: string): Promise<Opportunity> {
        const opportunity = await prisma.opportunity.findUnique({
            where: {
                id
            }
        })

        if (!opportunity) throw new AppError("Opportunity not found", 404)

        return opportunity
    }

    async create(data: Prisma.OpportunityCreateInput): Promise<Opportunity> {
        try {
            const opportunity = await prisma.opportunity.create({ data })

            return opportunity
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code == "P2002") {
                    throw new AppError("Opportunity already exists.", 400)
                }
            }

            throw new AppError("Error to create Opportunity.", 500)
        }
    }

    async update(id: string, data: Prisma.OpportunityUpdateInput): Promise<Opportunity> {
        try {
            const opportunityUpdated = await prisma.opportunity.update({
                where: {
                    id
                },
                data
            })

            return opportunityUpdated
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code == "P2025") {
                    throw new AppError("Opportunity not found to be updated.", 404)
                }
            }

            throw new AppError("Error to update Opportunity.", 500)
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await prisma.opportunity.delete({
                where: {
                    id
                }
            })

            return
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code == "P2025") {
                    throw new AppError("Opportunity not found to be deleted.", 404)
                }
            }

            throw new AppError("Error to update Opportunity.", 500)
        }
    }
}