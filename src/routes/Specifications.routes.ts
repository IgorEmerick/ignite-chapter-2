import { Router } from "express";
import CreateSpecificationController from "../modules/cars/controllers/specifications/CreateSpecificationController";
import ListSpecificationsController from "../modules/cars/controllers/specifications/ListSpecificationsController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post("/", createSpecificationController.handle);

specificationsRoutes.get("/", listSpecificationsController.handle);

export default specificationsRoutes;
