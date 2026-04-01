import { Router } from "express";
import OpportunityController from "../controllers/opportunity.controller.js";
import OpportunitySchema from "../schemas/opportunity.schema.js";

const opportunityRouter = Router()
const controller = new OpportunityController()
const validator = new OpportunitySchema()


opportunityRouter.get("/", controller.getAll)
opportunityRouter.get("/:id", controller.getById)
opportunityRouter.post("/", validator.validateCreateOpportunityRequest, controller.create)
opportunityRouter.patch("/:id", validator.validateUpdateOpportunityRequest, controller.update)
opportunityRouter.delete("/:id", controller.delete)

export default opportunityRouter