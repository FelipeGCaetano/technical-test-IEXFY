import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { Client } from "../../../generated/prisma/client.js";
import type { ClientCreateInput, ClientUpdateInput } from "../../../generated/prisma/models.js";
import prisma from "../../database/prisma.js";
import { AppError } from "../../errors/appError.js";
import type ClientRepository from "../interfaces/client.interface.js";

export default class PrismaClientRepository implements ClientRepository {
    async getClients(): Promise<Client[]> {
        const clients = await prisma.client.findMany()

        return clients
    }

    async getClientById(id: string): Promise<Client> {
        const client = await prisma.client.findUnique({
            where: {
                id
            }
        })

        if (!client) throw new AppError("Client not found", 404)

        return client
    }

    async create(data: ClientCreateInput): Promise<Client> {
        try {
            const client = await prisma.client.create({ data })

            return client
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code == "P2002") {
                    throw new AppError("Client already exists.", 400)
                }
            }

            throw new AppError("Error to create client.", 500)
        }
    }

    async update(id: string, data: ClientUpdateInput): Promise<Client> {
        try {
            const clientUpdated = await prisma.client.update({
                where: {
                    id
                },
                data
            })

            return clientUpdated
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code == "P2025") {
                    throw new AppError("Client not found to be updated.", 404)
                }
            }

            throw new AppError("Error to update client.", 500)
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await prisma.client.delete({
                where: {
                    id
                }
            })

            return
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code == "P2025") {
                    throw new AppError("Client not found to be deleted.", 404)
                }
            }

            throw new AppError("Error to update client.", 500)
        }
    }
}