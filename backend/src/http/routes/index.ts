import { Router } from "express";
import clientRouter from "./client.routes.js";
import opportunityRouter from "./opportunity.routes.js";
import dashboardRouter from "./dashboard.routes.js";
import docsRouter from "./docs.routes.js";

const routes = Router()

routes.use("/docs", docsRouter)
routes.use("/clients", clientRouter)
routes.use("/dashboard", dashboardRouter)
routes.use("/oportunidades", opportunityRouter)

export default routes