import { Router } from "express";
import DashboardController from "../controllers/dashboard.controller.js";

const dashboardRouter = Router()
const controller = new DashboardController()

dashboardRouter.get("/resumo", controller.getDashboardSummary)

export default dashboardRouter