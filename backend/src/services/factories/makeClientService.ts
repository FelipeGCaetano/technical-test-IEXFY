import PrismaClientRepository from "../../repositories/prisma/client.repository.js";
import ClientService from "../client.service.js";

export default function makeClientService(): ClientService {
    const clientRepository = new PrismaClientRepository()

    const clientService = new ClientService(clientRepository)

    return clientService
}