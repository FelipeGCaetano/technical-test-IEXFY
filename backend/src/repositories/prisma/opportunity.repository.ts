import type { Opportunity, OpportunityStatus, Prisma } from "../../../generated/prisma/client.js";
import { PrismaClientKnownRequestError } from "../../../generated/prisma/internal/prismaNamespace.js";
import type { CreateOpportunitySchema, UpdateOpportunitySchema } from "../../@types/opportunity.js";
import prisma from "../../database/prisma.js";
import { AppError } from "../../errors/appError.js";
import type OpportunityRepository from "../interfaces/opportunity.interface.js";

export default class PrismaOpportunityRepository implements OpportunityRepository {
    async getAll(filters: { status?: OpportunityStatus; clientId?: string }): Promise<Opportunity[]> {
        const opportunities = await prisma.opportunity.findMany({
            where: {
                status: filters.status,
                clientId: filters.clientId 
            }
        });

        return opportunities
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

    async create(data: CreateOpportunitySchema): Promise<Opportunity> {
        try {
            const opportunity = await prisma.opportunity.create({
                data: {
                    value: data.value,
                    client: {
                        connect: {
                            id: data.clientId
                        }
                    }
                }
            })

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

    async update(id: string, data: UpdateOpportunitySchema): Promise<Opportunity> {
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