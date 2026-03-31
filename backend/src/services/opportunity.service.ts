import type { Opportunity } from "../../generated/prisma/client.js";
import type OpportunityRepository from "../repositories/interfaces/opportunity.interface.js";
import { paginateItens, type PaginationResponse } from "../utils/buildPagination.js";

export default class OpportunityService {
    constructor(
        private opportunityRepository: OpportunityRepository
    ) { }

    async getAll(page?: string | number, limit?: string | number): Promise<PaginationResponse<Opportunity>> {
        page = Number(page) || 1
        limit = Number(limit) || 10

        const clients = await this.opportunityRepository.getAll()

        const paginateResponse = paginateItens<Opportunity>(page, limit, clients)

        return paginateResponse
    }

    async getById(id: string) {
        const client = await this.opportunityRepository.getById(id)

        return client
    }

    async create(data: CreateClientSchema) {
        const client = await this.opportunityRepository.create(data)

        return client
    }

    async update(id: string, data: UpdateClientSchema) {
        const updateClient = await this.opportunityRepository.update(id, data)

        return updateClient
    }

    async delete(id: string): Promise<void> {
        await this.opportunityRepository.delete(id)

        return
    }
}