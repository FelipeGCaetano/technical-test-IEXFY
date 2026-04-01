import type { Request, Response } from "express";
import makeOpportunityService from "../../services/factories/makeOpportunityService.js";
import type OpportunityService from "../../services/opportunity.service.js";
import type { OpportunityStatus } from "../../../generated/prisma/enums.js";
export default class OpportunityController {
    private opportunityService: OpportunityService

    constructor() {
        this.opportunityService = makeOpportunityService()
    }

    getAll = async (request: Request, response: Response): Promise<void> => {
        const { page, limit, status, clientId, clientDetails } = request.query;

        const opportunitys = await this.opportunityService.getAll(
            page as string,
            limit as string,
            status as OpportunityStatus,
            clientId as string,
            Boolean(clientDetails)
        );

        response.status(200).json(opportunitys)
    }

    getById = async (request: Request, response: Response): Promise<void> => {
        const id = request.params.id

        if (!id) {
            response.status(400).send("Opportunity ID is missing.")
            return
        }

        const opportunity = await this.opportunityService.getById(id as string)

        response.status(200).json(opportunity)
    }

    create = async (request: Request, response: Response): Promise<void> => {
        const data = request.body

        const opportunity = await this.opportunityService.create(data)

        response.status(201).json(opportunity)
    }

    update = async (request: Request, response: Response): Promise<void> => {
        const id = request.params.id
        const data = request.body

        if (!id) {
            response.status(400).send("Opportunity ID is missing.")
            return
        }

        const opportunity = await this.opportunityService.update(id as string, data)

        response.status(200).json(opportunity)
    }

    delete = async (request: Request, response: Response): Promise<void> => {
        const id = request.params.id

        if (!id) {
            response.status(400).send("Opportunity ID is missing.")
            return
        }

        await this.opportunityService.delete(id as string)

        response.status(204).send()
    }
}