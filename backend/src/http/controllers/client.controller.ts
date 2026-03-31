import type { Request, Response } from "express";
import type ClientService from "../../services/client.service.js";
import makeClientService from "../../services/factories/makeClientService.js";

export default class ClientController {
    private clientService: ClientService

    constructor() {
        this.clientService = makeClientService()
    }

    getClients = async (request: Request, response: Response): Promise<void> => {
        const { page, limit } = request.query

        const clients = await this.clientService.getAll(page as string, limit as string)

        response.status(200).json(clients)
    }

    getClientById = async (request: Request, response: Response): Promise<void> => {
        const id = request.params.id

        if (!id) {
            response.status(400).send("Client ID is missing.")
            return
        }

        const client = await this.clientService.getById(id as string)

        response.status(200).json(client)
    }

    create = async (request: Request, response: Response): Promise<void> => {
        const data = request.body

        const client = await this.clientService.create(data)

        response.status(201).json(client)
    }

    update = async (request: Request, response: Response): Promise<void> => {
        const id = request.params.id
        const data = request.body

        if (!id) {
            response.status(400).send("Client ID is missing.")
            return
        }

        const client = await this.clientService.update(id as string, data)

        response.status(200).json(client)
    }

    delete = async (request: Request, response: Response): Promise<void> => {
        const id = request.params.id

        if (!id) {
            response.status(400).send("Client ID is missing.")
            return
        }

        await this.clientService.delete(id as string)
        
        response.status(204).send()
    }
}