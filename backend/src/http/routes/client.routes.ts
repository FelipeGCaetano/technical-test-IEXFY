import { Router } from "express";
import ClientController from "../controllers/client.controller.js";
import ClientSchema from "../schemas/client.schema.js";

const clientRouter = Router()
const controller = new ClientController()
const validator = new ClientSchema()

clientRouter.get("/", controller.getClients)
clientRouter.get("/:id", controller.getClientById)
clientRouter.post("/", validator.validateCreateClientRequest, controller.create)
clientRouter.patch("/:id", validator.validateUpdateClientRequest, controller.update)
clientRouter.delete("/:id", controller.delete)


export default clientRouter