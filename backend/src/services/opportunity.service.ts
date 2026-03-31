import type { Opportunity, OpportunityStatus } from "../../generated/prisma/client.js";
import type { CreateOpportunitySchema, UpdateOpportunitySchema } from "../@types/opportunity.js";
import { AppError } from "../errors/appError.js";
import type OpportunityRepository from "../repositories/interfaces/opportunity.interface.js";
import { paginateItens, type PaginationResponse } from "../utils/buildPagination.js";
import type ClientService from "./client.service.js";

export default class OpportunityService {
    constructor(
        private opportunityRepository: OpportunityRepository,
        private clientService: ClientService
    ) { }

    async getAll(page?: string | number, limit?: string | number, status?: OpportunityStatus, clientId?: string): Promise<PaginationResponse<Opportunity>> {
        page = Number(page) || 1
        limit = Number(limit) || 10

        const clients = await this.opportunityRepository.getAll({ status, clientId })

        const paginateResponse = paginateItens<Opportunity>(page, limit, clients)

        return paginateResponse
    }

    async getById(id: string) {
        const client = await this.opportunityRepository.getById(id)

        return client
    }

    async create(data: CreateOpportunitySchema) {
        const client = await this.clientService.getById(data.clientId)

        if (!client) {
            throw new AppError("Client not found. Opportunity was not created.", 404)
        }

        const opportunity = await this.opportunityRepository.create(data)

        return opportunity
    }

    async update(id: string, data: UpdateOpportunitySchema) {
        if (data.clientId) {
            const client = await this.clientService.getById(data.clientId)

            if (!client) {
                throw new AppError("Client not found. Opportunity was not created.", 404)
            }
        }

        const updateOpportunity = await this.opportunityRepository.update(id, data)

        return updateOpportunity
    }

    async delete(id: string): Promise<void> {
        await this.opportunityRepository.delete(id)

        return
    }
}