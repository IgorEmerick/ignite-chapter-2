import { Router } from "express";
import CreateSpecificationController from "../modules/cars/controllers/specifications/createSpecification/CreateSpecificationController";
import ListSpecificationsController from "../modules/cars/controllers/specifications/listSpecification/ListSpecificationsController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post("/", createSpecificationController.handle);

specificationsRoutes.get("/", listSpecificationsController.handle);

export default specificationsRoutes;
