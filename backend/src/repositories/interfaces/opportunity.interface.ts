import { Prisma, type Opportunity } from "../../../generated/prisma/client.js"

export default interface OpportunityRepository {
    getAll(): Promise<Opportunity[]>
    getById(id: string): Promise<Opportunity>
    create(data: Prisma.OpportunityCreateInput): Promise<Opportunity>
    update(id: string, data: Prisma.OpportunityUpdateInput): Promise<Opportunity>
    delete(id: string): Promise<void>
}