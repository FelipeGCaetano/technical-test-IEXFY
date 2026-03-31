import { Router } from "express";
import clientRouter from "./client.routes.js";

const routes = Router()

routes.use("/clients", clientRouter)

export default routes