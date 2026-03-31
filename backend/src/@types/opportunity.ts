import type { TypeOf } from "zod";
import type OpportunitySchema from "../http/schemas/opportunity.schema.js";
import type { OpportunityStatus } from "../../generated/prisma/enums.js";

export type CreateOpportunitySchema = TypeOf<typeof OpportunitySchema.CreateOpportunitySchema>
export type UpdateOpportunitySchema = TypeOf<typeof OpportunitySchema.UpdateOpportunitySchema>

export interface OpportunityStats {
    status: OpportunityStatus;
    _count: { status: number };
    _sum: { value: number | null };
}