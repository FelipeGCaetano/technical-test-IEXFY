import type { Client } from "../../generated/prisma/client.js";
import type { CreateClientSchema, UpdateClientSchema } from "../@types/client.js";
import type ClientRepository from "../repositories/interfaces/client.interface.js";
import { paginateItens, type PaginationResponse } from "../utils/buildPagination.js";

export default class ClientService {
    constructor(
        private clientRepository: ClientRepository
    ) { }

    async getAll(page?: string | number, limit?: string | number): Promise<PaginationResponse<Client>> {
        page = Number(page) || 1
        limit = Number(limit) || 10

        const clients = await this.clientRepository.getClients()

        const paginateResponse = paginateItens<Client>(page, limit, clients)

        return paginateResponse
    }

    async getById(id: string) {
        const client = await this.clientRepository.getClientById(id)

        return client
    }

    async create(data: CreateClientSchema) {
        const client = await this.clientRepository.create(data)

        return client
    }

    async update(id: string, data: UpdateClientSchema) {
        const updateClient = await this.clientRepository.update(id, data)

        return updateClient
    }

    async delete(id: string) {
        await this.clientRepository.delete(id)
        return
    }
}