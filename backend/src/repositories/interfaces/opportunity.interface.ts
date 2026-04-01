import { OpportunityStatus, Prisma, type Opportunity } from "../../../generated/prisma/client.js"
import type { CreateOpportunitySchema, OpportunityStats, UpdateOpportunitySchema } from "../../@types/opportunity.js"

export default interface OpportunityRepository {
    getAll(filters: { status?: OpportunityStatus; clientId?: string }): Promise<Opportunity[]>
    getById(id: string): Promise<Opportunity>
    create(data: CreateOpportunitySchema): Promise<Opportunity>
    update(id: string, data: UpdateOpportunitySchema): Promise<Opportunity>
    delete(id: string): Promise<void>
    getDashboardSummary(): Promise<OpportunityStats[]>
}