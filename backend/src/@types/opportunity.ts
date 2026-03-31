import type { TypeOf } from "zod";
import type OpportunitySchema from "../http/schemas/opportunity.schema.js";

export type CreateOpportunitySchema = TypeOf<typeof OpportunitySchema.CreateOpportunitySchema>
export type UpdateOpportunitySchema = TypeOf<typeof OpportunitySchema.UpdateOpportunitySchema>