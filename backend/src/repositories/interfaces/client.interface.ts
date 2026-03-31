import { Prisma, type Client } from "../../../generated/prisma/client.js"

export default interface ClientRepository {
    getClients(): Promise<Client[]>
    getClientById(id: string): Promise<Client>
    create(data: Prisma.ClientCreateInput): Promise<Client>
    update(id: string, data: Prisma.ClientUpdateInput): Promise<Client>
    delete(id: string): Promise<void>
}