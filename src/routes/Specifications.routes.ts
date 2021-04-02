import { Router } from "express";
import CreateSpecificationController from "../modules/cars/controllers/specifications/createSpecification/CreateSpecificationController";
import listSpecificationsController from '../modules/cars/controllers/specifications/listSpecification'

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post("/", createSpecificationController.handle);

specificationsRoutes.get("/", (req, res) => {
  return listSpecificationsController().handle(req, res);
});

export default specificationsRoutes;
