import type { Request, Response } from "express";
import makeOpportunityService from "../../services/factories/makeOpportunityService.js";
import type OpportunityService from "../../services/opportunity.service.js";

export default class DashboardController {
    private opportunityService: OpportunityService

    constructor() {
        this.opportunityService = makeOpportunityService()
    }

    getDashboardSummary = async (request: Request, response: Response) => {
        const dashboardData = await this.opportunityService.getDashboardSummary()
        response.status(200).json(dashboardData)
    }
}