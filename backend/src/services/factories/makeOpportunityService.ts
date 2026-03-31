import PrismaOpportunityRepository from "../../repositories/prisma/opportunity.repository.js";
import OpportunityService from "../opportunity.service.js";
import makeClientService from "./makeClientService.js";

export default function makeOpportunityService(): OpportunityService {
    const opportunityRepository = new PrismaOpportunityRepository()
    const clientService = makeClientService()

    const opportunityService = new OpportunityService(opportunityRepository, clientService)

    return opportunityService
}