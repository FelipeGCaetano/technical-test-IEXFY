import { Router } from "express";
import clientRouter from "./client.routes.js";
import opportunityRouter from "./opportunity.routes.js";

const routes = Router()

routes.use("/clients", clientRouter)
routes.use("/oportunidades", opportunityRouter)

export default routes